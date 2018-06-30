export default {
    data() {
        return {
            model: {
            }
        };
    },

    mounted() {
        this.$axios.$get("/config/info.json").then(data => {
            this.model = data;
        });
    },

    methods: {
        submit() {
            this.$axios
                .$post("/config/update.json", this.model)
                .then(res => {
                    this.$store.dispatch("notify", this.$t("Success"));
                });
        }
    }
};
