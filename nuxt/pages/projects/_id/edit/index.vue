<template>
    <ProjectForm :projectId="projectId" />
</template>

<script>
import { ProjectForm } from "~/components";
export default {
    asyncData({ params }) {
        return { projectId: params.id };
    },
    components: {
        ProjectForm
    }
};
</script>