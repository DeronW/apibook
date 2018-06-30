<script src="./api-list.js"></script>

<i18n>
{
    "zh": {
        "Rows per page": "每页显示条数"
    }
}
</i18n>
¸
<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="rows"
        :search="search"
        :rows-per-page-items="[10,25,{'text':$t('All'),value:-1}]"
        :rows-per-page-text="$t('Rows per page')"
    >
      <template slot="items" slot-scope="props">
        <td style="width: 40px; padding: 0; text-align:center;">
          <span :class="props.item.className">{{ props.item.method }}</span>
        </td>
        <td>{{ props.item.path }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>