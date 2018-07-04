<script src="./api.js"></script>
<i18n>
{
    "zh": {
        "New API": "新增API",
        "Edit API": "编辑API",

        "Path": "路径",
        "Module": "模块",
        "Method": "方法",
        "Prefix": "前缀",
        "Submit": "保存",
        "Remove": "删除",
        "Regain": "恢复",
        "field name": "字段名",
        "field type": "字段类型",
        "field required": "必填",
        "field placeholder": "参数举例",
        "field example": "返回举例",
        "Deprecated": "标记废弃",
        "Parameters": "请求参数",
        "Request Type": "请求类型",
        "Request URL": "请求地址"
    }
}
</i18n>
<template>
    <v-card>

        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$t('New API')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="close">Close</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <h3>{{$t('Request URL')}}</h3>
                </v-flex>
                <v-flex xs2>
                    <v-select
                    v-model="model.module"
                    :items="modules"
                    :label="$t('Module')"
                    item-text="name"
                    item-value="id"
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                    <v-select
                    v-model="model.select"
                    :label="$t('Method')"
                    :items="['GET', 'POST', 'PUT', 'DELETE']"
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                    <v-text-field 
                        :label="$t('Prefix')"
                        disabled 
                        :value="prefix"></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        v-model="model.path"
                        :label="$t('Path')"
                        required
                    ></v-text-field>
                </v-flex>

                <v-divider></v-divider>

                <v-flex xs12>
                    <h3>{{$t('Request Type')}}</h3>

                    <v-flex xs6>
                        <v-select
                        v-model="model.request.contentType"
                        label="Content-Type"
                        :items="['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']"
                        ></v-select>
                    </v-flex>
                </v-flex>
                <v-flex xs12>
                    <h3>{{$t('Parameters')}}</h3>
                    
                    <template v-for="(field, name) in model.request.fields">
                        <v-layout v-bind:key="name" style="height: auto;">
                            <v-flex xs3>
                                <v-text-field :label="$t('field name')" :value="name"></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-select
                                v-model="field.type"
                                :label="$t('field type')"
                                :items="['String', 'Number', 'Array', 'Object']"
                                ></v-select>
                            </v-flex>
                            <v-flex xs2>
                                <v-checkbox
                                v-model="field.required"
                                :label="$t('field required')"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex xs4>
                            <v-text-field :label="$t('field placeholder')" :value="field.placeholder"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </template>
                </v-flex>

                <v-divider></v-divider>

                <v-flex xs12>
                    <h2>Response Data</h2>
                    <v-select
                    v-model="model.response.contentType"
                    :items="['application/json', 'plaintext']"
                    ></v-select>
                    
                    <template v-for="(field, name) in model.response.fields">
                        <v-layout v-bind:key="name" style="height: auto;">
                            <v-flex xs3>
                                <v-text-field :label="$t('field name')" :value="name"></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-select
                                v-model="field.type"
                                :label="$t('field type')"
                                :items="['String', 'Number', 'Array', 'Object']"
                                ></v-select>
                            </v-flex>
                            <v-flex xs4>
                            <v-text-field :label="$t('field example')" :value="field.placeholder"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </template>
                </v-flex>

                <v-divider></v-divider>

                <v-flex xs12>
                    <v-checkbox
                    v-model="model.deprecated"
                    :label="$t('Deprecated')"
                    ></v-checkbox>
                </v-flex>

                <v-flex xs12>
                    <v-btn @click="submit" color="success" class="mr-5">{{$t('Submit')}}</v-btn>
                    <v-btn v-if="!model.removed" @click="remove" color="error">{{$t('Remove')}}</v-btn>
                    <v-btn v-if="model.removed" @click="regain" color="info">{{$t('Regain')}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>