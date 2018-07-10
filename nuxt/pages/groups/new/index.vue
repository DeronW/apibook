<i18n>
{
    "zh": {
        "Create Group": "创建群组"
    }
}
</i18n>
<template>
  <GroupForm />
</template>

<script>
import { GroupForm } from "~/components";
export default {
    head(){
        return {
            title: this.$t('Create Group')
        }
    },
    components: {
        GroupForm
    }
};
</script>