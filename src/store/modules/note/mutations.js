export default {
  setNoteList(state, payload) {
    state.notes = payload;
  },
  setLink(state, payload) {
    state.sharedLink = payload;
  },
  setNoteCount(state, payload) {
    state.notesCount = payload;
  },
};
