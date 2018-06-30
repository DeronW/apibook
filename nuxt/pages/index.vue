<script src="./index/index.js"></script>
<i18n>
{
    "zh": {
        "Welcome to API Book": "欢迎使用API Book",
        "Groups": "群组列表",
        "Projects": "项目列表"
    }
}
</i18n>
<template>
    <v-layout row wrap justify-center>
        <v-flex xs5>
            <h1 style="font-size: 38px; color: #e0e0e0;">{{$t('Groups')}}</h1>
            <v-list three-line>
                <template v-for="(item, index) in groups">
                    <v-divider :key="item.id" v-if="index != 0"></v-divider>
                    <v-list-tile :key="item.id"  @click="linkGroup(item.id)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{item.describe.substr(0, 50)}}
                                {{item.describe.length > 50 ? '...' : ''}}    
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                {{item.members.length}} {{$t('Members')}}, 
                                {{item.projects.length}} {{$t('Projects')}}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{$dayjs().from($dayjs(item.updated_at*1000))}}</v-list-tile-action-text>
                            {{item.scope == 'public' ? $t('Public') : $t('Private')}}
                            <v-icon v-if="item.star" color="orange" > star </v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>
        </v-flex>
        <v-flex xs5 offset-xs1>
            <h1 style="font-size: 38px; color: #e0e0e0;">{{$t('Projects')}}</h1>
            <v-list three-line>
                    <template v-for="(item, index) in projects">
                        <v-divider :key="item.id + index " v-if="index != 0"></v-divider>
                        <v-list-tile :key="item.id"  @click="linkProject(item.id)">
                            <v-list-tile-content>
                                <v-list-tile-title v-if="item.status == 'deprecated'">
                                    {{item.name}} <b class="red--text">(DEPRECATED)</b>
                                </v-list-tile-title>
                                <v-list-tile-title v-else>
                                    {{item.name}}
                                </v-list-tile-title>

                                <v-list-tile-sub-title>
                                    {{item.describe.substr(0, 50)}}
                                    {{item.describe.length > 50 ? '...' : ''}}    
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>{{$dayjs().from($dayjs(item.updated_at*1000))}}</v-list-tile-action-text>
                                {{item.scope == 'public' ? $t('Public') : $t('Private')}}
                                <v-icon v-if="item.star" color="orange" > star </v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list>
        </v-flex>
    </v-layout>
</template>
