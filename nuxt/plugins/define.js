import Vue from "vue";

import dayjs from "dayjs";

const Plugin = {
    install: function(Vue, options) {
        Vue.prototype.$dayjs = dayjs;
    }
};

Vue.use(Plugin, {});
