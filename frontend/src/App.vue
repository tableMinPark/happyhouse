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
  mounted () {
      const scriptNames = [
        'assets/js/jquery-3.5.1.min.js',
        'assets/js/icons/feather-icon/feather.min.js',
        'assets/js/icons/feather-icon/feather-icon.js',
        'assets/js/sidebar-menu.js',
        'assets/js/config.js',
        'assets/js/bootstrap/popper.min.js',
        'assets/js/bootstrap/bootstrap.min.js',
        'assets/js/prism/prism.min.js',
        'assets/js/clipboard/clipboard.min.js',
        'assets/js/custom-card/custom-card.js',
        'assets/js/tooltip-init.js',
        'assets/js/script.js',
        'assets/js/theme-customizer/customizer.js',
        'assets/js/tooltip-init.js',
        'assets/js/form-wizard/form-wizard.js'
      ]
      scriptNames.forEach(scriptName => {
      let script = document.createElement('script');
      // script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', scriptName);
      script.async = false;
      document.body.appendChild(script);
    });
 }
}
</script>

<style>
</style>
