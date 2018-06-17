export default {
    data() {
        let items = [
            { heading: "Favorites" },
            { icon: "star_border", text: "some project" },
            { divider: true },
            { heading: "Group" },
            { icon: "star_border", text: "some group" },
            { divider: true },
            { icon: "settings", text: "Settings", link: "/settings" },
            { icon: "help", text: "Help", link: "/help" }
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
