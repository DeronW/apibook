// import ApiForm from '~/components/api/form'

export default {
    props: {
        projectId: Number,
        ApiId: Number,
        close: Function
    },
    components: {
        // ApiForm
    },
    data() {
        return {
            modules: [],
            model: {
                path: "",
                select: "GET",
                module: null,
                id: "",
                request: {
                    contentType: "application/json",
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
        moduleId: function() {
            // if (this.ApiId) {
            //     this.$axios
            //         .$get("/api/info.json?id=" + this.ApiId)
            //         .then(data => {
            //         });
            // } else {
            //     this.name = "";
            //     this.deprecated = false;
            // }
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
            this.$axios.$post("/api/create.json");
        },
        remove() {
            this.model.removed = true;
        },
        regain() {
            this.model.removed = false;
        }
    }
};
