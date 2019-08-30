import Vue from 'vue';
import App from './App.vue';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import './filters/date.filter'

import {router} from './router/router';

Vue.config.productionTip = false;
Vue.use(VuejsDialog);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
