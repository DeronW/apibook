<template>
<span :class="className">
    <b class="info--text" v-if="scope == 'public'">{{$t('Public')}}</b>
    <b class="warning--text" v-if="scope == 'private'">{{$t('Private')}}</b>
</span>
</template>
<script>
export default {
    props: ["scope", "className"]
    // computed: {
    //     className: function(){
    //         return this.class
    //     }
    // }
};
</script>