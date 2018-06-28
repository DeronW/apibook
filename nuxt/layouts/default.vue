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
        <Footer />
    </v-app>
</template>

<script>
import { Header, Drawer, Notify, Footer } from "~/components";

export default {
    components: {
        Header,
        Drawer,
        Notify,
        Footer
    }
};
</script>