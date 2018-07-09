export default {
    props: {
        projectId: Number,
        moduleId: Number,
        close: Function
    },
    data() {
        return {
            name: "",
            prefix: ""
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
                    });
            } else {
                this.name = "";
                this.prefix = "";
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
                    project_id: this.projectId
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
                    project_id: this.projectId
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
