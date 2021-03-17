import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/components/Home'
import UserManages from '@/pages/userManages/UserManages'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    //重定向
    path: "*",
    redirect: "/login"
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
        path: '/usermanages',
        name: 'usermanages',
        component: UserManages
      }
    ]
  }]
})
