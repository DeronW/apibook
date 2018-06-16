import axios from "axios";

export default {
    data: () => ({
        valid: true,
        name: "",
        nameRules: [
            v => !!v || "Name is required",
            v => (v && v.length <= 10) || "Name must be less than 10 characters"
        ],
        describe: "",
        checkbox: 1,

        adminstrators: ['Programming', '2', 'Watching', '4'],
        readers: ['1', 'Playing video games', '3', 'Sleeping'],
        project_titles: [{
            text: 'name',
            sortable: false
        }, {
            text: 'Describe',
            sortable: false
        }],
        projects: [{
            avatar: '...',
            name: 't',
            describe: 'd'
        }]
    }),

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
            this.$refs.form.reset();
        },
        removeAdministrator (name) {
            this.adminstrators.splice(this.adminstrators.indexOf(name), 1)
            this.adminstrators = [...this.adminstrators]
        },
        removeReader(name){
            this.readers.splice(this.readers.indexOf(name), 1)
            this.readers = [...this.readers]
        }
    }
};
