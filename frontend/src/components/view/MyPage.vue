<template>
  <div class="pt-5 p-3">
    <div v-if="isMyPage" class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      <my-page-body></my-page-body>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BasicHeader from '@/components/common/BasicHeader.vue';
import MyPageBody from '@/components/MyPage/MyPageBody.vue';

export default {
  name: "MainNavBar",
  components: {
    BasicHeader,
    MyPageBody
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("myPageStore", ["isMyPage", "pageId"]),
  },
  methods: {
    ...mapActions("myPageStore", ["setMyPageInit"]),
  },
  async created() {
    await this.setMyPageInit({
      pageId: parseInt(this.$route.params.userId),
      userInfo: this.userInfo
    });

    // 조회된 유저 없음 (마이페이지가 없음)
    if (this.pageId === null) {
      this.$router.push({ name: "main" });
    }
  }
}
</script>

<style>

</style>