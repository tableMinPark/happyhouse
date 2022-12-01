<template>
  <div class="pt-5 p-3">
    <div class="container-fluid">
      <basic-header name="매물"></basic-header>
    </div>
    <router-view></router-view>
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