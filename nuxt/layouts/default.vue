<template>
    <v-app>
        <Header />
        <Drawer />
        <nuxt />
        
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