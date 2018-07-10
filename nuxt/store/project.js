export const state = () => ({
    favorites: []
});

export const mutations = {
    favorites(state, projects) {
        state.favorites = projects || [];
    }
};

export const actions = {
    favorites({ commit }) {
        this.$axios.$get("/project/watching.json").then(data => {
            commit("favorites", data);
        });
    }
};
