import mutations from "./mutations";
import actions from "./actions";

export default {
  state: {
    selectedLang: "ru",
    user: {
      id: null,
      name: null,
    },
  },
  actions,
  mutations,
};
