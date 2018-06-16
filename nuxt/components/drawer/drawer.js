export default {
    computed: {
        drawer: function() {
            console.log(111, this.$store.state.drawer)
            return this.$store.state.drawer;
        }
    },
    fetch({store}){
    }
};
