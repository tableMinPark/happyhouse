<template>
  <div>
    <div v-if="isMyPage" class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      <my-page-body></my-page-body>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BasicHeader from '@/components/common/BasicHeader.vue';
import MyPageBody from '@/components/MyPage/MyPageBody.vue';

export default {
  name: "MainNavBar",
  components: {
    BasicHeader,
    MyPageBody
  },
  computed: {
    ...mapState("myPageStore", ["isMyPage"]),
  }
}
</script>

<style>

</style>