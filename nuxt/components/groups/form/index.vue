<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "Maintaining": "维护中",
        "Public": "公开",
        "Private": "私有",
        "public label": "任意浏览, 但只有有权限的成员才能修改",
        "private label": "仅有权限的成员才能浏览/修改",
        "Maintaining": "使用中",
        "Deprecated": "停止维护",
        "Disabled": "禁用",
        "Group Status": "组状态",
        "Submit": "保存",
        "input name": "输入用户名, 然后回车",
        "Administrator": "管理员",
        "Developer": "开发人员",
        "Project List": "项目列表"
    },
    "en": {
        "public label": "Anyone can see this repository. You choose who can commit.",
        "private label": "You choose who can see and commit to this repository.",
        "input name": "Input username and press Enter"
    }
}
</i18n>

<template>

  <v-container grid-list-xl text-xs-center>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1>
          <v-text-field v-model="model.name" label="Name" required>
          </v-text-field>
          <v-text-field v-model="model.describe" label="Describe" multi-line></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs1>

          <v-radio-group v-model="model.scope">
            <v-radio :label="$t('Public')" value="public"></v-radio>
            <p class="text-sm-left">{{$t('public label')}}</p>
            <v-radio :label="$t('Private')" value="private"></v-radio>
            <p class="text-sm-left">{{$t('private label')}}</p>
          </v-radio-group>

          <div class="text-sm-left">{{$t('Group Status')}}</div>
          <v-radio-group v-model="model.status" row>
            <v-radio :label="$t('Maintaining')" value="maintaining"></v-radio>
            <v-radio :label="$t('Deprecated')" value="deprecated"></v-radio>
            <v-radio :label="$t('Disabled')" value="disabled"></v-radio>
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
          <v-card-text>{{$t('Administrator')}}</v-card-text>
          <v-select v-model="model.adminstrators" :label="$t('input name')" chips tags solo>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" :close="!disabled" outline color="primary" @input="removeAdministrator(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-select>

        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>{{$t('Developer')}}</v-card-text>
          <v-select v-model="model.readers" :label="$t('input name')" chips tags solo>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" :close="!disabled" outline color="blue-grey lighten-1" @input="removeReader(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-select>

        </v-card>
      </v-flex>
      <v-flex xs12>
        <p class="text-sm-left">{{$t('Project List')}}</p>
        <v-data-table :headers="project_titles" :items="projects" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.describe }}</td>
            <td>{{ props.item.describe }}</td>
            <td>{{ props.item.describe }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>