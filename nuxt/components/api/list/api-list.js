export default {
    data() {
        return {
            search: "",
            headers: [
                {
                    text: "",
                    align: "left",
                    value: "method"
                },
                {
                    text: "Module",
                    value: "module"
                },
                {
                    text: "Path",
                    align: "left",
                    value: "path"
                },{
                    text: "Describe",
                    sortable: false,
                    value: "describe"
                }
            ]
        };
    },
    computed: {
        rows() {
            return [{
                id: 1,
                method: 'GET',
                module: 'user',
                path: '/users',
                describe: 'list all users'
            },{
                id: 2,
                method: 'GET',
                module: 'project',
                path: '/users',
                describe: 'list all users'
            },{
                id: 3,
                method: 'GET',
                module: 'user',
                path: '/users',
                describe: 'list all users'
            }];
        }
    },
    mounted() {}
};
