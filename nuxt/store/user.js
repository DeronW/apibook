export const state = () => ({
    id: null,
    isLogin: false,
    name: "",
    isAdmin: false
});

export const mutations = {
    login(state, userinfo) {
        state.id = userinfo.id;
        state.isAdmin = userinfo.isAdmin;
        (state.name = userinfo.username), (state.isLogin = !!userinfo.id);
    },
    logout(state) {
        state.id = null;
        state.isLogin = false;
        state.isAdmin = false;
        state.name = "";
    }
};

export const actions = {
    logout({ commit }) {
        commit("logou");
        commit("project/favorites");
        commit("group/favorites");
    }
};
