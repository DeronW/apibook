<template>
    <v-layout justify-center align-center>
        <v-btn v-on:click="test">Test</v-btn>
        <h1 style="font-size: 68px; text-align: center; color: #e0e0e0;">API Book</h1>
    </v-layout>
</template>

<script>
export default {
    methods: {
        test(){
            this.$store.dispatch('notify', {
                type: 'info',
                text: +new Date()
            })
        }
    }
}
</script>