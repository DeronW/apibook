<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "input name": "输入用户名, 然后回车",
        "Email or Username": "用户名或邮箱",
        "Add new member": "添加新成员",
        "Member Management": "成员管理"
    },
    "en": {
        "input name": "Input username and press Enter"
    }
}
</i18n>

<template>

  <v-container grid-list-xl>
    <v-card v-if="groupId">
      <v-layout>
        <v-flex xs10 offset-xs1>
          <h2 style="padding: 30px;">{{$t('Project List')}}</h2>
          <v-data-table :headers="project_titles" :items="projects" hide-actions>
            <template slot="items" slot-scope="props">
              <td>
                <v-btn flat color="info" nuxt :to="`/projects/${props.item.id}`">{{ props.item.name }}</v-btn>
              </td>
              <td>{{ props.item.describe }}</td>
              <td>{{ props.item.scope }}</td>
              <td>{{ props.item.status }}</td>
              <td>{{ $dayjs().from($dayjs(props.item.created_at*1000)) }}</td>
              <td>
                <v-btn flat color="red" @click="removeProject(props.item.id)">{{$t('Remove')}}</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
    <br />
    <br />
    
    <v-card>
        <v-layout row wrap>
          <v-flex xs5 offset-xs1>
            <v-text-field v-model="model.name" :label="$t('group.name')"></v-text-field>
            <v-text-field multi-line v-model="model.describe" :label="$t('group.describe')"></v-text-field>
          </v-flex>
          <v-flex xs5 offset-xs1>

            <v-radio-group v-model="model.scope">
              <v-radio :label="$t('Public')" value="public"></v-radio>
              <p class="text-sm-left">{{$t('public label')}}</p>
              <v-radio :label="$t('Private')" value="private"></v-radio>
              <p class="text-sm-left">{{$t('private label')}}</p>
            </v-radio-group>

          </v-flex>
          <v-flex xs4 offset-xs1>
            <v-btn @click="submit" class="success">{{$t('Submit')}} </v-btn>
          </v-flex>
        </v-layout>
    </v-card>
    <br />
    <br />

    <v-card v-if="this.groupId">
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

    <br />
    <br />
  </v-container>
</template>