<template>
    <div class="page-main-header">
        <div class="main-header-right row m-0">
          <div class="main-header-left">
            <div class="logo-wrapper"><router-link to="/" ><img class="img-fluid" src="assets/images/logo/logo.png" alt=""></router-link></div>
            <div class="toggle-sidebar"><i class="status_toggle middle" data-feather="align-center" id="sidebar-toggle"></i></div>
          </div>
          <div class="nav-right col pull-right right-menu p-0">
            <ul class="nav-menus">              
              <li class="onhover-dropdown p-0">
                <button class="btn btn-primary-light" type="button"><router-link to="/login"><i data-feather="log-out"></i>Log in</router-link></button>
              </li>
            </ul>
          </div>
          <div class="d-lg-none mobile-toggle pull-right w-auto"><i data-feather="more-horizontal"></i></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>