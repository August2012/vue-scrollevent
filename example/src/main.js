import Vue from 'vue'
import App from './App'
import vuescrollevent from './src/index'
Vue.use(vuescrollevent)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
