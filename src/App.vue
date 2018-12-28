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
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">content</div>
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
