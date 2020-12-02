import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import VuexPersist from "vuex-persistedstate";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    auth: state.auth,
    user: state.user,
  }),
});

export default new Vuex.Store({
  modules,
  plugins: [vuexLocalStorage],
});
