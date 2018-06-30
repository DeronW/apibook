export default {
    data() {
        return {
            search: "",
            headers: [
                {
                    text: "",
                    align: "left",
                    value: "method"
                },
                {
                    text: "Path",
                    align: "left",
                    value: "path"
                }
            ]
        };
    },
    computed:{
        rows(){
            return this.$store.state.project.rows
        }
    },
    mounted(){

    }
};
