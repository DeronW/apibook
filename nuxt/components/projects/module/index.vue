<script src="./module.js"></script>
<i18n>
{
    "zh": {
        "Name": "标题",
        "Describe": "描述",
        "Prefix": "前缀"
    }
}
</i18n>
<template>
    <v-layout row wrap>
        <v-flex xs10 offset-xs1>
            <v-text-field v-model="name" :label="$t('Name')" ></v-text-field>
            <v-text-field v-model="prefix" :label="$t('Prefix')" ></v-text-field>

            <v-checkbox
                v-model="deprecated"
                :label="$t('Deprecated')"
            ></v-checkbox>
        </v-flex>
        <v-flex xs10 offset-xs1>
            <v-btn @click="submit">{{$t('Submit')}}</v-btn>
            <v-btn class="float-right" @click="closeDialog">{{$t('Cancel')}}</v-btn>
            <br />
            <br />
        </v-flex>
    </v-layout>
</template>
