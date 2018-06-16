<script src="./form.js"></script>
<i18n>
{
    "zh": {
        "Maintaining": "维护中"
    }
}
</i18n>

<template>

  <v-container grid-list-xl text-xs-center>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs6>

          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Name" required>
          </v-text-field>

          <v-text-field v-model="describe" label="Describe" multi-line></v-text-field>

        </v-flex>
        <v-flex xs6>

          <p class="text-sm-left">Left align on small viewport sizes</p>
          <v-radio-group v-model="row" row>
            <v-radio label="Public" value="public"></v-radio>
            <v-radio label="Private" value="private"></v-radio>
          </v-radio-group>

          <p class="text-sm-left">Left align on small viewport sizes</p>
          <v-radio-group v-model="row" row>
            <v-radio :label="$t('Maintaining')" value="maintaining"></v-radio>
            <v-radio label="Deprecated" value="deprecated"></v-radio>
            <v-radio label="Disabled" value="disabled"></v-radio>
          </v-radio-group>

        </v-flex>
        <v-flex xs4>
          <v-btn :disabled="!valid" @click="submit">
            submit </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <br />
    <v-layout row wrap>
      <v-flex xs12>

        <p class="text-sm-left">Left align on small viewport sizes</p>
      </v-flex>
      <v-flex xs6>

        <v-card>

          <v-card-text>Adminstrator</v-card-text>

          <v-select v-model="adminstrators" label="Input username and press Enter" chips tags solo prepend-icon="filter_list" append-icon="" clearable>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" close outline color="primary" @input="removeAdministrator(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-select>

        </v-card>
      </v-flex>
      <v-flex xs6>

        <v-card>
          <v-card-text>Reader</v-card-text>

          <v-select v-model="readers" label="Input username and press Enter" chips tags solo prepend-icon="filter_list" append-icon="" clearable>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" close outline @input="removeReader(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-select>

        </v-card>
      </v-flex>
      <v-flex xs12>

        <p class="text-sm-left">Left align on small viewport sizes</p>
        <v-data-table :headers="project_titles" :items="projects" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.describe }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>