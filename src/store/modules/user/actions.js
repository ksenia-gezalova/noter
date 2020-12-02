export default {
  changeLanguage(context, payload) {
    context.commit("setLang", payload.lang);
    payload.i18n.locale = payload.lang;
  },
};
