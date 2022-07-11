import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Vue.prototype.HOST='/api'
// axios.defaults.baseURL = '/ggblog'
Vue.use(VueAxios, axios)
Vue.use(router);
Vue.use(ElementUI);
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

