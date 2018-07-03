<i18n>
{
    "zh": {
        "Project List": "项目列表"
    }
}
</i18n>
<template>
  <v-layout row>
    <v-flex sm10 offset-sm1>
      <v-card>
        <v-list>
          <v-list-tile v-for="item in projects" :key="item.title" avatar @click="empty">
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