// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'

const http = axios.create({
  //baseURL: process.env.VUE_APP_MOCK_DATA_URL,
  baseURL: 'http://localhost:3000', // api 的 base_url
  timeout: 1000 * 300,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    config.headers['token'] = localStorage.getItem("token") // 请求头带上token
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  return response
}, error => {// 401, token失效
    // TODO 清除登陆信息
    //router.push({ name: 'login' })
  return Promise.reject(error)
})
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return actionName;
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime(),
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime(),
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
