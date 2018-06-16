export const state = () => ({
    locale: "zh",
    drawer: true
});

export const mutations = {
    SET_LANG(state, locale) {
        state.locale = locale;
    },
    TOGGLE_DRAWER(state){
        state.drawer = !state.drawer
    }
};
