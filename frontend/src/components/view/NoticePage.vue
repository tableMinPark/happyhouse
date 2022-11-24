<template>
  <div class="pt-5 p-3">
    <div class="container-fluid">
      <basic-header name="공지사항"></basic-header>
    </div>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";

export default {
  components: {
    BasicHeader,
  },
};
</script>

<style>

</style>
