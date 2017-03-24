import Vue from 'vue'
import App from './components/App.vue'

Vue.use(require('vue-countup-v2'));

new Vue({
  el: '#app',
  components: {App},
  render: h => h(App)
});
