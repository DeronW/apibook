<script src="./header.js"></script>
<i18n>
{
    "zh": {
        "Login": "登录",
        "New Group": "创建组",
        "New Project": "创建项目"
    }
}
</i18n>
<template>
    <v-toolbar app absolute clipped-left>
        <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">API Books</span>
        <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field>
        <v-spacer></v-spacer>

        <v-menu :nudge-width="100" v-if="isLogin">
            <v-toolbar-title slot="activator">
                <v-btn icon>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-list>
                <v-list-tile>
                    <nuxt-link to="/groups/new">{{ $t('New Group')}}</nuxt-link>
                </v-list-tile>
                <v-list-tile>
                    <nuxt-link to="/projects/new">{{ $t('New Project')}}</nuxt-link>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-toolbar-items>
            <v-btn nuxt v-if="!isLogin" to="/login">{{$t('Login')}} </v-btn>
            <v-btn nuxt v-if="isLogin" :to="'/user/' + user.id">{{user.name}}</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>