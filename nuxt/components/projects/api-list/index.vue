<script src="./api-list.js"></script>
<i18n>
{
    "zh": {
        "Add API": "添加新API"
    }
}
</i18n>

<template>
    <block>
        <v-toolbar dense>
            <v-text-field solo-inverted flat label="filter" prepend-icon="search"></v-text-field>
        </v-toolbar>

        <v-list>
            <v-list-tile @click="" color="success">
                <v-list-tile-content>
                    <v-list-tile-title>{{$t('Add API')}}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon color="success">add</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="(i, index) in items" v-bind:key="i + index" >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span class="blue--text" style="display: inline-block; width: 50px;">{{i.method}}</span>
                        {{i.path}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>{{i.path}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </block>
</template>