<template>
<v-layout>
    sdf
</v-layout>
</template>

<script>
import { ProjectForm } from "~/components";
export default {
    asyncData({ params }) {
        return { id: params.id };
    },
    components: {
        ProjectForm
    }
};
</script>