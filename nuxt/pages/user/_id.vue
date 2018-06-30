<script src="./user.js"></script>
<i18n>
{
    "zh": {
        "Old Password": "旧密码",
        "New Password": "新密码"
    }
}
</i18n>
<template>
    <v-layout>
        <v-flex xs5>

            <v-text-field
                v-model="model.username"
                :label="$t('Username')"
                type="text"
            ></v-text-field>
            
            <v-text-field
                v-model="model.email"
                :label="$t('Email')"
                disabled
            ></v-text-field>

            <v-text-field
                v-model="model.new_password"
                :label="$t('New Password')"
                type='password'
            ></v-text-field>

            <v-btn @click="submit">{{$t('Submit')}}</v-btn>
        </v-flex>
    </v-layout>
</template>