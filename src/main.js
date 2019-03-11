import Vue from 'vue'
import vueCalendar from 'vue2-simple-calendar'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'skeleton-css/css/skeleton.css'
import '@/common/main.scss'
import 'vue-date-pick/dist/vueDatePick.css'

Vue.config.productionTip = false

Vue.use(vueCalendar, {
  showLimit: 2
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
