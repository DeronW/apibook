<template>
<div>
    <b class="info--text" v-if="scope == 'public'">{{$t('Public')}}</b>
    <b class="warning--text" v-if="scope == 'private'">{{$t('Private')}}</b>
</div>
</template>
<script>
export default {
    props: ["scope"]
};
</script>