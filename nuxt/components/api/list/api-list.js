export default {
    data() {
        let rows = [
            {
                method: "GET",
                path: "http://some-domain/some-path/?some-search#some-hash"
            },
            {
                method: "POST",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            },
            {
                method: "GET",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            },
            {
                method: "POST",
                path: "/abc"
            },
            {
                method: "POST",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            },
            {
                method: "GET",
                path: "/abc"
            },
            {
                method: "PUT",
                path: "/abc"
            },
            {
                method: "DELETE",
                path: "/abc"
            },
            {
                method: "GET",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            },
            {
                method: "PUT",
                path: "/create a new object"
            },
            {
                method: "GET",
                path: "/abc"
            },
            {
                method: "POST",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            },
            {
                method: "GET",
                path: "/https://vuetifyjs.com/zh-Hans/components/data-tables"
            }
        ];

        rows.map(i => {
            if (i.method == "GET") i.className = "blue--text";
            if (i.method == "POST") i.className = "green--text";
            if (i.method == "DELETE") i.className = "red--text";
            if (i.method == "PUT") i.className = "orange--text";
        });
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
            rows: rows
        };
    }
};
