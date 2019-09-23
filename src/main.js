import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/Vuetify'
import router from './plugins/Router'
import store from './plugins/Store'

Vue.config.productionTip = false

// Axios
Vue.use(VueAxios, Axios)
Vue.axios.defaults.baseURL = 'http://127.0.0.1:8000/'

new Vue({
  vuetify,
  router,
  store,  
  render: h => h(App)
}).$mount('#app')
