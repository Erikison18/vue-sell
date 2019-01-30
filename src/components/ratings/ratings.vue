<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'

.ratings
  position absolute
  top 174px
  left 0px
  bottom 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .over-left
      flex 0 0 137px
      width 137px
      text-align center
      border-right 1px solid rgba(7, 17, 27, 0.2)
      padding 6px 0
      @media only screen and (max-width 320px)
        flex 0 0 120px
        width 120px
      .score
        font-size 24px
        line-height 28px
        color rgb(255, 153, 0)
        margin-bottom 6px
      .title
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .rank
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
    .over-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          display inline-block
          vertical-align top
          font-size 12px
          line-height 18px
          color rgb(7, 17, 27)
        .star
          display inline-block
          vertical-align top
          margin 0 12px
        .score
          display inline-block
          vertical-align top
          font-size 12px
          color rgb(255, 153, 0)
          line-height 18px
      .delivery-wrapper
        .title
          display inline-block
          vertical-align top
          font-size 12px
          line-height 18px
          color rgb(7, 17, 27)
        .delivery
          font-size 12px
          color rgb( 147, 153, 159)
          margin-left 12px
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.2))
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            font-size 10px
            color rgb(147, 153, 159)
        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
        .recommend
          line-height 16px
          font-size 0
          .icon-thumb_up, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            color rgb(0, 160, 220)
          .item
            padding 0 6px
            border 1px solid rgba(7, 17, 27 0.2)
            border-radius 1px
            color rgb(147, 153, 159)
            background #fff
        .time
          position absolute
          top 0
          right 12px
          color rgb(147, 153, 159)
</style>

<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="over-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="over-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送到时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :desc="desc" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"
      @ratingtype="changeType" @content="changeContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating, index) in ratings" class="rating-item border-1px" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="(item, index) in rating.recommend" :key="index" class="item">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from 'components/star/star'
import Ratingselect from 'components/ratingselect/ratingselect'
import Split from 'components/split/split'
import {formatDate} from 'common/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
const ERR_OK = 0

export default {
  components: {
    Star,
    Ratingselect,
    Split
  },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        console.log(this.ratings)
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    }, (error) => {
      console.log(error)
    })
  },
  methods: {
    changeType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    changeContent (onlyContent) {
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>
