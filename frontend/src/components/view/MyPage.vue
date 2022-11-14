<template>
  <div>
    <div class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      <normal-my-page-body v-if="pageFlag == 'N'"></normal-my-page-body>
      <company-my-page-body v-if="pageFlag == 'C'"></company-my-page-body>
    </div>
  </div>
</template>

<script>
import BasicHeader from '@/components/common/BasicHeader.vue';
import NormalMyPageBody from '@/components/MyPage/NormalMyPageBody.vue';
import CompanyMyPageBody from '@/components/MyPage/CompanyMyPageBody.vue';

export default {
  components: {
    BasicHeader,
    NormalMyPageBody,
    CompanyMyPageBody
  },
  data() {
    return {
      pageFlag: 'N'     // N - C 
    }
  },
  async mounted() {
  }
}
</script>

<style>

</style>