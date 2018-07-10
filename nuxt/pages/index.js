import { GroupScopeText, ProjectScopeText } from "~/components";

export default {
    head() {
        return {
            title: this.$t("Welcome to API Book")
        };
    },
    data() {
        return {
            limit: 6,
            groups: [],
            projects: []
        };
    },
    components: {
        GroupScopeText,
        ProjectScopeText
    },
    mounted() {
        this.$axios.$get("/group/all.json").then(data => {
            this.groups = data;
        });
        this.$axios.$get("/project/all.json").then(data => {
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
