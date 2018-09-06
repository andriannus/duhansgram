// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Meta from 'vue-meta';
import App from './App';
import router from './router';

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(Meta);

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
