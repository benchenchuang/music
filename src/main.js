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

import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/loading.png'),
  loading: require('./assets/images/loading.png'),
  attempt: 3
});
import {store} from './vuex/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.use(VueResource);
Vue.use(Api)
Vue.config.productionTip = false
Vue.component('loader', PulseLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
