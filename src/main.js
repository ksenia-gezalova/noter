import Vue from "vue";
import vClickOutside from "v-click-outside";
import Vuelidate from "vuelidate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import i18n from "./i18n";

Vue.use(vClickOutside);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
