import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThList, faTimes, faPlus, faSortNumericUp, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VuejsDialog from 'vuejs-dialog';
import VueCookies from 'vue-cookies';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

library.add(faThList, faCheckSquare, faSquare, faTimes, faPlus, faSortNumericUp, faSortNumericDown)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VuejsDialog);
Vue.use(VueCookies);

Vue.config.productionTip = false;
VueCookies.config('7d');

new Vue({
  render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App/>'
})// .$mount('#app')
