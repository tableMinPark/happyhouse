<template>
    <div class="page-main-header">
        <div class="main-header-right row m-0">
          <div class="main-header-left">
            <div class="logo-wrapper"><router-link to="/" ><img class="img-fluid" :src="logoUrl" alt=""></router-link></div>
            <div class="toggle-sidebar"><feather type="align-center" class="status_toggle middle" id="sidebar-toggle"/></div>
          </div>
          <div class="nav-right col pull-right right-menu p-0">
            <ul class="nav-menus">              
              
              <!-- 로그인버튼 (로그아웃 상태에서 show) -->
              <li class="onhover-dropdown p-0">    
                <button class="btn btn-primary-light" type="button">             
                  <router-link to="/login">
                    <feather type="log-out" size="18"/>Log in      
                  </router-link>
                </button>
              </li>
              <!-- 로그아웃버튼 (로그인 상태에서 show) -->
              <li class="onhover-dropdown p-0">    
                <button class="btn btn-primary-light" @click="logout" type="button">             
                  <feather type="log-out" size="18"/>Log out      
                </button>
              </li>

            </ul>
          </div>
          <div class="d-lg-none mobile-toggle pull-right w-auto"><feather type="more-horizontal" /></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: this.$hostname + "/assets/images/logo/logo.png"
    }
  },
  methods: {
    logout() {
      console.log("logout");
      this.$router.push('/');
    }
  }

}
</script>

<style>
</style>