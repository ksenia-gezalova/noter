import axios from "axios";

class noteService {
  constructor() {
    if (noteService.instance) {
      return noteService.instance;
    }
    noteService.instance = this;

    return this;
  }

  getAllNotes(token, data) {
    return axios.get(`/note/all`, {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
      headers: {
        token,
      },
    });
  }

  getNote(noteId) {
    return axios.get(`/note/one/${noteId}`);
  }

  createNote(token, note) {
    return axios.post("/note/create", note, { headers: { token: token } });
  }

  changeNote(token, note) {
    return axios.put("/note/change", note, { headers: { token: token } });
  }

  deleteNote(token, noteId) {
    return axios.delete(`/note/delete/${noteId}`, {
      headers: { token: token },
    });
  }

  shareNote(token, noteId) {
    return axios.post(`/note/share/${noteId}`, null, {
      headers: { token: token },
    });
  }

  getNoteByLink(link) {
    return axios.get(`/note/shared/${link}`);
  }
}

export default new noteService();
