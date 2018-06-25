<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <v-list-tile v-for="item in groups" :key="item.title" avatar 
            @click="link(`/projects/${item.id}`)">
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
                <v-list-tile-sub-title>{{ item.describe }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
            groups: []
        };
    },
    methods: {
        link: function(path) {
            this.$router.push(path);
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