<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "Project Status": "项目状态",
        "input name": "输入用户名, 然后回车",
        "Group Selector": "选择群组",
        "Add new member": "添加新成员",
        "Member Management": "成员管理"
    },
    "en": {
        "input name": "Input username and press Enter"
    }
}
</i18n>

<template>

  <v-container grid-list-xl text-xs-center>
    <v-card>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1>
          <v-text-field v-model="model.name" :label="$t('project.name')" required>
          </v-text-field>
          <v-text-field v-model="model.describe" :label="$t('project.describe')" multi-line></v-text-field>

            <v-select
              :items="group_list"
              box
              v-model="model.group_id"
              :label="$t('Group Selector')"
            ></v-select>

        </v-flex>
        <v-flex xs5 offset-xs1>

          <h3 class="text-sm-left">{{$t('Project Status')}}</h3>

          <v-radio-group v-model="model.status" row>
            <v-radio :label="$t('Maintaining')" value="maintaining"></v-radio>
            <v-radio :label="$t('Deprecated')" value="deprecated"></v-radio>
            <v-radio :label="$t('Disabled')" value="disabled"></v-radio>
          </v-radio-group>

          <h3 class="text-sm-left">{{$t('Project Scope')}}</h3>
          <v-radio-group v-model="model.scope">
            <v-radio :label="$t('Public')" value="public"></v-radio>
            <p class="text-sm-left">{{$t('public label')}}</p>
            <v-radio :label="$t('Private')" value="private"></v-radio>
            <p class="text-sm-left">{{$t('private label')}}</p>
          </v-radio-group>

        </v-flex>
        <v-flex xs4>
          <v-btn @click="submit" class="success">{{$t('Submit')}} </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <br />
    <br />


    <v-card v-if="this.projectId">
      <v-layout row wrap>
        <v-flex xs11 offset-xs1>
          <h2>{{$t('Member Management')}}</h2>
        </v-flex>
        <v-flex xs5 offset-xs1>
          
          <v-alert :value="!addUserTips" outline color="info">{{$t('Add new member')}}</v-alert>
          <v-alert :value="!!addUserTips" outline color="error">{{addUserTips}}</v-alert>
          <v-text-field outline prepend-icon="people" clearable :label="$t('Email or Username')" @keyup.enter="addMember"></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-data-table :headers="member_titles" :items="model.members" hide-actions>
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">
                  <v-btn flat color="info" nuxt :to="`/users/${props.item.id}`">{{ props.item.username }}</v-btn>
              </td>
              <td>
                <v-btn flat color="red" @click="removeMember(props.item.id)">{{$t('Remove')}}</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>