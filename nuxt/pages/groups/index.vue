<i18n>
{
    "zh": {
        "Like it": "收藏成功",
        "Unlike it": "取消收藏",
        "Group": "组织"
    }
}
</i18n>

<template>
  <v-layout row>
    <v-flex sm10 offset-sm1>
      <v-card>
        <v-list>
          <v-list-tile v-for="item in groups" :key="item.title" avatar @click="empty">
            <v-list-tile-action @click="toggleStar(item.id)">
                <v-icon :color="item.star ? 'orange' : 'gray'">{{ item.star ? 'star' : 'star_border'}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content @click="link(`/projects/${item.id}`)">
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                <v-list-tile-sub-title>{{ item.describe }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    head(){
        return {
            title: this.$t('Group')
        }
    },
    data() {
        return {
            groups: []
        };
    },
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
        this.$axios.$get("/group/list.json").then(data => {
            this.groups = data; //.map(i => ({ name: i.name, id: i.id }));
        });
        // this.$axios.$get("/project/list.json").then(data => {
        //     this.projects = data.map(i => ({ name: i.name, id: i.id }));
        // });
    }
};
</script>