export default {
    data() {
        return {
            model: {
                path: "",
                select: "GET",
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
                    contentType: "application/json",
                    fields: {
                        name: {
                            type: "String",
                            label: "real name",
                            optional: false
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
            console.log(1111);
        },
        remove() {
            this.model.removed = true;
        },
        regain() {
            this.model.removed = false;
        }
    }
};
