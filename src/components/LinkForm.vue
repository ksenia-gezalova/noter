<template>
  <div class="link-form">
    <base-modal @close="$emit('close')">
      <div slot="header" class="link-form__header">
        <p>{{ $t("note.link") }}</p>
      </div>

      <div slot="body" class="link-form__body" ref="mylink">
        {{ generatedLink }}
      </div>

      <div slot="footer" class="link-form__footer">
        <base-button
          v-clipboard="generatedLink"
          @success="handleSuccess"
          @error="handleError"
        >
          {{ $t("note.copy") }}
        </base-button>
      </div>
    </base-modal>
  </div>
</template>

<script>
import { clipboard } from "vue-clipboards";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  name: "LinkForm",
  components: { BaseModal, BaseButton },
  directives: { clipboard },
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  computed: {
    generatedLink() {
      return `${location.origin}/shared/${this.link.link}`;
    },
  },
  methods: {
    handleSuccess() {
      alert(this.$t("note.copied"));
    },
    handleError() {
      alert(this.$t("note.copyFailed"));
    },
  },
};
</script>

<style lang="scss" scoped>
.link-form {
  &__body {
    word-break: break-all;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style>
