<template>
  <div class="base-input">
    <label>
      {{ label }}
      <input
        :type="type"
        :class="{
          'base-input__field': true,
          'base-input__field--error': invalid,
        }"
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
    <span v-if="invalid" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  &__field {
    padding: 0.5rem;
    font-size: 1.4rem;
    color: #000;
    letter-spacing: 0.5px;
    border: 1px solid #757575;
    border-radius: 3px;
    transition: all 0.3s;

    &--error {
      border: 1px solid #ff3d00;
    }
  }
  &__error {
    color: #ff3d00;
    font-size: 0.9rem;
  }
}
</style>
