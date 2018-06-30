export const state = () => ({
    list: []
});

export const mutations = {
    refreshList(state, list) {
        state.list = list;
    }
};

export const actions = {
    refreshList({ commit, state }, force) {
        if (force || state.list.length === 0)
            this.$axios.$get("/group/list.json").then(data => {
                commit("refreshList", data);
            });
    }
};
