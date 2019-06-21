// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@babel/polyfill'
import axios from './axios'
import api from './api'
import ElementUI from 'element-ui'
import './plugins/element.js'
import './element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
