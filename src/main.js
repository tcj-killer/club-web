// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
//import httpService from './service/http-service';
import axios from "axios";
import http from './service/http-service'
import echarts from 'echarts'
import itcastvideo from 'myitcastvideo456'
import 'animate.css'
//import 'amfe-flexible'
Vue.prototype.$http = http



Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
