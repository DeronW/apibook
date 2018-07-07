<i18n>
{
    "zh": {
        "Project List": "项目列表"
    }
}
</i18n>
<template>
    <v-layout row wrap>
        <v-flex xs10 offset-xs1>
            <h2>{{$t('Project List')}}</h2>
        </v-flex>
        <v-flex xs10 offset-xs1>
            <v-card>
                <v-list three-line>
                    <template v-for="(item, index) in projects">
                        <v-divider :key="index" v-if="index"></v-divider>
                        <v-list-tile :key="item.title" avatar @click="empty">
                            <v-list-tile-action @click="toggleStar(item.id)">
                                <v-icon :color="item.star ? 'orange' : 'gray'">{{ item.star ? 'star' : 'star_border'}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content @click="link(`/projects/${item.id}`)">
                                <v-list-tile-title>
                                    {{item.name}}
                                    <b class="red--text" v-if="item.status=='deprecated'">Deprecated</b>
                                </v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.describe }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>{{$t('created at')}} {{$dayjs().from($dayjs(item.created_at*1000))}}</v-list-tile-action-text>
                                {{item.scope}}
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    head() {
        return {
            title: this.$t("Project List")
        };
    },
    data() {
        return {
            projects: []
        };
    },
    methods: {
        empty: function() {},
        link: function(path) {
            this.$router.push(path);
        },
        toggleStar: function(projectId) {
            let projects = this.projects,
                cancel = false;

            this.projects = projects.map(i => {
                if (i.id == projectId) {
                    if (i.star) cancel = true;
                    i.star = !i.star;
                }
                return i;
            });

            this.$axios
                .$post("/project/favorite.json", {
                    id: projectId,
                    action: cancel ? "cancel" : "collect"
                })
                .then(() => {
                    this.$store.dispatch("notify", {
                        type: "success",
                        text: this.$t(cancel ? "Unlike it" : "Like it")
                    });
                });
        }
    },
    mounted() {
        this.$axios.$get("/project/list.json").then(data => {
            this.projects = data;
        });
    }
};
</script>