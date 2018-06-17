export default {
    data: () => ({
        valid: true,
        name: "",
        password: "",
        showPwd: false,
        fieldRules: [v => !!v || "This field is required"]
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$axios
                    .$post("/login.json", {
                        username: this.name,
                        password: this.password
                    })
                    .then(res => {
                        if (res.success) {
                            location.href = '/'
                        }
                    });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
