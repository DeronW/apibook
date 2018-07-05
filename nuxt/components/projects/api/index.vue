<script src="./api.js"></script>
<i18n>
{
    "zh": {
        "New API": "新增API",
        "Edit API": "编辑API",

        "Regain": "恢复",
        "Describe": "描述",
        "field name": "字段名",
        "field type": "字段类型",
        "field required": "必填",
        "field describe": "备注",
        "field placeholder": "参数举例",
        "field example": "返回举例",
        "Parameters": "请求参数",
        "Request Type": "请求类型",
        "Request URL": "请求地址",
        "Request Parameters": "请求参数",
        "Response Data": "数据返回"
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
                    <v-alert :value="!!alert.text" :type="alert.type" outline>{{alert.text}}</v-alert>
                </v-flex>
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
                    :disabled="!!moduleId"
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                    <v-select
                    v-model="model.method"
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

                <v-flex xs12>
                    <br />
                    <h3>{{$t('Describe')}}</h3>
                    <v-flex xs6>
                        <v-textarea box auto-grow
                            :label="$t('Describe')"
                            :value="model.describe"
                        ></v-textarea>
                    </v-flex>
                </v-flex>

                <v-flex xs12>
                    <br />
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
                    <br />
                    <h3>{{$t('Request Parameters')}}</h3>
                    
                    <template v-for="(field, index) in model.request.fields">
                        <v-layout v-bind:key="index" style="height: auto;">
                            <v-flex xs2>
                                <v-text-field :label="$t('field name')" :value="field.name"></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-select
                                v-model="field.type"
                                :label="$t('field type')"
                                :items="['String', 'Boolean', 'Number', 'Array', 'Object']"
                                ></v-select>
                            </v-flex>
                            <v-flex xs1>
                                <v-select
                                v-model="field.required"
                                :label="$t('field required')"
                                :items="OPTIONS.required"
                                ></v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field :label="$t('field describe')" :value="field.placeholder"></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-text-field :label="$t('field placeholder')" :value="field.placeholder"></v-text-field>
                            </v-flex>
                            <v-flex xs1>
                                <v-btn small icon flat color="red">
                                    <v-icon>remove_circle</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </template>
                    <v-btn @click="addResuestField">
                        <v-icon>add</v-icon>
                        {{$t('Add')}}
                    </v-btn>
                </v-flex>

                <v-divider></v-divider>

                <v-flex xs12>
                    <br />
                    <h3>{{$t('Response Data')}}</h3>
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
                    <v-btn>
                        <v-icon>add</v-icon>
                        {{$t('Add')}}
                    </v-btn>
                </v-flex>

                <v-flex xs12>
                    <br />
                </v-flex>

                <v-flex xs12>
                    <v-btn @click="submit" color="success" class="mr-5">{{$t('Submit')}}</v-btn>
                    <v-btn @click="submit" color="warning" class="mr-5">{{$t('Deprecated')}}</v-btn>
                    <v-btn v-if="!model.removed" @click="remove" color="error">{{$t('Remove')}}</v-btn>
                    <v-btn v-if="model.removed" @click="regain" color="info">{{$t('Regain')}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>