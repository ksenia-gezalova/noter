export default {
  pushToErrors(state, payload) {
    state.errors = [];
    state.errors.push(payload);
  },
  removeErrors(state) {
    state.errors = null;
  },
};
