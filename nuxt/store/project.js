export const state = () => ({
    list: [],
    favorites: []
});

export const mutations = {
    refreshList(state, list) {
        state.list = list;
    },
    refreshRow(state, rows) {
        state.rows = rows;
    }
};

export const actions = {
    refreshList({ commit, state }, force) {
        if (force || state.list.length == 0)
            this.$axios.$get("/project/list.json").then(data => {
                commit("refreshList", data);
            });
    },
    refreshRow({ commit }, projectId) {
        this.$axios.$get("/project/rows.json?id=" + projectId).then(data => {
            commit("refreshRow", data);
        });
    },
    favorites({ commit, state }) {}
};
