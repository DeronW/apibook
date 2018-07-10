<i18n>
{
    "zh": {
        "Like it": "收藏成功",
        "Unlike it": "取消收藏",
        "All Groups": "全部群组",
        "Collected": "已收藏",
        "created at": "创建于"
    }
}
</i18n>

<template>
    <v-layout row wrap>
        <v-flex sm10 offset-sm1>
            <h2>{{$t('All Groups')}}</h2>
            <br />
        </v-flex>
        <v-flex sm10 offset-sm1>
            <v-card>
                <v-list three-line>
                    <template v-for="(item, index) in groups">
                        <v-divider :key="index" v-if="index"></v-divider>
                        <v-list-tile  :key="item.id" avatar @click="empty">
                            <v-list-tile-action @click="toggleStar(item.id)">
                                <v-icon :color="item.star ? 'orange' : 'gray'">{{ item.star ? 'star' : 'star_border'}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content @click="link(`/groups/${item.id}`)">
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.describe }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>{{$t('created at')}} {{$dayjs().from($dayjs(item.created_at*1000))}}</v-list-tile-action-text>
                                <GroupScopeText :scope="item.scope"/>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { GroupScopeText } from "~/components";
export default {
    head() {
        return {
            title: this.$t("Group")
        };
    },
    data() {
        return { groups: [] };
    },
    components: { GroupScopeText },
    methods: {
        empty: function() {},
        link: function(path) {
            this.$router.push(path);
        },
        toggleStar: function(projectId) {
            let groups = this.groups,
                cancel = false;

            this.groups = groups.map(i => {
                if (i.id == projectId) {
                    if (i.star) cancel = true;
                    i.star = !i.star;
                }
                return i;
            });

            this.$axios
                .$post("/group/favorite.json", {
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
        this.$axios.$get("/group/all.json").then(data => {
            this.groups = data;
        });
    }
};
</script>