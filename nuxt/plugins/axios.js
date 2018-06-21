export default function({ app, $axios, redirect }) {
    $axios.onRequest(config => {
        console.log("Making request to " + config.url);
    });

    $axios.interceptors.request.use(function(config) {
        config.maxRedirects = 0;
        return config;
    });

    $axios.interceptors.response.use(function(response) {
        if (response.headers["content-type"] == "application/json") {
            if (response.data && response.data.code == 401) {
                app.store.dispatch("notify", {
                    type: "error",
                    text: "Login required"
                });
            }
        }
        return response;
    });

    $axios.onError(error => {
        console.error(error);
    });
}
