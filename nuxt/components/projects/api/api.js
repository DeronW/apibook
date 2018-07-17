import CONSTANTS from '~/constants'

export default {
    props: {
        projectId: Number,
        moduleId: Number,
        ApiId: Number,
        close: Function
    },
    components: {
    },
    data() {
        return {
            alert: {
                type: "info",
                text: ""
            },
            FORM_TYPES: CONSTANTS.FORM_TYPES,
            PLAIN_TYPES: CONSTANTS.PLAIN_TYPES,
            METHODS: CONSTANTS.METHODS,
            OPTIONS: {
                required: [
                    { text: this.$t("Yes"), value: true },
                    { text: this.$t("No"), value: false }
                ]
            },
            modules: [],
            model: {
                path: "/default/path.json",
                method: "GET",
                formType: 'application/x-www-form-urlencoded',
                plainTextType: 'application/json',
                module: this.moduleId,
                describe: "",
                request: {
                    contentType: "plain/text",
                    fields: []
                },
                response: {
                    contentType: "plaintext",
                    fields: []
                },
                deprecated: false,
                removed: true
            }
        };
    },
    watch: {
        moduleId: function() {},
        ApiId: function() {
            if (this.ApiId)
                this.$axios
                    .$get("/api/info.json?id=" + this.ApiId)
                    .then(data => {
                        this.model.path = data.path;
                        this.model.method = data.method;
                        this.model.module = data.module_id;
                        this.modle.describe = data.describe;
                    });
        }
    },

    mounted() {
        this.$axios
            .$get("/project/modules.json?id=" + this.projectId)
            .then(data => {
                this.modules = [{ id: null, name: "--", prefix: " " }, ...data];
            });
    },

    computed: {
        prefix: function() {
            if (this.model.module)
                for (let i = 0; i < this.modules.length; i++) {
                    if (this.modules[i].id == this.model.module)
                        return this.modules[i].prefix;
                }
            return "";
        }
    },

    methods: {
        submit() {
            this.ApiId ? this.update() : this.create();
        },
        create() {
            this.$axios
                .$post("/api/create.json", {
                    method: this.model.method,
                    path: this.model.path,
                    describe: this.model.describe,
                    module_id: this.model.module,
                    project_id: this.projectId
                })
                .then(data => {
                    this.alert = {
                        type: "success",
                        text: "Create Success"
                    };
                })
                .then(() => {
                    setTimeout(() => {
                        this.alert.text = null;
                    }, 2000);
                });
        },
        update() {},
        remove() {
            this.model.removed = true;
        },
        regain() {
            this.model.removed = false;
        },
        addResuestField() {
            let fields = this.model.request.fields;
            fields.push({
                name: "new",
                type: "String"
            });
            this.model.request.fields = fields;
        }
    }
};
