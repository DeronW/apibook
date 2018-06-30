<script src="./drawer.js"></script>
<i18n>
{
    "zh": {
        "Settings": "设置",
        "Favorite Projects": "收藏项目",
        "Favorite Groups": "收藏群组",
        "Help": "帮助",
        "Global Settings": "全局设置",
        "User Settings": "个人设置",
        "All Groups": "查看全部群组",
        "All Projects": "查看全部项目"
    }
}
</i18n>

<template>
  <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
    <v-list dense class="grey lighten-4">
        <ListTitle icon="star_border" :text="$t('Favorite Projects')" />

        <v-list-tile v-for="(i, index) in projects" :key="'group'+i.id" class="pl-5"
            @click="link(`/projects/${i.id}`)">
            {{i.name}}
        </v-list-tile>
        <v-list-tile class="pl-5 blue-grey--text" @click="link(`/projects`)">
            {{$t('All Projects')}}
        </v-list-tile>

        <v-divider dark class="my-3"></v-divider>

        <ListTitle icon="star_border" :text="$t('Favorite Groups')" />
        <v-list-tile v-for="(i,index) in groups" :key="'project'+i.id"  class="pl-5"
            @click="link(`/groups/${i.id}`)">
            {{i.name}}
        </v-list-tile>
        <v-list-tile class="pl-5 blue-grey--text" @click="link(`/groups`)">
            {{$t('All Groups')}}
        </v-list-tile>

        <v-divider dark class="my-3"></v-divider>
        <ListTitle icon="settings" :text="$t('Settings')" />
        <v-list-tile class="pl-5"
            @click="link('/config')">
            {{$t('Global Settings')}}
        </v-list-tile>
        <v-list-tile class="pl-5"
            @click="link('/users')">
            {{$t('Users Management')}}
        </v-list-tile>
        <v-list-tile class="pl-5"
            @click="link('/users/' + $store.state.user.id)">
            {{$t('User Settings')}}
        </v-list-tile>

        <ListTitle icon="help" :text="$t('Help')" />
        <v-list-tile class="pl-5" nuxt to="https://github.com/DeronW/apibook">
            FAQ
        </v-list-tile>
        <v-list-tile class="pl-5" nuxt to="https://github.com/DeronW/apibook">
            {{$t('Documents')}}
        </v-list-tile>
        <v-list-tile class="pl-5" nuxt to="https://github.com/DeronW/apibook">
            {{$t('Donate')}}
        </v-list-tile>


    </v-list>
  </v-navigation-drawer>
</template>