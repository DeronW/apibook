<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "Submit": "保存",
        "input name": "输入用户名, 然后回车",
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
          <v-text-field v-model="model.name" :label="$t('group.name')" required>
          </v-text-field>
          <v-text-field v-model="model.describe" :label="$t('group.describe')" multi-line></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs1>

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
        <h2>{{$t('Members')}}</h2>
      </v-flex>

        <template v-for="(m, index) in model.members">
            <v-flex v-bind:key="index">
                <v-alert value="true" outline dismissible> {{m}} </v-alert>
            </v-flex>
        </template>

        <v-flex xs3 v-bind:key="index" class="text-sm-left">
            <input />
                <v-icon color="green">add</v-icon>
        </v-flex>

      <v-flex xs12 v-if="projects.length">
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