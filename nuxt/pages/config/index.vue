<script src="./config.js"></script>
<i18n>
{
    "zh": {
        "Submit": "保存",
        "Mount URL": "绑定路径前缀",
        "Allow Register": "允许新用户注册",
        "freelance": "任何人都具有管理员权限, 且不需要登录",
        "Freelance": "免登录"
    },
    "en": {
        "freelance": "If not check, everyone has Admin permission and no need login"
    }
}
</i18n>
<template>
    <v-layout justify-center align-center>
        <v-flex xs6 offset-xs1>
            <v-text-field v-model="model.mount_url" :label="$t('Mount URL')"></v-text-field>
            <v-checkbox :label="$t('Allow Register')" v-model="model.allow_register"></v-checkbox>
            <label>{{$t('freelance')}}</label>
            <v-checkbox :label="$t('Freelance')" v-model="model.freelance"></v-checkbox>

            <v-btn @click="submit">{{$t('Submit')}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>