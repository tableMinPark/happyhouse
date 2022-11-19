<template>
  <header class="main-nav">
    <div v-if="isLogin" class="sidebar-user text-center">
      <router-link :to="`/profile/${userInfo.userId}`" class="setting-primary">
        <feather type="settings" size="15" />
      </router-link><img class="img-90 rounded-circle" :src="$noProfileImageUrl" alt="">
      <div class="badge-bottom"><span class="badge badge-primary">New</span></div><a>
        <h6 class="mt-3 f-14 f-w-600">{{userInfo.userName}}</h6>
      </a>
      <p class="mb-0 font-roboto">{{userInfo.code}}</p>
    </div>

    <div v-else class="sidebar-user text-center">
      <img class="img-90 rounded-circle" :src="$noProfileImageUrl" alt="">
      <h6 class="mt-3 f-14">로그인이 필요합니다.</h6>
      <p class="mt-2">
          <router-link to="/login">
            <div class="btn btn-primary-light" type="button">
              <feather type="log-out" size="12" />Log in
            </div>
          </router-link>
      </p>
    </div>

    <nav>
      <div class="main-navbar">
        <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
        <div id="mainnav">
          <ul class="nav-menu custom-scrollbar">
            <li class="back-btn">
              <div class="mobile-back text-end"><span>Back</span><i class="fa fa-angle-right ps-2"
                  aria-hidden="true"></i></div>
            </li>
            <li class="sidebar-main-title">
              <div>
                <h6>Menu</h6>
              </div>
            </li>
            <li class="dropdown">
              <router-link to="/deal" class="nav-link menu-title link-nav">
                <feather type="home" size="15" /><span>실거래가</span>
              </router-link>
            </li>
            <li class="dropdown">
              <router-link to="/houseinfo" class="nav-link menu-title link-nav">
                <feather type="home" size="15" /><span>매물조회</span>
              </router-link>
            </li>
            <li class="dropdown">
              <router-link to="/notice" class="nav-link menu-title link-nav">
                <feather type="home" size="15" /><span>공지사항</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainNavBar",
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  }
}
</script>

<style>

</style>