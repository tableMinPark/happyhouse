<template>
  <div id="app">
    <header-page></header-page>
    <body-page></body-page>
  </div>
</template>

<script>
import HeaderPage from "@/components/common/MainHeader.vue"
import BodyPage from "@/components/common/MainBody.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
export default {
  name: "App",
  components: {
    HeaderPage,
    BodyPage,
  },
  async mounted() {
    // 스크립트 로딩
    await this.$loadScript(this.$hostname + "/assets/js/jquery-3.5.1.min.js")
    await this.$loadScript(this.$hostname + "/assets/js/sidebar-menu.js")
    await this.$loadScript(this.$hostname + "/assets/js/config.js")
    // await this.$loadScript(this.$hostname + "/assets/js/bootstrap/popper.min.js");
    // await this.$loadScript(this.$hostname + "/assets/js/bootstrap/bootstrap.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/prism/prism.min.js")
    // await this.$loadScript(this.$hostname + "/assets/js/tooltip-init.js");
    await this.$loadScript(this.$hostname + "/assets/js/script.js")
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2.full.min.js")
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2-custom.js")
    await this.$loadScript(this.$hostname + "/assets/js/dropzone/dropzone.js")
    await this.$loadScript(this.$hostname + "/assets/js/dropzone/dropzone-script.js")
    await this.$loadScript(this.$hostname + "/assets/js/owlcarousel/owl.carousel.js")
    await this.$loadScript(this.$hostname + "/assets/js/owlcarousel/owl-custom.js")
    // await this.$loadScript("//dapi.kakao.com/v2/maps/sdk.js?b27eaa14790c25c57f7bfaf07f95d86e")
  },
}
</script>

<style>
i {
  vertical-align: middle;
}
</style>
