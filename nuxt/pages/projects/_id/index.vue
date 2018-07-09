<script src="./index.js"></script>
<i18n>
{
    "zh": {
        "Project": "项目",
        "check": "查看",
        "Edit Module": "编辑模块",
        "New Module": "新增模块",
        "New API": "新增 API",
        "edit": "编辑",
        "No API in this module": "该模块下没有API"
    }
}
</i18n>
<template>
    <v-layout row wrap>
        <v-dialog 
            v-model="dialogModule.show"
            overlay
            width="500"
        >
            <v-card>
                <v-card-title>{{dialogModule.id ? $t('New Module') : $t()}}</v-card-title>
                <ProjectModule 
                    :projectId="projectId"
                    :moduleId="dialogModule.id"
                    :close="hideModule" />
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogApi.show"
            overlay
            fullscreen >
            <ProjectAPI 
                :projectId="projectId"
                :moduleId="dialogApi.moduleId"
                :ApiId="dialogApi.id"
                :close="hideAPI" 
            />
        </v-dialog>

        <v-flex xs12>
            <v-btn color="success" outline @click="editModule()">
                <v-icon>add</v-icon>
                {{$t('New Module')}}
            </v-btn>
            <v-btn color="success" outline @click="editAPI()">
                <v-icon>add</v-icon>
                {{$t('New API')}}
            </v-btn>
        </v-flex>
        <template v-if="modules.length" v-for="item in modules">
            <v-flex xs12 :key="item.id">
                <v-card>
                    <v-card-title>
                        <b>{{item.name}}</b>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="editModule(item.id)">
                            <v-icon>edit</v-icon>
                            {{$t('Edit Module')}}
                        </v-btn>
                        <v-btn flat @click="createAPI(item.id)">
                            <v-icon>add</v-icon>
                            {{$t('New API')}}
                        </v-btn>
                    </v-card-title>
                    <v-data-table
                        :items="item.apis"
                        hide-actions
                        hide-headers
                    >
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.method }}</td>
                            <td>{{ props.item.path }}</td>
                            <td>{{ props.item.describe }}</td>
                            <td>{{ props.item.updated_at }}</td>
                            <td class="text-xs-right">
                                <v-btn small flat color="info" @click="check(props.item.id)">{{$t('check')}}</v-btn>
                            </td>
                        </template>
                        <template slot="no-data">
                            {{$t('No API in this module')}}
                        </template>
                    </v-data-table>
                </v-card>
                <br />
            </v-flex>
        </template>

        <v-flex xs12>
            <v-data-table
                v-if="apis.length"
                :items="apis"
                hide-actions
                hide-headers
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.method }}</td>
                    <td>{{ props.item.path }}</td>
                    <td>{{ props.item.describe }}</td>
                    <td>{{ props.item.updated_at }}</td>
                    <td class="text-xs-right">
                        <v-btn small flat color="info" @click="check(props.item.id)">{{$t('check')}}</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>