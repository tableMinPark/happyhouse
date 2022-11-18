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
import store from '@/store';

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
    },
    created() {
        console.log(store.getters["userStore/getUserInfo"])
        // 아이디, 현재방문하는 페이지의 아이디 비교
        // 스토어에 값 초기화 중

        // 현재 방문하는 페이지의 ID
        const pageId = this.$route.params.userId;
        // 현재 로그인한 회원의 ID
        const userId = store.getters["userStore/getUserId"];
        // 두개 비교해서 Store 에 값 갱신
        const isMyPage =  pageId == userId;

        // 내 페이지인지 확인
        store.dispatch("myPageStore/setIsMyPage", isMyPage);
        // 어떤 페이지를 방문하는지 확인
        store.dispatch("myPageStore/setPageId", pageId);

        let myPageUserInfo;
        // 내 페이지면 
        if (isMyPage){
            myPageUserInfo = store.getters["userStore/getUserInfo"];
        }
        // 친구페이지면
        else {
            // axios get user
            myPageUserInfo = {
            userId: 2,
            userName: "서우린",
            userRegDt: '2022-12-25',
            userCode: 200,
            userCodeName: '기업회원',
            userProfileImageUrl: `http://${location.host}/assets/images/user/8.jpg`,
            userFollowing: 10,
            userFollower: 20
            }  
        }
        // myPage Store 에 초기화
        store.dispatch("myPageStore/setUserInfo", myPageUserInfo);
    }
}
</script>

<style>
.nav-item {
    cursor: pointer;
}
</style>