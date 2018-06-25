export default {
    head() {
        return {
            title: this.$t("Register")
        };
    },
    data() {
        return {
            email: "",
            username: "",
            password: "",
            password2: "",
            fieldRules: [v => !!v || this.$t("This field is required")]
        };
    },

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$axios
                    .$post("/user/register.json", {
                        email: this.email,
                        username: this.username,
                        password: this.password
                    })
                    .then(() => (location.href = "/"));
            }
        }
    }
};
