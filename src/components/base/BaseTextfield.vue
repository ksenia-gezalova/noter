<template>
  <div class="base-textfield">
    <span class="base-textfield__name">{{ label }}</span>
    <textarea
      class="base-textfield__field"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: "BaseTextfield",
  props: {
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
      };
    },
  },

  methods: {
    inputHandler(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-textfield {
  &__name {
    display: block;
    margin-bottom: 5px;
  }

  &__field {
    width: 93%;
    height: 100%;
    height: 10rem;
    padding: 10px;
    font-size: 14px;
    color: black;
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    &:active,
    &:focus {
      border: 1px solid #000;
    }
  }
}
</style>
