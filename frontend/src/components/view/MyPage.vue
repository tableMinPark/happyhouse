<template>
  <div>
    <div v-if="isMyPage" class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      <my-page-body :isMyPage="isMyPage" :myPageId="myPageId"></my-page-body>
    </div>
  </div>
</template>

<script>
import BasicHeader from '@/components/common/BasicHeader.vue';
import MyPageBody from '@/components/MyPage/MyPageBody.vue';

export default {
  data() {
    return {      
      isMyPage: null,     // 현재 로그인되어있는 유저 ID
      myPageId: null,     // 방문하는 페이지의 유저 ID
      loginUserId: null
    }
  },
  components: {
    BasicHeader,
    MyPageBody
  },
  created() {
    // 현재 방문하려는 페이지가 나의 페이지인지 확인하는 부분
    this.myPageId = this.$route.params.userId;
    this.loginUserId = this.$store.state.userInfo.userId;
    this.isMyPage = this.myPageId == this.loginUserId;
  }
}
</script>

<style>

</style>