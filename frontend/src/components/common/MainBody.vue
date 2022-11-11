<template>
    <div class="page-body-wrapper horizontal-menu">
        
        <nav-bar></nav-bar>

        <div class="page-body">
            <router-view></router-view>
          
        </div>

        <footer-page></footer-page>
      </div>
</template>

<script>

import NavBar from '@/components/common/MainNavBar.vue';
import FooterPage from '@/components/common/MainFooter.vue';

import router from "../../routers/routers.js"

export default {
  components: {
    NavBar,
    FooterPage
  },
  router,
}
</script>

<style>

</style>