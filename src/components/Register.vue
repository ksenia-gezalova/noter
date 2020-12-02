<template>
  <div class="register">
    <p>{{ $t("auth.registerForm") }}</p>
    <form class="register__form" @submit.prevent="register">
      <base-input
        class="register__field"
        v-model.trim="userName"
        :label="$t('auth.createLogin')"
      />
      <base-input
        class="register__field"
        v-model.trim="userPassword"
        :label="$t('auth.createPassword')"
        type="password"
      />
      <div class="register__note">*{{ $t("auth.requiredFields") }}</div>
      <div class="register__note">{{ $t("auth.passwordMinLen") }}</div>
      <div class="register__note">{{ $t("auth.loginMaxLen") }}</div>
      <base-button
        @click.prevent="register"
        class="register__submit"
        type="submit"
        :disabled="$v.$invalid"
      >
        {{ $t("auth.register") }}
      </base-button>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import BaseButton from "@/components/base/BaseButton";
import BaseInput from "@/components/base/BaseInput";

export default {
  name: "Register",
  components: { BaseButton, BaseInput },
  data() {
    return {
      userName: "",
      userPassword: "",
    };
  },
  validations: {
    userName: {
      required,
      maxLength: maxLength(10),
    },
    userPassword: {
      required,
      minLength: minLength(4),
    },
  },
  methods: {
    register() {
      let data = {
        name: this.userName,
        password: this.userPassword,
      };
      this.$emit("registerUser", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__field {
    margin: 0.5rem;
  }

  &__note {
    font-size: 0.7rem;
    margin-bottom: 1px;
  }

  &__submit {
    margin-top: 1rem;
    float: right;
  }

  ::v-deep {
    input {
      width: 100%;
    }
  }
}
</style>
