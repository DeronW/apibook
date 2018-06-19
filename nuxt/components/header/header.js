export default {
    data() {
        return {
            items: ["Group", "Project"]
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
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
                this.isLogin = false;
                location = '/'
            });
        }
    }
};
