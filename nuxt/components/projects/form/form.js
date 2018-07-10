export default {
    props: ["disabled", "projectId"],
    data() {
        return {
            member_titles: [
                { text: this.$t("Username"), class: "text-xs-center" },
                {
                    text: "",
                    sortable: false
                }
            ],
            group_list: [],
            addUserTips: null,
            model: {
                name: "",
                describe: "",
                scope: "public",
                status: "maintaining",
                group_id: "",

                members: []
            }
        };
    },
    mounted() {
        if (this.projectId) this.refreshProjectInfo();

        this.$axios.$get("/group/all.json").then(data => {
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
            if (this.model.name) {
                this.projectId ? this.updateGroup() : this.createGroup();
            } else {
                alert(this.$t("Name is required"));
            }
        },
        refreshProjectInfo() {
            this.$axios
                .$get("/project/info.json?pid=" + this.projectId)
                .then(data => {
                    this.model.name = data.name;
                    this.model.describe = data.describe;
                    this.model.scope = data.scope;
                    this.model.status = data.status;
                    this.model.group_id = data.group_id;
                    this.model.members = data.members;
                });
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
                .$post("/project/update.json", {
                    pid: this.projectId,
                    name: this.model.name,
                    describe: this.model.describe,
                    scope: this.model.scope,
                    status: this.model.status,
                    group_id: this.model.group_id
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Update Success")
                    });
                });
        },
        addMember(event) {
            this.$axios
                .$post("/project/add/member.json", {
                    email_or_username: event.target.value,
                    pid: this.projectId
                })
                .then(
                    () => {
                        this.addUserTips = null;
                        this.$store.dispatch("notify", {
                            type: "success",
                            text: this.$t("Add member Success")
                        });
                    },
                    e => {
                        this.addUserTips = e.message || "Failed";
                    }
                )
                .then(this.refreshProjectInfo);
        },
        removeMember(uid) {
            if (!confirm(this.$t("Remove user from this project?"))) return;
            this.$axios
                .$post("/project/remove/member.json", {
                    uid: uid,
                    pid: this.projectId
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t("Remove member Success")
                    });
                })
                .then(this.refreshProjectInfo);
        }
    }
};
