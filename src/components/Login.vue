<template>
  <div class="login">
    <p>{{ $t("auth.loginForm") }}</p>
    <form class="login__form" @submit.prevent="login">
      <base-input
        class="login__field"
        v-model.trim="userName"
        :label="$t('auth.name')"
      />
      <base-input
        class="login__field"
        v-model.trim="userPassword"
        :label="$t('auth.password')"
        type="password"
      />
      <div class="login__note">*{{ $t("auth.requiredFields") }}</div>
      <base-button
        @click.prevent="login"
        class="login__submit"
        type="submit"
        :disabled="$v.$invalid"
      >
        {{ $t("auth.login") }}
      </base-button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import BaseButton from "@/components/base/BaseButton";
import BaseInput from "@/components/base/BaseInput";

export default {
  name: "Login",
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
    },
    userPassword: {
      required,
    },
  },
  methods: {
    login() {
      let data = {
        name: this.userName,
        password: this.userPassword,
      };
      this.$emit("loginUser", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__field {
    margin: 0.5rem;
  }

  &__note {
    font-size: 0.7rem;
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
