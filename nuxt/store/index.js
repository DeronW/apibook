export const state = () => ({
    locale: "zh",
    drawer: 1,
    message: {
        show: false,
        type: "info",
        text: ""
    }
});

export const mutations = {
    SET_LANG(state, locale) {
        state.locale = locale;
    },
    TOGGLE_DRAWER(state) {
        state.drawer = !state.drawer;
    },
    NOTIFY(state, msg) {
        if (msg) {
            console.log(msg);
            state.message = {
                show: true,
                type: msg.type || "info",
                text: msg.text
            };
        } else {
            state.message.show = false;
        }
    }
};

let timer;

export const actions = {
    notify({ commit }, msg) {
        commit("NOTIFY", msg);
        clearTimeout(timer);
        timer = setTimeout(() => commit("NOTIFY", null), 2500);
    }
};
