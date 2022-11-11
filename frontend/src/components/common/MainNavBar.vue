<template>
  <header class="main-nav">
          <div class="sidebar-user text-center"><router-link to="/mypage" class="setting-primary"><i data-feather="settings"></i></router-link><img class="img-90 rounded-circle" src="assets/images/dashboard/1.png" alt="">
            <div class="badge-bottom"><span class="badge badge-primary">New</span></div><a href="#">
              <h6 class="mt-3 f-14 f-w-600">박상민</h6></a>
            <p class="mb-0 font-roboto">일반회원</p>
           
          </div>
          <nav>
            <div class="main-navbar">
              <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
              <div id="mainnav">           
                <ul class="nav-menu custom-scrollbar">
                  <li class="back-btn">
                    <div class="mobile-back text-end"><span>Back</span><i class="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
                  </li>
                  <li class="sidebar-main-title">
                    <div>
                      <h6>Menu</h6>
                    </div>
                  </li>
                  <li class="dropdown"><router-link to="/deal" class="nav-link menu-title link-nav"><i data-feather="file-text"></i><span>실거래가</span></router-link></li>
                  <li class="dropdown"><router-link to="/houseinfo" class="nav-link menu-title link-nav"><i data-feather="file-text"></i><span>매물조회</span></router-link></li>
                  <li class="dropdown"><router-link to="/notice" class="nav-link menu-title link-nav"><i data-feather="file-text"></i><span>공지사항</span></router-link></li>
                </ul>
              </div>
              <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
            </div>
          </nav>
        </header>
</template>

<script>
export default {

}
</script>

<style>

</style>