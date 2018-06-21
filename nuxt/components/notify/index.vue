<script src="./notify.js"></script>

<template>
    <v-layout style="height: 0px; position: relative;">
        <div style="width: 100%;">
            <v-alert v-if="message.text" :value="message.show" :type="message.type" transition="slide-y-transition" style="width: 100%; border: 0 !important;">
                {{message.text}}
            </v-alert>
        </div>
    </v-layout>
</template>