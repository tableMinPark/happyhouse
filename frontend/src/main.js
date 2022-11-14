import Vue from 'vue';
import App from './App.vue' ;
import LoadScript from 'vue-plugin-load-script';
import VueFeather from 'vue-feather';

Vue.use(LoadScript);
Vue.use(VueFeather);

Vue.config.productionTip = false;

import router from '@/routers/routers.js';

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
