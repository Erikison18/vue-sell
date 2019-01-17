<style lang="stylus" scoped>
@import "common/stylus/mixin"

.tab
  display flex
  width 100%
  line-height 40px
  height 40px
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex 1
    text-align center
    &>a
      display block
      font-size 14px
      color rgb(77, 85, 93)
      &.active
        color rgb(240, 20, 20)
</style>

<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link tag="a" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from 'components/header/header'

const ERR_OK = 0

export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': Header
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.seller = res.data
      }
    }, (error) => {
      console.log(error)
    })
  }
}
</script>
