export default {
    props: ["disabled", "id"],
    data() {
        return {
            valid: true,
            group_list: [],
            model: {
                name: "",
                describe: "",
                scope: "public",
                status: "maintaining",
                group_id: "",

                members: ["1", "Playing video games", "3", "Sleeping"]
            }
        };
    },
    mounted() {
        if (this.id) {
            this.$axios.$get("/project/info.json?id=" + this.id).then(data => {
                this.model.name = data.name;
                this.model.describe = data.describe;
                this.model.scope = data.scope;
                this.model.status = data.status;
                this.model.group_id = data.group_id;
            });
        }
        this.$axios.$get("/group/list.json").then(data => {
            let items = [];
            data.forEach(i => {
                items.push({
                    text: i.name,
                    value: i.id
                });
            });
            this.group_list = items;
        });
    },
    methods: {
        submit() {
            if (!this.$refs.form.validate()) return;
            this.id ? this.updateGroup() : this.createGroup();
        },
        createGroup() {
            this.$axios
                .$post("/project/create.json", {
                    name: this.model.name,
                    describe: this.model.describe,
                    scope: this.model.scope,
                    status: this.model.status,
                    group: this.model.group
                })
                .then(data => {
                    this.$router.push("/projects/" + data.id);
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Creation Success")
                    });
                });
        },
        updateGroup() {
            this.$axios
                .$post("/group/update.json", {
                    id: this.id,
                    name: this.model.name,
                    describe: this.model.describe,
                    scope: this.model.scope,
                    status: this.model.status
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Update Success")
                    });
                });
        },
        removeMember(name) {
            this.members.splice(this.members.indexOf(name), 1);
            this.members = [...this.members];
        }
    }
};
