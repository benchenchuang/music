// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueResource from 'vue-resource'
import Api from './assets/js/config'
require('./assets/css/reset.css')

import FastClick from 'fastclick' // 解决移动端300毫秒延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.use(VueLazyload, {
  preLoad: 5,
  error: './assets/images/error.png',
  loading: './assets/images/loading.png',
  attempt: 1
});


Vue.use(VueResource);
Vue.use(Api)
Vue.config.productionTip = false
Vue.component('loader', PulseLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
