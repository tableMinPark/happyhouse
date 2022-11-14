<template>
  <div>
    <div class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BasicHeader from '@/components/common/BasicHeader.vue';

export default {
  components: {
    BasicHeader
  }
}
</script>

<style>

</style>