<script src="./config.js"></script>
<i18n>
{
    "zh": {
        "Submit": "保存",
        "Base URL": "路径前缀",
        "Allow Register": "允许新用户注册",
        "Need Login": "需要登录"
    }
}
</i18n>
<template>
    <v-layout justify-center align-center>
        <v-flex xs6 offset-xs1>
            <v-text-field v-model="model.base_url" :label="$t('Base URL')" required></v-text-field>

            <v-checkbox :label="$t('Allow Register')" v-model="model.allow_register"></v-checkbox>

            <v-checkbox :label="$t('Need Login')" v-model="model.need_login"></v-checkbox>

            <v-btn @click="submit">{{$t('Submit')}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>