export const state = () => ({
    list: []
});

export const mutations = {
    refreshList(state, list) {
        state.list = list;
    }
};

export const actions = {
    refreshList({ commit }) {
        this.$axios.$get("/group/list.json").then(data => {
            commit("refreshList", data);
        });
    }
};
