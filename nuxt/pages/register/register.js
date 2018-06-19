export default {
    head(){
        return {
            title: this.$t('Register')
        }
    },
    data() {
        return {
            valid: true,
            email: "",
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
                        password: this.password
                    })
                    .then(res => {
                        if (res.success) {
                            location.href = "/";
                        }
                    });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
