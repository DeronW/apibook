<script src="./drawer.js"></script>
<i18n>
{
    "zh": {
        "Settings": "设置",
        "Favorites Projects": "收藏项目",
        "Favorites Groups": "收藏组"
    }
}
</i18n>

<template>
  <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
    <v-list dense class="grey lighten-4">
        <ListTitle icon="star_border" :text="$t('Favorites Projects')" />

        <v-list-tile v-for="i in projects" v-bind:key="i.id" 
            @click="link(`/projects/${i.id}`)">
            {{i.name}}
        </v-list-tile>

        <v-divider dark class="my-3"></v-divider>

        <ListTitle icon="star_border" :text="$t('Favorites Groups')" />
        <v-list-tile v-for="i in groups" v-bind:key="i.id"
            @click="link(`/groups/${i.id}`)">
            {{i.name}}
        </v-list-tile>

        <v-divider dark class="my-3"></v-divider>
        <ListTitle icon="settings" :text="$t('Settings')" />
        <ListTitle icon="help" :text="$t('Help')" />

    </v-list>
  </v-navigation-drawer>
</template>