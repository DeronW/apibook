export default function({ app, $axios, redirect }) {
    $axios.onRequest(config => {
        console.log("Making request to " + config.url);
    });

    $axios.interceptors.request.use(function(config) {
        config.maxRedirects = 0;
        return config;
    });

    $axios.interceptors.response.use(function(response) {
        let { data, headers } = response;
        if (headers["content-type"] == "application/json" && data) {
            if (data.success === false) {
                app.store.dispatch("notify", Object.assign({
                    type: 'info',
                    text: 'waiiiit, something wrong'
                }, data.message));
                return Promise.reject(data)
            }
        }
        return response.data;
    });

    $axios.onError(error => {
    });
}
