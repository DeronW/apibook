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
                    text: "Path",
                    align: "left",
                    value: "path"
                }
            ],
            rows: [
                {
                    method: "GET",
                    path: "http://some-domain/some-path/?some-search#some-hash"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
                {
                    method: "GET",
                    path: "/abc"
                },
            ]
        };
    }
};
