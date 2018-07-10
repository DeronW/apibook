<template>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>

      <v-breadcrumbs-item
        v-for="item in [{text: 'A', disabled: 1}, {text: 'B', disabled: 0}, {text: 'C', disabled: 0}]"
        :disabled="item.disabled"
        :key="item.text"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    
</template>

<script>
const home = {
    text: "Home"
};
export default {
    asyncData(c) {
        console.log("ccc", c);
    },
    data() {
        return {
            items: []
        };
    }
};
</script>