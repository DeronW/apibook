<i18n>
{
    "zh": {
        "New Project": "新建项目"
    }
}
</i18n>
<template>
  <ProjectForm />
</template>

<script>
import { ProjectForm } from "~/components";
export default {
    head() {
        return {
            title: this.$t("New Project")
        };
    },
    components: {
        ProjectForm
    }
};
</script>