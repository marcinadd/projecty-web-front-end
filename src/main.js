import Vue from 'vue';
import App from './App.vue';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import './filters/date.filter'

import {router} from './router/router';
import createAuthRefreshInterceptor from "axios-auth-refresh/src";
import axios from "axios";
import {userService} from "@/services";

Vue.config.productionTip = false;
Vue.use(VuejsDialog);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

const refreshAuthLogic = failedRequest => userService.refreshAccessToken().then(newToken => {
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + newToken;
  return Promise.resolve();
});
createAuthRefreshInterceptor(axios, refreshAuthLogic);
