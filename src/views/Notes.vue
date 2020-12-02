<template>
  <div class="notes">
    <div class="notes__holder" v-if="notes && notes.length !== 0">
      <h3 class="notes__title">{{ $t("note.notesList") }}</h3>
      <div class="notes__container">
        <note-block
          class="notes__item"
          v-for="item in notes"
          :note="item"
          :key="item.id"
          @shareNote="generateLink"
          @editNote="editNote"
          @deleteNote="removeNote"
        />
      </div>

      <div class="notes__footer">
        <pagination-control
          :itemsPerPage="itemsPerPage"
          :currentPage="page"
          :itemsCount="notesCount"
          @setCurrentPage="setCurrentPage"
        />
      </div>
    </div>

    <div class="notes__holder" v-else>
      <div class="notes__empty">{{ $t("note.empty") }}</div>
    </div>

    <div @click="openNoteForm" class="notes__create">
      <img src="@/assets/edit.svg" alt="Edit" />
    </div>

    <note-form
      :isEdit="isEdit"
      :note="noteItem"
      @close="hideNoteForm"
      v-if="noteFormIsOpen"
      @createNote="createNewNote"
      @changeNote="modificateNote"
    />

    <link-form @close="hideLinkForm" v-if="linkFormIsOpen" :link="sharedLink" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { note, error } from "@/store/modules/store.namespaces";

import NoteBlock from "@/components/NoteBlock.vue";
import NoteForm from "@/components/NoteForm.vue";
import LinkForm from "@/components/LinkForm.vue";
import PaginationControl from "@/components/PaginationControl.vue";

export default {
  name: "Notes",
  components: { NoteBlock, NoteForm, LinkForm, PaginationControl },
  data() {
    return {
      noteFormIsOpen: false,
      linkFormIsOpen: false,
      isEdit: false,
      itemsPerPage: 10,
      page: 1,
      noteItem: {
        text: "",
        title: "New note",
      },
    };
  },
  computed: {
    ...mapState(note, ["notes", "sharedLink", "notesCount"]),
  },
  methods: {
    ...mapMutations(error, ["pushToErrors"]),
    ...mapActions(note, [
      "createNote",
      "getNotes",
      "changeNote",
      "deleteNote",
      "shareNote",
    ]),
    openNoteForm() {
      this.noteFormIsOpen = true;
    },
    hideNoteForm() {
      this.noteFormIsOpen = false;
      this.isEdit = false;
      this.noteItem = {
        text: "",
        title: "New note",
      };
    },
    createNewNote(data) {
      this.createNote(data)
        .then(() => {
          this.getNotes({
            limit: this.itemsPerPage,
            offset: (this.page - 1) * this.itemsPerPage,
          });
          this.hideNoteForm();
        })
        .catch((err) => {
          if (err.response) {
            this.pushToErrors(err.response.status);
          } else {
            this.pushToErrors(0);
          }
        });
    },
    modificateNote(data) {
      this.changeNote(data)
        .then(() => {
          this.getNotes({
            limit: this.itemsPerPage,
            offset: (this.page - 1) * this.itemsPerPage,
          });
          this.hideNoteForm();
        })
        .catch((err) => {
          if (err.response) {
            this.pushToErrors(err.response.status);
          } else {
            this.pushToErrors(0);
          }
        });
    },
    removeNote(data) {
      this.deleteNote(data)
        .then(() => {
          this.getNotes({
            limit: this.itemsPerPage,
            offset: (this.page - 1) * this.itemsPerPage,
          });
        })
        .catch((err) => {
          if (err.response) {
            this.pushToErrors(err.response.status);
          } else {
            this.pushToErrors(0);
          }
        });
    },
    generateLink(data) {
      this.shareNote(data)
        .then(() => {
          this.linkFormIsOpen = true;
        })
        .catch((err) => {
          if (err.response) {
            this.pushToErrors(err.response.status);
          } else {
            this.pushToErrors(0);
          }
        });
    },
    hideLinkForm() {
      this.linkFormIsOpen = false;
    },
    editNote(data) {
      this.isEdit = true;
      this.noteItem = data;
      this.noteFormIsOpen = true;
    },
    setCurrentPage(pageNumber) {
      this.page = pageNumber;
      this.getNotes({
        limit: this.itemsPerPage,
        offset: (this.page - 1) * this.itemsPerPage,
      });
    },
  },
  created() {
    this.getNotes({
      limit: this.itemsPerPage,
      offset: (this.page - 1) * this.itemsPerPage,
    });
  },
};
</script>

<style lang="scss" scoped>
.notes {
  &__container {
    height: 77vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__item {
    margin-bottom: 1rem;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }

  &__create {
    position: fixed;
    bottom: 2rem;
    right: 0.8rem;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    transition: all 0.3s;
    background-color: #43a047;
    width: 37px;
    height: 39px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    }
  }

  &__empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
