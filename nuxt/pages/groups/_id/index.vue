<i18n>
{
    "zh": {
        "Group": "群组"
    }
}
</i18n>
<template>
    <GroupForm :groupId="groupId"/>
</template>

<script>
import { GroupForm } from "~/components";
export default {
    asyncData({ params }) {
        return { groupId: params.id };
    },
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: ""
        };
    },
    mounted() {
        this.$axios.$get("/group/info.json?gid=" + this.groupId).then(data => {
            this.title = data.name;
        });
    },
    components: {
        GroupForm
    }
};
</script>