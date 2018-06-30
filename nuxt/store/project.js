export const state = () => ({
    list: [],
    rows: [
        {
            method: "GET",
            path: "http://some-domain/some-path/?some-search#some-hash"
        },
        {
            method: "POST",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        },
        {
            method: "GET",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        },
        {
            method: "POST",
            path: "/abc"
        },
        {
            method: "POST",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        },
        {
            method: "GET",
            path: "/abc"
        },
        {
            method: "PUT",
            path: "/abc"
        },
        {
            method: "DELETE",
            path: "/abc"
        },
        {
            method: "GET",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        },
        {
            method: "PUT",
            path: "/create a new object"
        },
        {
            method: "GET",
            path: "/abc"
        },
        {
            method: "POST",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        },
        {
            method: "GET",
            path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
        }
    ]
});

export const mutations = {
    refreshList(state, list){
        state.list = list
    },
    refreshRow(state, rows) {
        state.rows = rows;
    }
};

export const actions = {
    refreshList({commit}){
        this.$axios.$get("/project/list.json").then(data => {
            commit("refreshList", data);
        });
    },
    refreshRow({ commit }, projectId) {
        this.$axios.$get("/project/rows.json?id=" + projectId).then(data => {
            commit("refreshRow", data);
        });
    }
};
