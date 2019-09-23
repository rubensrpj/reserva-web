import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import AdmProduto from '@/views/AdmProduto.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admproduto',
      name: 'admproduto',
      component: AdmProduto
    },
    { path: '*', redirect: '/' }
  ]
})
