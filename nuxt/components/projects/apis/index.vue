<script src="./apis.js"></script>
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
    >
      <template slot="items" slot-scope="props">
        <td style="width: 50px;"><span class="blue--text">{{ props.item.method }}</span></td>
        <td>{{ props.item.path }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>