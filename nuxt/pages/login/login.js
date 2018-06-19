export default {
    data() {
        return {
            valid: true,
            name: "",
            password: "",
            showPwd: false,
            fieldRules: [v => !!v || this.$t("This field is required")]
        };
    },

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$axios
                    .$post("/user/login.json", {
                        username: this.name,
                        password: this.password
                    })
                    .then(res => {
                        if (res.success) {
                            // this.$router.push('/')
                            this.$store.dispatch('notify', {
                                type: 'success',
                                text: this.$t('Login Success')
                            })
                        }
                    });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
