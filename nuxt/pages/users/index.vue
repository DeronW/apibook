<i18n>
{
    "zh": {
        "User List": "用户列表",
        "Is Admin": "是否具有管理员权限"
    }
}
</i18n>
<template>
    <v-laytou>
        <v-card>
            <v-card-title>
                {{$t('User List')}}
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="users" :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.username }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>
                        <span class="green--text" v-if="props.item.admin">Yes</span>
                        <span class="gray--text" v-if="!props.item.admin">No</span>
                    </td>
                    <td>
                        <v-btn color="info" @click="edit(props.item.id)">{{$t('Edit')}}</v-btn>
                        <v-btn color="warning" @click="block">{{$t('Block')}}</v-btn>
                        <v-btn color="error">{{$t('Remove')}}</v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>
    </v-laytou>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            headers: [
                { text: this.$t("Username"), value: "username" },
                { text: this.$t("Email"), value: "email" },
                { text: this.$t("Is Admin"), sortable: false, value: "admin" },
                {text: this.$t('Options'), sortable: false}
            ],
            users: []
        };
    },
    mounted() {
        this.$axios.$get("/user/list.json").then(data => {
            this.users = data;
        });
    },
    methods: {
        edit: function(id){
            this.$router.push('/users/' + id)
        },
        block: function(){
            console.log('block')
        },
        remove: function(){}
    }
};
</script>