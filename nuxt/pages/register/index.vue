<script src="./register.js"></script>
<i18n>
{
}
</i18n>
<template>
    <v-layout justify-center align-center>
        <v-flex xs6 offset-xs1>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" type="email" :label="$t('Email')" :rules="fieldRules" required></v-text-field>
                <v-text-field v-model="password" :label="$t('Password')" :rules="fieldRules" required></v-text-field>
                <v-text-field v-model="password2" :label="$t('PasswordRepeat')" :rules="fieldRules" required></v-text-field>

                <v-btn :disabled="!valid" @click="submit">{{$t('Register')}}
                </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>