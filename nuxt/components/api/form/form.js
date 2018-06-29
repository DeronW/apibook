export default {
    data() {
        return {
            model: {
                path: "",
                select: "GET",
                id: "",
                request: {
                    contentType: "application/json",
                    fields: {
                        name: {
                            type: "String",
                            label: "this is A field",
                            required: true,
                            placeholder: "zhang san"
                        },
                        age: {
                            type: "Number",
                            label: "how old are you"
                        },
                        gender: {
                            type: "String",
                            choices: ["male", "female"]
                        }
                    }
                },
                response: {
                    contentType: "plaintext",
                    fields: {
                        name: {
                            type: "String",
                            label: "real name",
                            optional: false
                        },
                        age: {
                            type: "Number",
                            label: "how old are you"
                        },
                        gender: {
                            type: "String",
                            choices: ["male", "female"]
                        }
                    }
                },
                deprecated: false,
                removed: true
            }
        };
    },

    computed: {},

    methods: {
        submit() {
            this.$axios.$post('/api/create.json')
        },
        remove() {
            this.model.removed = true;
        },
        regain() {
            this.model.removed = false;
        }
    }
};
