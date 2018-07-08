import ListTitle from "./list-title.vue";

export default {
    // data(){
    //     return {
    //         groups: [],
    //         projects: []
    //     }
    // },
    mounted() {
        this.$store.dispatch("group/refreshList");
        this.$store.dispatch("project/refreshList");
    },
    computed: {
        drawer: {
            get: function() {
                return this.$store.state.drawer;
            },
            set: () => null
        },
        projects() {
            return this.$store.state.project.list;
        },
        groups() {
            return this.$store.state.group.list;
        }
    },
    methods: {
        link: function(path) {
            this.$router.push(path);
        }
    },
    components: {
        ListTitle
    }
};
