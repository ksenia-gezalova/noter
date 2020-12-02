<template>
  <div class="shared">
    <note-block v-if="note" class="notes__item" :note="note" :isShared="true" />
    <p class="shared__error">{{ error }}</p>

    <div class="shared__container">
      <router-link class="shared__link" v-if="user.id" to="/notes">{{
        $t("note.myNote")
      }}</router-link>

      <router-link class="shared__link" v-else to="/auth">{{
        $t("auth.registerForm")
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { note, user, error } from "@/store/modules/store.namespaces";
import NoteBlock from "@/components/NoteBlock.vue";

export default {
  name: "Shared",
  data() {
    return {
      note: null,
      error: null,
    };
  },
  components: { NoteBlock },
  computed: {
    ...mapState(user, ["user"]),
    ...mapState(error, ["errors"]),
  },
  methods: {
    ...mapActions(note, ["getNoteByLink"]),
  },
  created() {
    this.getNoteByLink(this.$route.params.link).then(
      (response) => (this.note = response.data)
    );
  },
};
</script>

<style lang="scss" scoped>
.shared {
  &__container {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
  }
  &__link {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    transition: all 0.3s;
    color: #000;

    &:visited {
      color: #000;
    }

    &:hover {
      color: #43a047;
    }
  }
}
</style>
