import { ProjectModule } from "~/components";

export default {
    asyncData({ params }) {
        return {
            projectId: parseInt(params.id)
        };
    },
    head() {
        return {
            title: this.$t("Project")
        };
    },
    components: {
        ProjectModule
    },
    data() {
        return {
            dialogModule: {
                show: false,
                moduleId: null
            },
            modules: [],
            apis: []
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        check: function(id) {
            console.log(id);
        },
        refresh() {
            this.$axios
                .$get("/project/modules.json?id=" + this.projectId)
                .then(data => {
                    this.modules = data;
                });
            this.$axios
                .$get("/project/apis.json?id=" + this.projectId)
                .then(data => {
                    this.apis = data;
                });
        },
        editModule: function(id) {
            console.log(id)
            if (id) this.dialogModule.moduleId = id;
            this.dialogModule.show = true;
        },
        hideModule: function() {
            this.dialogModule.show = false;
            this.dialogModule.moduleId = null;
            this.refresh();
        }
    }
};
