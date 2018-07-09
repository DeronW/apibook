export default {
    asyncData({ query }) {
        return {
            projectId: query.project_id,
            apiId: query.api_id
        };
    },
    head() {
        return {
            title: "API"
        };
    },
    data() {
        return {
            project: {
                name: "项目名称",
                describe: "这是一段项目描述"
            },
            members: [
                {
                    id: 1,
                    username: "User"
                },
                {
                    id: 2,
                    username: "User 2"
                }
            ],
            modules: [
                {
                    id: 1,
                    prefix: "/users",
                    name: "用户",
                    apis: [
                        {
                            id: 1,
                            path: "/info.json",
                            describe: "hahahah",
                            method: "GET"
                        },
                        {
                            id: 2,
                            path: "/list.json",
                            describe: "hahahah",
                            method: "GET"
                        }
                    ]
                },
                {
                    id: 2,
                    prefix: "/products",
                    name: "产品",
                    apis: [
                        {
                            id: 1,
                            path: "/info.json",
                            describe: "hahahah",
                            method: "GET"
                        }
                    ]
                }
            ],
            apis: [
                {
                    id: 1,
                    path: "/info.json",
                    describe: "hahahah",
                    method: "POST"
                },
                {
                    id: 2,
                    path: "/create.json",
                    describe: "hahahah",
                    method: "POST"
                }
            ]
        };
    },
    mounted() {
        // this.refreshProjectInfo();
    },
    method: {
        refreshProjectInfo: function() {
            this.$axios
                .$get("/project/info?id=" + this.projectId)
                .then(data => {
                    this.project = data;
                });
        }
    }
};
