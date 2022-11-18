<template>
    <div class="container-fluid">
        <!-- 회원 프로필 설정 -->
        <my-page-header></my-page-header>
        
        <!-- 친구 페이지를 방문할 때 (나의 페이지가 아닐 때) -->
        <follow-tab v-if="!isMyPage"></follow-tab>
        <!-- 일반회원일 때 탭 (나의 페이지가 맞고 코드가 100일 때) -->
        <normal-tab v-else-if="myPageUserInfo.userCode == '100'"></normal-tab>

        <!-- 기업회원일 때 탭 (나의 페이지가 맞고 코드가 200일 때) -->
        <company-tab v-else-if="myPageUserInfo.userCode == '200'"></company-tab>

        {{userInfo}}
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
        ...mapState("userStore", ["userInfo"]),
        ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"])
    }
}
</script>

<style>
.nav-item {
    cursor: pointer;
}
</style>