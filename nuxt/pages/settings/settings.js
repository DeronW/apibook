export default {
    data: () => ({
        baseUrl: '',
    }),

    mounted(){
        this.$axios.$get('/settings.json').then(res=>{
            
        })
    },

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$axios
                    .$post("/settings.json", {
                        base_url: this.baseUrl
                    })
                    .then(res => {
                    });
            }
        }
    }
};
