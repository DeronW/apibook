import Vue from "vue";

import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// dayjs.locale("zh-cn");

import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const Plugin = {
    install: function(Vue, options) {
        Vue.prototype.$dayjs = dayjs;
    }
};

Vue.use(Plugin, {});
