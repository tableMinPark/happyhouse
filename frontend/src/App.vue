<template>
  <div id="app">
    <div v-if="isLoading" class="loader-wrapper">
      <div class="theme-loader">
        <div class="loader-p"></div>
      </div>
    </div>
    <header-page></header-page>
    <body-page></body-page>

    <div v-if="accessAlert" data-notify="container" class="col-xs-11 col-sm-4 alert alert-primary notify-alert animated bounce"
      role="alert" data-notify-position="top-left"
      style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 10000; top: 30px; left: 30px;">
      <button type="button" aria-hidden="true" class="close" data-notify="dismiss"
        style="display: none; position: absolute; right: 10px; top: 5px; z-index: 100002;">×</button><span
        data-notify="icon" class="0"></span> <span data-notify="title">{{ alertTitle }}</span> <span
        data-notify="message">{{ alertMessage }}</span><a href="#" target="_blank" data-notify="url"></a></div>
  </div>
</template>

<script>
import HeaderPage from "@/components/common/MainHeader.vue";
import BodyPage from "@/components/common/MainBody.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { mapState, mapActions } from "vuex";

const commonStore = "commonStore";

export default {
  name: "App",
  components: {
    HeaderPage,
    BodyPage,
  },
  computed: {
    ...mapState(commonStore, ["isLoading", "accessAlert", "alertTitle", "alertMessage"])
  },
  methods: {
    ...mapActions(commonStore, ["setInit"])
  },
  async mounted() {
    // 스크립트 로딩
    await this.$loadScript(this.$hostname + "/assets/js/jquery-3.5.1.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/sidebar-menu.js");
    await this.$loadScript(this.$hostname + "/assets/js/config.js");
    await this.$loadScript(this.$hostname + "/assets/js/prism/prism.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/script.js");
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2.full.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/select2/select2-custom.js");
    await this.$loadScript(this.$hostname + "/assets/js/owlcarousel/owl.carousel.js");
    await this.$loadScript(this.$hostname + "/assets/js/owlcarousel/owl-custom.js");
    await this.$loadScript(this.$hostname + "/assets/js/notify/bootstrap-notify.min.js");
    await this.$loadScript(this.$hostname + "/assets/js/notify/notify-script.js");
    await this.$loadScript(this.$hostname + "/assets/js/notify/bootstrap-notify.min.js");
  },
  async created() {
    await this.setInit();
  }
}
</script>

<style scoped>
.loader-wrapper {
  background: rgba(0, 0, 0, 0.2);
}

i {
  vertical-align: middle;
}
</style>
