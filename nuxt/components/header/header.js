export default {
    data: () => ({
        drawer: null,
        items: ["Group", "Project"]
    }),
    methods: {
        toggleDrawer: function(){
            this.$store.commit('TOGGLE_DRAWER')
        }
    }
};
