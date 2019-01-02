import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content/content'
import Comment from '@/components/comment/comment'
import Seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/content'
    },
    {
      path: '/content',
      component: Content
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
