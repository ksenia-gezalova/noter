<template>
  <div class="app">
    <div class="app__errors" v-if="errors">
      <div @click="removeErrors" class="app__errors-close">X</div>
      <div class="app__error" v-for="(error, index) in errors" :key="index">
        {{ $t(errorsDict[error] || serverError) }}
      </div>
    </div>

    <div class="app__container">
      <img
        @click="logout"
        v-if="$route.path !== '/auth' && user.id !== null"
        class="app__logout"
        height="20px"
        src="@/assets/logout.svg"
        alt="logout"
        title="Logout"
      />
      <lang-select class="app__lang" />

      <loader v-if="isLoading" />
      <router-view v-show="!isLoading" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { auth, user, error, loader } from "@/store/modules/store.namespaces";
import LangSelect from "@/components/LangSelect.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "App",
  components: {
    LangSelect,
    Loader,
  },
  data() {
    return {
      errorsDict: {
        0: "error.noServer",
        400: "error.badRequest",
        404: "error.notFound",
        403: "error.forbidden",
      },
      serverError: "error.server",
    };
  },
  computed: {
    ...mapState(auth, ["token"]),
    ...mapState(user, ["user"]),
    ...mapState(error, ["errors"]),
    ...mapState(loader, ["isLoading"]),
  },
  methods: {
    ...mapActions(auth, ["logoutUser"]),
    ...mapMutations(error, ["removeErrors"]),
    logout() {
      this.logoutUser(this.token).then(() => {
        this.$router.push("/auth");
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  margin: 0;
  font-size: 10px;

  @media (min-width: 760px) {
    font-size: 15px;
  }
}

body {
  /* width */
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: darkgray;
    border-radius: 6px;
  }
}

.app {
  height: 100vh;
  overflow: hidden;

  &__container {
    padding: 10px;
  }

  &__lang {
    float: right;
  }

  &__logout {
    position: relative;
    transform: rotate(180deg);
    cursor: pointer;
    opacity: 0.4;
    transition: all 0.3s;
    float: right;

    &:hover {
      opacity: 1;
    }
  }

  &__errors {
    background-color: #d32f2f;
    color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    &-close {
      cursor: pointer;
      align-self: flex-end;
    }
  }

  &__error {
    align-self: center;
  }
}
</style>
