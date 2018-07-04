export default {
    props: {
        projectId: Number,
        ApiId: Number,
        close: Function
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
        console.log(this, this.projectId)
        this.$axios
            .$get("/project/modules.json?id=" + this.projectId)
            .then(data => {
                this.modules = data;
            });
    },

    computed: {},

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
