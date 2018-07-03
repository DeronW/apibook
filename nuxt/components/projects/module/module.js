export default {
    props: {
        projectId: Number,
        moduleId: Number,
        close: Function
    },
    data() {
        return {
            name: "",
            prefix: "",
            deprecated: false
        };
    },
    watch: {
        moduleId: function() {
            if (this.moduleId) {
                this.$axios
                    .$get("/module/info.json?id=" + this.moduleId)
                    .then(data => {
                        this.name = data.name;
                        this.prefix = data.prefix;
                        this.deprecated = data.deprecated;
                    });
            } else {
                this.name = "";
                this.prefix = "";
                this.deprecated = false;
            }
        }
    },
    mounted() {},
    methods: {
        submit: function() {
            this.moduleId ? this.update() : this.create();
        },
        closeDialog: function() {
            this.close();
        },
        create: function() {
            this.$axios
                .$post("/module/create.json", {
                    name: this.name,
                    prefix: this.prefix,
                    project_id: this.projectId,
                    deprecated: this.deprecated
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Add member Success")
                    });
                })
                .then(this.closeDialog.bind(this));
        },
        update: function() {
            this.$axios
                .$post("/module/update.json", {
                    module_id: this.moduleId,
                    name: this.name,
                    prefix: this.prefix,
                    project_id: this.projectId,
                    deprecated: this.deprecated
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Update member Success")
                    });
                })
                .then(this.closeDialog.bind(this));
        }
    }
};
