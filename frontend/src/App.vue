<template>
  <div id="app">
    <header-page></header-page>
    <body-page></body-page>
  </div>
</template>

<script>
import HeaderPage from "@/components/common/MainHeader.vue";
import BodyPage from "@/components/common/MainBody.vue";

export default {
  name: 'App',
  components: {
    HeaderPage,
    BodyPage
  },
  async mounted () {
    // 스크립트 로딩
    await this.$loadScript(this.$hostname + "/assets/js/jquery-3.5.1.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/sidebar-menu.js");
    await this.$loadScript(this.$hostname + "/assets/js/config.js");
    await this.$loadScript(this.$hostname + "/assets/js/bootstrap/popper.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/bootstrap/bootstrap.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/prism/prism.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/tooltip-init.js");
    await this.$loadScript(this.$hostname + "/assets/js/script.js");
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2.full.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2-custom.js");
  }
}
</script>

<style>
i {  
  vertical-align: middle;
}
</style>
