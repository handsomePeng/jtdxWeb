import Vue from 'vue'
import axios from 'axios'
import router from './router'
import './plugins/element.js'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method == 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // 请求成功
    if (response.data.code == 1000) {
      return response
    }
    // 参数异常
    else if (response.data.code == 1001) {
      Vue.prototype.$notify.error({
        title: '错误信息提示',
        duration: 2500,
        message: response.data.desc
      })
    }
    // 系统异常
    else if (response.data.code == 1002) {
      Vue.prototype.$notify.error({
        title: '错误信息提示',
        duration: 2500,
        message: response.data.desc
      })
    }
    // 用户未登录
    else if (response.data.code == 1003) {
      // 导至登录页
      router.push({name: 'login'})
    }
    // 失败
    else if (response.data.code == 1004) {
      // 显示请求失败的错误信息
      Vue.prototype.$notify.error({
        title: '错误信息提示',
        duration: 2500,
        message: response.data.desc
      })
    }
    // 权限不足
    else if (response.data.code == 1005) {
      Vue.prototype.$notify.error({
        title: '错误信息提示',
        duration: 2500,
        message: response.data.desc
      })
    }
    return response
  },
  err => {
    return Promise.reject(err)
  })
export default axios
