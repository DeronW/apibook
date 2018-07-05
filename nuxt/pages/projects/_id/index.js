import { ProjectModule, ProjectAPI } from "~/components";

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
        ProjectModule,
        ProjectAPI
    },
    data() {
        return {
            dialogModule: {
                show: false,
                id: null
            },
            dialogApi: {
                show: false,
                moduleId: null,
                id: null
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
            this.dialogApi.id = id;
            this.dialogApi.show = true;
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
            if (id) this.dialogModule.id = id;
            this.dialogModule.show = true;
        },
        hideModule: function() {
            this.dialogModule.show = false;
            this.dialogModule.id = null;
            this.refresh();
        },
        createAPI: function(moduleId) {
            if (moduleId) this.dialogApi.moduleId = moduleId;
            this.dialogApi.id = null;
            this.dialogApi.show = true;
        },
        editAPI: function(id) {
            if (id) this.dialogApi.id = id;
            this.dialogApi.moduleId = null;
            this.dialogApi.show = true;
        },
        hideAPI: function() {
            this.dialogApi.show = false;
            this.dialogApi.id = null;
            // this.refresh();
        }
    }
};
