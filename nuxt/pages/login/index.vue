<script src="./login.js"></script>
<i18n>
{
    "zh": {
        "Name": "用户名",
        "Password": "密码",
        "Submit": "登录"
    }
}
</i18n>
<template>
    <v-layout justify-center align-center>
        <v-flex xs6 offset-xs1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :label="$t('Name')" :rules="fieldRules" required></v-text-field>
            <v-text-field v-model="password" :label="$t('Password')"  
            :append-icon="showPwd ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (showPwd = !showPwd)"
            :type="showPwd ? 'text' : 'password'"
            :rules="fieldRules" required></v-text-field>

            <v-btn :disabled="!valid" @click="submit">{{$t('Submit')}}
            </v-btn>
        </v-form></v-flex>
    </v-layout>
</template>