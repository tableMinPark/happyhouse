<template>
    <div class="container-fluid">
        <my-page-header></my-page-header>
        <follow-tab v-if="!isMyPage"></follow-tab>
        <normal-tab v-else-if="myPageUserInfo.code == '100'"></normal-tab>
        <company-tab v-else-if="myPageUserInfo.code == '200'"></company-tab>
    </div>

</template>

<script>
import { mapState } from "vuex";

import MyPageHeader from '@/components/MyPage/MyPageHeader.vue';
import NormalTab from '@/components/MyPage/Tab/NormalTab.vue';
import CompanyTab from '@/components/MyPage/Tab/CompanyTab.vue';
import FollowTab from '@/components/MyPage/Tab/FollowTab.vue';


export default {
    components: {
        MyPageHeader,
        NormalTab,
        CompanyTab,
        FollowTab
    },
    computed: {
        ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"])
    }
}
</script>

<style>
.nav-item {
    cursor: pointer;
}
</style>