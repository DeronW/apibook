<script src="./settings.js"></script>
<i18n>
{
    "zh": {
        "Submit": "保存",
        "Base URL": "路径前缀"
    }
}
</i18n>
<template>
    <v-layout justify-center align-center>
        <v-flex xs6 offset-xs1>
        <v-form ref="form">
            <v-text-field v-model="baseUrl" :label="$t('Base URL')" required></v-text-field>

            <v-btn @click="submit">{{$t('Submit')}}
            </v-btn>
        </v-form></v-flex>
    </v-layout>
</template>