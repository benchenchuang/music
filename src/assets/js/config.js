
export default {
  install(Vue, options) {
    Vue.prototype.Api = {
      getApi() {
        return 'http://118.89.226.181:8080/api'  
      }
    }
  }
} 