export default {
    props: ["disabled", "id"],
    data() {
        return {
            valid: true,
            member_titles: [
                { text: this.$t("Username"), class: "text-xs-center" },
                {
                    text: "",
                    sortable: false
                }
            ],
            project_titles: [
                {
                    text: this.$t("project.name"),
                    class: "text-xs-center",
                    sortable: false
                },
                { text: this.$t("project.describe"), sortable: false },
                { text: this.$t("project.scope"), sortable: false },
                { text: this.$t("project.status"), sortable: false },
                { text: this.$t("project.created_at"), sortable: false },
                { text: "", sortable: false }
            ],
            projects: [],
            model: {
                name: "",
                describe: "",
                scope: "public",
                members: []
            }
        };
    },
    mounted() {
        if (this.id) this.refreshGroupInfo();
    },
    methods: {
        submit() {
            if (!this.$refs.form.validate()) return;
            this.id ? this.updateGroup() : this.createGroup();
        },
        refreshGroupInfo() {
            this.$axios.$get("/group/info.json?id=" + this.id).then(data => {
                this.model.name = data.name;
                this.model.describe = data.describe;
                this.model.scope = data.scope;
                this.model.members = data.members.map(i => ({
                    username: i.username,
                    id: i.id,
                    show: true
                }));
                this.projects = data.projects;
            });
        },
        addMember(e) {
            this.$axios
                .$post("/group/add_member.json", {
                    email_or_username: e.target.value,
                    id: this.id
                })
                .then(() => {
                    e.target.value = "";
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Add member Success")
                    });
                })
                .then(this.refreshGroupInfo);
        },
        removeMember(uid) {
            this.$axios
                .$post("/group/remove_member.json", {
                    user_id: uid,
                    id: this.id
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Remove member Success")
                    });
                })
                .then(this.refreshGroupInfo);
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
        removeProject(pid) {
            this.$axios
                .$post("/group/remove_project.json", {
                    id: this.id,
                    project_id: pid
                })
                .then(this.refreshGroupInfo);
        }
    }
};
