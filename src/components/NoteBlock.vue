<template>
  <div class="note">
    <h4 class="note__title">{{ note.title }}</h4>
    <div class="note__text">{{ note.text }}</div>
    <div class="note__footer">
      <div class="note__times">
        <div class="note__time">
          {{ $t("note.createdAt") }}
          {{ note.createdAt.replace("T", " ").replace(".000Z", " ") }}
        </div>
        <div class="note__time">
          {{ $t("note.updatedAt") }}
          {{ note.updatedAt.replace("T", " ").replace(".000Z", " ") }}
        </div>
      </div>
      <div class="note__panel" v-if="!isShared">
        <span @click="shareNote" class="note__button">{{
          $t("note.share")
        }}</span>
        <span @click="editNote" class="note__button note__button--green">{{
          $t("note.edit")
        }}</span>
        <span @click="deleteNote" class="note__button note__button--red">{{
          $t("note.delete")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    note: {
      type: Object,
      required: true,
    },
    isShared: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    shareNote() {
      this.$emit("shareNote", this.note.id);
    },
    deleteNote() {
      this.$emit("deleteNote", this.note.id);
    },
    editNote() {
      this.$emit("editNote", this.note);
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 2rem;
  transition: box-shadow 0.3s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  overflow: hidden;

  &__title {
    margin-top: 0;
    margin-bottom: 10px;
    transition: all 0.3s;
  }

  &__text {
    word-break: break-all;
  }

  &:hover {
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  &:hover .note__title {
    color: #2e7d32;
  }

  &__footer {
    margin-top: 1rem;
    font-size: 0.8rem;
  }

  &__panel {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  &__button {
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.4s;
    font-size: 1rem;

    &:hover {
      font-weight: bold;
    }

    &--green {
      &:hover {
        color: #00695c;
      }
    }

    &--red {
      &:hover {
        color: #e64a19;
      }
    }
  }
}
</style>
