<template>
  <div class="auth">
    <div class="auth__container">
      <p>{{ $t("auth.welcome") }}</p>
      <p>{{ $t("auth.about") }}</p>
    </div>

    <div class="auth__wrapper">
      <base-tabs class="auth__tabs" :tabsList="links">
        <template v-slot:login>
          <login @loginUser="authUser" />
        </template>

        <template v-slot:register>
          <register @registerUser="regUser" />
        </template>
      </base-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { auth, error, loader } from "@/store/modules/store.namespaces";

import BaseTabs from "@/components/base/BaseTabs.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Auth",
  components: { BaseTabs, Login, Register },
  computed: {
    ...mapState(auth, ["token"]),
    links() {
      return [
        {
          name: this.$t("auth.login"),
          slotName: "login",
          default: true,
          id: 1,
        },
        {
          name: this.$t("auth.registration"),
          slotName: "register",
          id: 2,
        },
      ];
    },
  },
  methods: {
    ...mapActions(auth, ["loginUser", "registerUser"]),
    ...mapMutations(error, ["pushToErrors"]),
    ...mapMutations(loader, ["setLoader"]),
    authUser(data) {
      this.loginUser(data).then(() => {
        if (this.token) {
          this.$router.push("/notes");
        }
      });
    },
    regUser(data) {
      this.registerUser(data)
        .then(() => {
          this.loginUser(data).then(() => {
            if (this.token) {
              this.$router.push("/notes");
            }
          });
        })
        .catch((err) => {
          if (err.response) {
            this.pushToErrors(err.response.status);
          } else {
            this.pushToErrors(0);
          }
          this.setLoader(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  &__container {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 7rem;
  }

  &__wrapper {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
  }
}
</style>
