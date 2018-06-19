<template>
    <v-app>
        <Header />
        <Drawer />
        <v-content>
            <Notify />
            <v-container fill-height>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { Header, Drawer, Notify } from "~/components";

export default {
    components: {
        Header, Drawer,Notify
    }
}
</script>