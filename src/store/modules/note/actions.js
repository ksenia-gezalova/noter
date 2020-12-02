import noteService from "@/services/noteService";

export default {
  getNotes(context, payload) {
    context.commit("loader/setLoader", true, { root: true });
    return noteService
      .getAllNotes(context.rootState.auth.token, payload)
      .then((response) => {
        context.commit("setNoteList", response.data.notes);
        context.commit("setNoteCount", response.data.total);
        context.commit("loader/setLoader", false, {
          root: true,
        });
      })
      .catch((err) => {
        context.commit("loader/setLoader", false, { root: true });
        if (err.response) {
          context.commit("error/pushToErrors", err.response.status, {
            root: true,
          });
        } else {
          context.commit("error/pushToErrors", 0, { root: true });
        }
      });
  },
  createNote(context, payload) {
    return noteService.createNote(context.rootState.auth.token, payload);
  },
  changeNote(context, payload) {
    return noteService.changeNote(context.rootState.auth.token, payload);
  },
  deleteNote(context, payload) {
    return noteService.deleteNote(context.rootState.auth.token, payload);
  },
  shareNote(context, payload) {
    return noteService
      .shareNote(context.rootState.auth.token, payload)
      .then((response) => {
        context.commit("setLink", response.data);
      })
      .catch((err) => {
        if (err.response) {
          context.commit("error/pushToErrors", err.response.status, {
            root: true,
          });
        } else {
          context.commit("error/pushToErrors", 0, { root: true });
        }
      });
  },
  getNoteByLink(context, payload) {
    context.commit("loader/setLoader", true, { root: true });
    return noteService
      .getNoteByLink(payload)
      .then((response) => {
        context.commit("loader/setLoader", false, { root: true });
        return response;
      })
      .catch((err) => {
        if (err.response) {
          context.commit("error/pushToErrors", err.response.status, {
            root: true,
          });
        } else {
          context.commit("error/pushToErrors", 0, { root: true });
        }
        context.commit("loader/setLoader", false, { root: true });
      });
  },
};
