export default {
    head() {
        return {
            title: this.$t("Welcome to API Book")
        };
    },
    computed: {
        groups() {
            return this.$store.state.group.list;
        },
        projects() {
            return this.$store.state.project.list;
        }
    },
    mounted() {
        this.$store.dispatch("group/refreshList");
        this.$store.dispatch("project/refreshList");
    },
    methods: {
        linkGroup(id) {
            this.$router.push(`/groups/${id}`);
        },
        linkProject(id) {
            this.$router.push(`/projects/${id}`);
        }
    }
};
