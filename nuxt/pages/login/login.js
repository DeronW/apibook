export default {
    head() {
        return {
            title: this.$t("Login")
        };
    },
    data() {
        return {
            valid: true,
            username_or_email: "",
            password: "",
            showPwd: false,
            fieldRules: [v => !!v || this.$t("This field is required")]
        };
    },

    mounted() {},

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$axios
                    .$post("/user/login.json", {
                        username_or_email: this.username_or_email,
                        password: this.password
                    })
                    .then(user => {
                        this.$store.commit("user/login", user);
                        this.$store.dispatch("notify", {
                            type: "success",
                            text: this.$t("Login Success")
                        });
                        this.$router.push("/");
                    });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
