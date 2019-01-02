<style lang="stylus" scoped>
#app
  .tab
    display flex
    width 100%
    line-height 40px
    height 40px
    .tab-item
      flex 1
      text-align center
</style>

<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/content">商品</router-link>
      <router-link tag="div" class="tab-item" to="/comment">评论</router-link>
      <router-link tag="div" class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/header/header'

export default {
  components: {
    'v-header': Header
  }
}
</script>
