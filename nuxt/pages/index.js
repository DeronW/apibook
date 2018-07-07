export default {
    head() {
        return {
            title: this.$t("Welcome to API Book")
        };
    },
    data() {
        return {
            groups: [],
            projects: []
        };
    },
    computed: {
        group_list: function() {
            return this.showAllGroups ? this.groups : this.groups.slice(0, 6);
        },
        project_list: function() {
            return this.showAllProjects
                ? this.projects
                : this.projects.slice(0, 6);
        }
    },
    mounted() {
        this.$axios.$get("/group/list.json").then(data => {
            this.groups = data;
        });
        this.$axios.$get("/project/list.json").then(data => {
            this.projects = data;
        });
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
