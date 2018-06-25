<template>
        <v-layout row align-center>
          <v-flex xs6>
            <v-subheader>            
              <v-list-tile-action>
                <v-icon>{{icon}}</v-icon>
              </v-list-tile-action>
              {{text}}
            </v-subheader>
          </v-flex>
        </v-layout>
</template>

<script>
export default {
    props: ["icon", "text"]
};
</script>