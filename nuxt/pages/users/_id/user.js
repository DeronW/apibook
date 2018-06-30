export default {
    asyncData({ params }) {
        return { id: params.id };
    },
    data() {
        return {
            model: {
                username: "",
                email: "",
                password: "",
                new_password: ""
            }
        };
    },
    mounted() {
        this.$axios.$get("/user/info.json?id=" + this.id).then(data => {
            this.model.username = data.username;
            this.model.email = data.email;
        });
    },
    methods: {
        submit: function() {
            this.$axios
                .$post("/user/update.json", {
                    id: this.id,
                    username: this.model.username,
                    password: this.model.new_password
                })
                .then(() => {
                    this.$store.dispatch("notify", this.$t("Success"));
                });
        }
    }
};
