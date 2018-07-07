import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app, store }) => {
    store.commit("SET_LANG", process.env.locale);

    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: "en",
        silentTranslationWarn: true,
        messages: {
            zh: require("~/locales/zh.json"),
            en: require("~/locales/en.json")
        }
    });
};
