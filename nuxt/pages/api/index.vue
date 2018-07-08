<script src="./api.js"></script>
<i18n>
{}
</i18n>
<template>
    <v-layout row>
        <v-flex xs4>
            <v-navigation-drawer stateless value="true">
                <v-list>

                    <v-list-group prepend-icon="home">
                        <v-list-tile slot="activator">
                            <v-list-tile-title>{{$t('Project')}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>{{$t('project.name')}}</v-list-tile-action>
                            <v-list-tile-title>{{project.name}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>{{$t('project.describe')}}</v-list-tile-action>
                            <v-list-tile-title>{{project.describe}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>{{$t('project.scope')}}</v-list-tile-action>
                            <v-list-tile-title>{{project.scope}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>{{$t('project.status')}}</v-list-tile-action>
                            <v-list-tile-title>{{project.status}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>{{$t('Created at')}}</v-list-tile-action>
                            <v-list-tile-title>{{project.created_at}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-group prepend-icon="group">
                        <v-list-tile slot="activator">
                            <v-list-tile-title>{{$t('Member')}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile v-for="member in members" :key="member.id">
                            <v-list-tile-action></v-list-tile-action>
                            <v-list-tile-title>{{member.username}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-group prepend-icon="list" value="true">
                        <v-list-tile slot="activator">
                            <v-list-tile-title>{{$t('APIs')}}</v-list-tile-title>
                        </v-list-tile>

                        <template v-for="module in modules">
                            <v-list-group :key="module.id" no-action sub-group value="true">
                                <v-list-tile slot="activator">
                                    <v-list-tile-title>{{module.name}}</v-list-tile-title>
                                </v-list-tile>

                                <v-list-tile v-for="api in module.apis" :key="`${module.id}-${api.id}`">
                                    <v-list-tile-title>{{module.prefix + api.path}}</v-list-tile-title>

                                    <v-list-tile-action>
                                        <v-icon btn>edit</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-group>
                        </template>

                        <v-list-tile v-for="api in apis" :key="api.id">
                            <v-list-tile-action></v-list-tile-action>
                            <v-list-tile-title>
                                {{api.method}}
                                {{api.path}}
                            </v-list-tile-title>

                            <v-list-tile-action>
                                <v-icon btn>edit</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>


                </v-list>
            </v-navigation-drawer>
        </v-flex>
        <v-flex xs8>
            
        </v-flex>
    </v-layout>
</template>