export default {
    computed: {
        show(){
            return this.$store.state.message.text
        },
        message() {
            let msg = this.$store.state.message
            return {
                show: msg.show,
                type: msg.type, // info , warning , success, erro
                text: msg.text
            }
        }
    },
    methods: {
    }
}