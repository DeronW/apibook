export default {
    props: ["disabled", "groupId"],
    data() {
        return {
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
            },
            addUserTips: null
        };
    },
    mounted() {
        if (this.groupId) this.refreshGroupInfo();
    },
    methods: {
        submit() {
            if (this.model.name) {
                this.groupId ? this.updateGroup() : this.createGroup();
            } else {
                alert("Name is required");
            }
        },
        refreshGroupInfo() {
            this.$axios
                .$get("/group/info.json?gid=" + this.groupId)
                .then(data => {
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
                .$post("/group/add/member.json", {
                    email_or_username: e.target.value,
                    gid: this.groupId
                })
                .then(
                    () => {
                        this.$store.dispatch("notify", {
                            type: "success",
                            text: this.$t("Add member Success")
                        });
                        this.addUserTips = null;
                    },
                    e => {
                        this.addUserTips = e.message || "Failed";
                    }
                )
                .then(this.refreshGroupInfo);
        },
        removeMember(uid) {
            if (!confirm(this.$t("Remove user from this group?"))) return;
            this.$axios
                .$post("/group/remove/member.json", {
                    uid: uid,
                    gid: this.groupId
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
                    gid: this.groupId,
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
