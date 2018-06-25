export default {

    data() {
        return {
            items: [{
                id: 1,
                name: 'name',
                method: 'GET',
                path: '/some-path/?some-query#some-hash',
                describe: 'describe'
            },{
                id: 1,
                name: 'name',
                method: 'GET',
                path: '/some-path/?some-query#some-hash',
                describe: 'describe'
            },{
                id: 1,
                name: 'name',
                method: 'POST',
                path: 'http://some-domain.com/some-path/?some-query#some-hash',
                describe: 'describe'
            },{
                id: 1,
                name: 'name',
                method: 'GET',
                describe: 'describe'
            },{
                id: 1,
                name: 'name',
                method: 'POST',
                path: '/some-path/?some-query#some-hash',
                describe: 'describe'
            },{
                id: 2,
                method: 'POST',
                name: 'name'
            }]
        };
    },
    mounted() {
        // this.items = [];
    }
}