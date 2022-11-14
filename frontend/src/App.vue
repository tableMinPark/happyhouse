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
    this.$loadScript("./assets/js/jquery-3.5.1.min.js").then(() => {
      this.$loadScript("./assets/js/sidebar-menu.js").then(() => {
        this.$loadScript("./assets/js/config.js").then(() => {
          this.$loadScript("./assets/js/bootstrap/popper.min.js").then(() => {
            this.$loadScript("./assets/js/bootstrap/bootstrap.min.js").then(() => {
              this.$loadScript("./assets/js/prism/prism.min.js").then(() => {
                this.$loadScript("./assets/js/tooltip-init.js").then(() => {
                  this.$loadScript("./assets/js/script.js").then(() => {
                    this.$loadScript("./assets/js/select2/select2.full.min.js").then(() => {
                      this.$loadScript("./assets/js/select2/select2-custom.js");
                    })
                  })
                })
              })
            })
          })
        })
      })
    });
 }
}
</script>

<style>
i {  
  vertical-align: middle;
}
</style>
