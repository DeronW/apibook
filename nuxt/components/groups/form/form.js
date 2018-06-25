import axios from "axios";

export default {
    props: ["disabled"],
    data() {
        return {
            valid: true,
            project_titles: [
                { text: this.$t("project.name"), sortable: false },
                { text: this.$t('project.describe'), sortable: false },
                { text: this.$t('project.creator'), sortable: false },
                { text: this.$t('project.created_at'), sortable: false }
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
                status: "maintaining",

                adminstrators: ["Programming", "2", "Watching", "4"],
                readers: ["1", "Playing video games", "3", "Sleeping"]
            }
        };
    },

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post("/api/submit", {
                    name: this.name,
                    email: this.email,
                    select: this.select,
                    checkbox: this.checkbox
                });
            }
        },
        clear() {
            // this.$refs.form.reset();
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
