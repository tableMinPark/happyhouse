import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from '@/routers/routers.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
