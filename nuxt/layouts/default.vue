<template>
    <v-app>
        <Header />
        <Drawer />
            
        <v-content>
        <v-container fill-height>
            <nuxt />
        </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { Header, Drawer } from "~/components";

export default {
    components: {
        Header, Drawer
    }
}
</script>