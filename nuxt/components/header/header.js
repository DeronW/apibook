export default {
    data: () => ({
        drawer: null,
        items: ["Group", "Project"],
        isLogin: false,
        user: {
            name: '',
            id: ''
        }
    }),
    mounted(){
        this.$axios.$get('/userinfo.json').then(res => {
            this.isLogin = res.isLogin
            if(res.isLogin){
                this.user.name = res.username
                this.user.id = res.user_id
            }
        })
    },
    methods: {
        toggleDrawer: function(){
            this.$store.commit('TOGGLE_DRAWER')
        },
        logout: function(){
            this.$axios.$get('/logout.json').then(res => {
                this.isLogin = false
            })
        }
    }
};
