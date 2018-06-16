<script src="./header.js"></script>
<template>
    <v-toolbar app absolute clipped-left>
        <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">API Books</span>
        <v-text-field solo-inverted flat label="Search" prepend-icon="search" ></v-text-field>
        <v-spacer></v-spacer>


        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
        <v-btn icon>
          <v-icon>add</v-icon>
        </v-btn>
          </v-toolbar-title>
          <v-list>
            <v-list-tile @click=""> Group </v-list-tile>
            <v-list-tile @click=""> Project </v-list-tile>
          </v-list>
        </v-menu>

        <v-toolbar-items>
          <v-btn flat>User</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>