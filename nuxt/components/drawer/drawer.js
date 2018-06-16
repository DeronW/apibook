export default {
    data() {
        let items = [
            { heading: "Favorites" },
            { icon: "star_border", text: "some project" },
            { icon: "star_border", text: "some project" },
            { divider: true },
            { heading: "Group" },
            { icon: "star_border", text: "some group" },
            { icon: "star_border", text: "some group" },
            { divider: true },
            { icon: "settings", text: "Settings" },
            { icon: "help", text: "Help" }
        ];
        return {
            items: items
        };
    },
    computed: {
        drawer: {
            get: function() {
                return this.$store.state.drawer;
            },
            set: () => null
        }
    }
};
