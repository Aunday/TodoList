import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThList, faTimes, faPlus, faSortNumericUp, faSortNumericDown,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VuejsDialog from 'vuejs-dialog';
import VueCookies from 'vue-cookies';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import App from './App.vue';
import awsconfig from './aws-exports';

API.configure(awsconfig);
PubSub.configure(awsconfig);

Vue.config.productionTip = false;
// import { Amplify } from 'aws-amplify'
// import { AmplifyPlugin } from 'aws-amplify-vue'
// import awsconfig from './aws-exports'
// Amplify.configure(awsconfig)

// Vue.use(AmplifyPlugin, AmplifyModules)

library.add(faThList, faCheckSquare, faSquare, faTimes, faPlus, faSortNumericUp, faSortNumericDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VuejsDialog);
Vue.use(VueCookies);

Vue.config.productionTip = false;
VueCookies.config('7d');

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App/>',
});// .$mount('#app')
