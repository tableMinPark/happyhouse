<template>
    <div class="container-fluid">
        <!-- 회원 프로필 설정 -->
        <my-page-header :isMyPage="isMyPage" :userInfo="userInfo"></my-page-header>
        
        <!-- 친구 페이지를 방문할 때 (나의 페이지가 아닐 때) -->
        <follow-tab v-if="!isMyPage" :isMyPage="isMyPage" :userInfo="userInfo" :userId="userInfo.userId"></follow-tab>

        <!-- 일반회원일 때 탭 (나의 페이지가 맞고 코드가 100일 때) -->
        <normal-tab v-else-if="userInfo.userCode == '100'" :isMyPage="isMyPage" :userId="userInfo.userId"></normal-tab>

        <!-- 기업회원일 때 탭 (나의 페이지가 맞고 코드가 200일 때) -->
        <company-tab v-else-if="userInfo.userCode == '200'"></company-tab>

    </div>
</template>

<script>
import MyPageHeader from '@/components/MyPage/MyPageHeader.vue';

import NormalTab from '@/components/MyPage/Tab/NormalTab.vue';
import CompanyTab from '@/components/MyPage/Tab/CompanyTab.vue';
import FollowTab from '@/components/MyPage/Tab/FollowTab.vue';

export default {
    props: ['isMyPage', 'myPageId'],
    data() {
        return {
            userInfo: null
        }
    },  
    components: {
        MyPageHeader,
        NormalTab,
        CompanyTab,
        FollowTab
    },   
    created() {
        console.log("visit to " + this.myPageId);

        if (this.isMyPage){
            this.userInfo = this.$store.state.userInfo;
        } else {            
            // 현재 방문한 페이지의 유저 정보 받아오는 코드 (myPageId 를 이용해서 get 필요)
            this.userInfo = {
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
    }
}
</script>

<style>
.nav-item {
    cursor: pointer;
}
</style>