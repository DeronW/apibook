LOCALE = "zh";

module.exports = {
    env: {
        locale: LOCALE
    },
    head: {
        title: "",
        meta: [{ charset: "utf-8" }]
    },
    css: [],
    plugins: ["~/plugins/i18n.js", "~/plugins/define.js"],
    build: {
        // analyze: true,
        extractCSS: true,
        vendor: ["babel-polyfill", "axios"],
        // publicPath: "_nuxt",
        extend(config, { isDev, isClient }) {
            config.module.rules.push({
                resourceQuery: /\bblockType=i18n\b/,
                loader: "@kazupon/vue-i18n-loader"
            });
        }
    },
    modules: ["@nuxtjs/proxy", "@nuxtjs/axios", "@nuxtjs/vuetify"],
    proxy: {
        "/api/": {
            target: "http://localhost:3000"
        }
    }
};
