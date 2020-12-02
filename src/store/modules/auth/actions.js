import authService from "@/services/authService";

export default {
  loginUser(context, payload) {
    context.commit("loader/setLoader", true, { root: true });
    return authService
      .loginUser(payload)
      .then((response) => {
        context.commit("setToken", response.data.token);
        context.commit(
          "user/setUserInfo",
          {
            id: response.data.id,
            name: response.data.name,
          },
          { root: true }
        );
        context.commit("loader/setLoader", false, { root: true });
      })
      .catch((err) => {
        context.commit("loader/setLoader", false, { root: true });
        if (err.response) {
          context.commit("error/pushToErrors", err.response.status, {
            root: true,
          });
        } else {
          context.commit("error/pushToErrors", 0, { root: true });
        }
      });
  },

  logoutUser(context, payload) {
    context.commit("loader/setLoader", true, { root: true });
    return authService
      .logoutUser(payload)
      .then(() => {
        context.commit("setToken", null);
        context.commit("user/setUserInfo", {}, { root: true });
        context.commit("loader/setLoader", false, { root: true });
      })
      .catch((err) => {
        context.commit("loader/setLoader", false, { root: true });
        if (err.response) {
          context.commit("error/pushToErrors", err.response.status, {
            root: true,
          });
        } else {
          context.commit("error/pushToErrors", 0, { root: true });
        }
      });
  },

  registerUser(context, payload) {
    context.commit("loader/setLoader", true, { root: true });
    return authService.registerUser(payload).then((response) => {
      context.commit("loader/setLoader", false, { root: true });
      return response;
    });
  },
};
