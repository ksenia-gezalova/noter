<template>
  <div class="base-modal__mask" @click.self="$emit('close')">
    <div class="base-modal__wrapper">
      <div class="base-modal__container">
        <div class="base-modal__header">
          <slot name="header"></slot>
        </div>

        <div class="base-modal__body">
          <slot name="body"></slot>
        </div>

        <div class="base-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
};
</script>

<style lang="scss" scoped>
.base-modal {
  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 230px;
    padding: 20px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -50%);

    @media (min-width: 760px) {
      width: 90%;
      max-width: 420px;
    }
  }

  &__body {
    margin: 20px 0;
  }
}
</style>
