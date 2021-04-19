import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/components/Home'
import UserManages from '@/pages/userManages/UserManages'
import index from '@/pages/homepage/index'
import error from '@/pages/error'
import register from '@/pages/register'
import location from '@/pages/location/location'
import shop from '@/pages/shop/shop'
import news from '@/pages/homepage/news'
import collect from '@/pages/homepage/collect'
import active from '@/pages/active/active'
import buy from '@/pages/shop/buy'
import administration from '@/pages/homepage/administration'
import order from '@/pages/shop/order'
import video from '@/pages/video/video'

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
    children: [
      // {
      //   path: '/usermanages',
      //   name: 'usermanages',
      //   component: UserManages
      // },
      {
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/news',
        name: 'news',
        component: news
      },
      {
        path: '/collect',
        name: 'collect',
        component: collect
      },
      {
        path: '/video',
        name: 'video',
        component: video
      },
      {
        path: '/administration',
        name: 'administration',
        component: administration
      },
      {
        path: '/location',
        name: 'location',
        component: location
      },
      {
        path: '/shop',
        name: 'shop',
        component: shop
      },
      {
        path: '/buy',
        name: 'buy',
        component: buy
      },
      {
        path: '/order',
        name: 'order',
        component: order
      },
      {
        path: '/active',
        name: 'active',
        component: active
      },
    ]
  },
    {
      //404
      path: '/error',
      name: 'error',
      component: error
    },
    {
      //注册
      path: '/register',
      name: 'register',
      component: register
    },
    ]
})
