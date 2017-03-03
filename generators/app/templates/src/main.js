require('es6-promise').polyfill();
import Vue from 'vue'
import './main.less';

import App from './page/App.vue'

new Vue({
  el: '#app',
  mounted(){
  },
  components:{
    App
  }
})
