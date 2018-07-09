export default {
    data() {
        return {
            items: ["Group", "Project"]
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        show() {
            let user = this.$store.state.user,
                config = this.$store.state.config;
            let showLogin = !user.isLogin && !config.freelance;
            return {
                newButton: user.isLogin || config.freelance,
                login: showLogin,
                register: showLogin && config.allowRegister,
                logout: user.isLogin
            };
        }
    },
    mounted() {
        this.$axios.$get("/user/info.json").then(res => {
            if (res.id) {
                this.$store.commit("user/login", {
                    id: res.id,
                    username: res.username,
                    isAdmin: res.isAdmin
                });
            }
        });

        this.$axios.$get("/config/info.json").then(data => {
            this.$store.commit("SET_CONF", {
                freelance: data.freelance,
                mountUrl: data.mount_url,
                allowRegister: data.allow_register
            });
        });
    },
    methods: {
        toggleDrawer: function() {
            this.$store.commit("TOGGLE_DRAWER");
        },
        goHome: function() {
            this.$router.push("/");
        },
        logout: function() {
            this.$axios.$get("/user/logout.json").then(res => {
                this.$store.commit("user/logout");
                this.$store.dispatch("notify", {
                    type: "warning",
                    text: this.$t("Logout Success")
                });
                this.goHome();
            });
        }
    }
};
