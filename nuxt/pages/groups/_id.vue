<template>
    <GroupForm :id="id"/>
</template>

<script>
import { GroupForm } from "~/components";
export default {
    asyncData({ params }) {
        return { id: params.id };
    },
    components: {
        GroupForm
    }
};
</script>