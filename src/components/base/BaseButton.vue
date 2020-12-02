<template>
  <button
    v-bind="$attrs"
    type="button"
    :class="classes"
    :disabled="disabled"
    class="base-button"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    disabled: {
      default: false,
    },
    round: {
      default: true,
    },
    isBordered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return [
        {
          "base-button--borderless": !this.isBordered,
          "base-button--round": this.round,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  padding: 9px 20px 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: #43a047;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s;
  outline: none;

  &:hover {
    background-color: #2e7d32;
    border-color: #2e7d32;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #2e7d32;
    border-color: #2e7d32;
    box-shadow: initial;
  }

  &--round {
    border-radius: 55px;
  }

  &:disabled {
    color: #000;
    cursor: auto;
    background-color: #cfd8dc;
    border-color: transparent;
    box-shadow: none;
  }

  &--borderless {
    color: #000;
    background: transparent;
    border-color: transparent;

    &:hover {
      color: #2e7d32;
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    &:active {
      color: #2e7d32;
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }
}
</style>
