import mutations from "./mutations";
import actions from "./actions";

export default {
  state: {
    notes: [],
    sharedLink: null,
    notesCount: null,
  },
  actions,
  mutations,
};
