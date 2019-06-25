import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login/login'
import signUp from '@/components/login/signUp/signUp'
import index from '@/components/index/index'
import home from '@/components/home/home/home'
import billList from '@/components/billList/billList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },{
      path: '/',
      name: 'index',
      redirect: '/index',
      component: index,
      children: [{
        path: '/index',
        name: 'home',
        component: home
      },{
        path: '/billList',
        name: 'billList',
        component: billList
      }]
    },
  ]
})
