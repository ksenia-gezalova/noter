<template>
  <div class="note-form">
    <base-modal @close="$emit('close')">
      <div slot="header" class="note-form__header">
        <base-input class="note-form__field" v-model.trim="editedNote.title" />
      </div>

      <div slot="body" class="note-form__body">
        <base-textfield
          @keyup="charCount"
          v-model.trim="editedNote.text"
          class="note-form__textfield"
          :placeholder="$t('note.enterText')"
        ></base-textfield>
        <span class="note-form-counter">{{ currentSymbols }}/1000</span>
      </div>

      <div slot="footer" class="note-form__footer">
        <base-button @click="handleNote">
          {{ buttonText }}
        </base-button>
      </div>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from "@/components/base/BaseModal.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTextfield from "@/components/base/BaseTextfield.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const MAX_CHARACTER = 1000;

export default {
  name: "NoteForm",
  components: { BaseModal, BaseButton, BaseTextfield, BaseInput },
  data() {
    return {
      editedNote: Object.assign({}, this.note),
    };
  },
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    note: {
      type: Object,
      required: false,
      default: () => ({
        text: "",
        title: "New note",
      }),
    },
  },
  computed: {
    buttonText() {
      return this.isEdit ? this.$t("note.edit") : this.$t("note.create");
    },
    currentSymbols() {
      return this.editedNote.text.length;
    },
  },
  methods: {
    handleNote() {
      this.isEdit
        ? this.$emit("changeNote", this.editedNote)
        : this.$emit("createNote", this.editedNote);
    },
    charCount() {
      if (this.currentSymbols > MAX_CHARACTER) {
        this.editedNote.text = this.editedNote.text.substring(0, MAX_CHARACTER);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.note-form {
  ::v-deep {
    input[type="text"] {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      font-size: 1rem;
      outline: none;
      border-radius: 0;

      &:active,
      &:focus {
        border-bottom: 1px solid #000;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style>
