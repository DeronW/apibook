import ListTitle from "./list-title.vue";

export default {
    mounted() {
        this.$store.dispatch("group/favorites");
        this.$store.dispatch("project/favorites");
    },
    computed: {
        drawer() {
            return this.$store.state.drawer;
        },
        projects() {
            return this.$store.state.project.favorites;
        },
        groups() {
            return this.$store.state.group.favorites;
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
