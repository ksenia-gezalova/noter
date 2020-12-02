import Router from "vue-router";
import Vue from "vue";
import store from "@/store/store";

Vue.use(Router);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      name: "auth",
      component: loadView("Auth"),
    },
    {
      path: "/notes",
      name: "notes",
      component: loadView("Notes"),
    },
    {
      path: "/shared/:link",
      name: "shared",
      component: loadView("Shared"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userIsAuthorized = !!store.state.auth.token;
  const onlyForUnauth = ["auth"];
  const forBoth = ["shared"];
  const availableForUnauth = onlyForUnauth.concat(forBoth);
  const redirectForUnauth = "/auth";
  const redirectForAuth = "/notes";

  let nextPath = undefined;

  if (userIsAuthorized && onlyForUnauth.includes(to.name))
    nextPath = redirectForAuth;
  else if (!userIsAuthorized && !availableForUnauth.includes(to.name))
    nextPath = redirectForUnauth;

  if (nextPath) next(nextPath);
  else next();
});

export default router;
