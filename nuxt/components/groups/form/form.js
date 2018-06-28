export default {
    props: ["disabled", "id"],
    data() {
        return {
            valid: true,
            project_titles: [
                { text: this.$t("project.name"), sortable: false },
                { text: this.$t("project.describe"), sortable: false },
                { text: this.$t("project.creator"), sortable: false },
                { text: this.$t("project.created_at"), sortable: false }
            ],
            projects: [
                {
                    avatar: "...",
                    name: "t",
                    describe: "d"
                }
            ],
            model: {
                name: "",
                describe: "",
                scope: "public",

                adminstrators: ["Programming", "2", "Watching", "4"],
                readers: ["1", "Playing video games", "3", "Sleeping"]
            }
        };
    },
    mounted() {
        if (this.id) {
            this.$axios.$get("/group/info.json?id=" + this.id).then(data => {
                this.model.name = data.name;
                this.model.describe = data.describe;
                this.model.scope = data.scope;
            });
        }
    },
    methods: {
        submit() {
            if (!this.$refs.form.validate()) return;
            this.id ? this.updateGroup() : this.createGroup();
        },
        createGroup() {
            this.$axios
                .$post("/group/create.json", {
                    name: this.model.name,
                    describe: this.model.describe,
                    scope: this.model.scope
                })
                .then(data => {
                    this.$router.push("/groups/" + data.id);
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
                    scope: this.model.scope
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Update Success")
                    });
                });
        },
        removeAdministrator(name) {
            this.adminstrators.splice(this.adminstrators.indexOf(name), 1);
            this.adminstrators = [...this.adminstrators];
        },
        removeReader(name) {
            this.readers.splice(this.readers.indexOf(name), 1);
            this.readers = [...this.readers];
        }
    }
};
