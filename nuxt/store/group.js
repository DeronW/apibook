export const state = () => ({
    all: [],
    favorites: []
});

export const mutations = {
    all(state, groups) {
        state.all = groups || [];
    },
    favorites(state, groups) {
        state.favorites = groups || [];
    }
};

export const actions = {
    refreshList({ commit }) {
        this.$axios.$get("/group/all.json").then(data => {
            commit("all", data);
        });
    },
    favorites({ commit }) {
        this.$axios.$get("/group/favorites.json").then(data => {
            commit("favorites", data);
        });
    }
};
