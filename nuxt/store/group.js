export const state = () => ({
    favorites: []
});

export const mutations = {
    favorites(state, groups) {
        state.favorites = groups || [];
    }
};

export const actions = {
    favorites({ commit }) {
        this.$axios.$get("/group/watching.json").then(data => {
            commit("favorites", data);
        });
    }
};
