<script src="./header.js"></script>
<i18n>
{
    "zh": {
        "New Group": "创建群组",
        "New Project": "创建项目",
        "Logout": "退出",
        "Login": "登录",
        "Register": "注册"
    }
}
</i18n>
<template>
    <v-toolbar app absolute clipped-left>
        <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5" @click="goHome" style="cursor: pointer">API Books</span>
        <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field>
        <v-spacer></v-spacer>

        <v-menu open-on-hover bottom v-if="user.isLogin">
            <v-toolbar-title slot="activator">
                <v-btn icon class="mr-4">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-list>
                <v-list-tile>
                    <v-btn flat small nuxt to="/groups/new" color="primary"> {{ $t('New Group')}} </v-btn>
                </v-list-tile>
                <!-- <v-list-tile>
                    <nuxt-link to="/groups/new">{{ $t('New Group')}}</nuxt-link>
                </v-list-tile> -->
                <v-list-tile>
                    <v-btn flat small nuxt to="/projects/new" color="primary">{{ $t('New Project')}}</v-btn>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-toolbar-items>
            <v-btn nuxt v-if="!user.isLogin" to="/login">{{$t('Login')}} </v-btn>
            <v-btn nuxt v-if="!user.isLogin" to="/register">{{$t('Register')}} </v-btn>
            <v-btn nuxt v-if="user.isLogin" :to="'/users/' + user.id">{{user.name}}</v-btn>
            <v-btn v-if="user.isLogin" v-on:click="logout">{{$t('Logout')}}</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>