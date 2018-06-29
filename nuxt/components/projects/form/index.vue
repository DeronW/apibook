<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "Project Status": "项目状态",
        "Submit": "保存",
        "input name": "输入用户名, 然后回车",
        "Group Selector": "选择组",
        "Project List": "项目列表"
    },
    "en": {
        "input name": "Input username and press Enter"
    }
}
</i18n>

<template>

  <v-container grid-list-xl text-xs-center>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1>
          <v-text-field v-model="model.name" :label="$t('project.name')" required>
          </v-text-field>
          <v-text-field v-model="model.describe" :label="$t('project.describe')" multi-line></v-text-field>

            <v-select
              :items="group_list"
              v-model="model.group_id"
              :label="$t('Group Selector')"
              single-line
            ></v-select>

        </v-flex>
        <v-flex xs5 offset-xs1>

          <h3 class="text-sm-left">{{$t('Project Status')}}</h3>

          <v-radio-group v-model="model.status" row>
            <v-radio :label="$t('Maintaining')" value="maintaining"></v-radio>
            <v-radio :label="$t('Deprecated')" value="deprecated"></v-radio>
            <v-radio :label="$t('Disabled')" value="disabled"></v-radio>
          </v-radio-group>

          <v-radio-group v-model="model.scope">
            <v-radio :label="$t('Public')" value="public"></v-radio>
            <p class="text-sm-left">{{$t('public label')}}</p>
            <v-radio :label="$t('Private')" value="private"></v-radio>
            <p class="text-sm-left">{{$t('private label')}}</p>
          </v-radio-group>

        </v-flex>
        <v-flex xs4>
          <v-btn v-if="!disabled" :disabled="!valid" @click="submit" class="success">{{$t('Submit')}} </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <br />
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>{{$t('Developer')}}</v-card-text>
          <v-select v-model="model.members" :label="$t('input name')" chips tags solo>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" :close="!disabled" outline color="blue" @input="removeMember(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-select>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>