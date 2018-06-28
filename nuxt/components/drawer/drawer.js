import ListTitle from "./list-title.vue";

export default {
    data() {
        return {
            projects: [],
            groups: []
        };
    },
    mounted() {
        this.$axios.$get("/group/list.json").then(data => {
            this.groups = data.map(i => ({ name: i.name, id: i.id }));
        });
        this.$axios.$get("/project/list.json").then(data => {
            this.projects = data.map(i => ({ name: i.name, id: i.id }));
        });
    },
    computed: {
        drawer: {
            get: function() {
                return this.$store.state.drawer;
            },
            set: () => null
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
