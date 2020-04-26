import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import axios from 'axios';



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('multiselect', Multiselect)
Vue.component('vue-multiselect', window.VueMultiselect.default)
Vue.prototype.$axios = axios




new Vue({
  render: h => h(App),
}).$mount('#app')
