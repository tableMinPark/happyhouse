<template>
  <div>
    <div class="container-fluid">
      <basic-header name="마이페이지"></basic-header>
    </div>
    <div class="container-fluid">
      

      <!-- <router-link to="/mypage/ask">ask</router-link>
      <router-link to="/mypage/bookmark">bookmark</router-link>
      <router-link to="/mypage/houselist">houselist</router-link>
      <router-link to="/mypage/profile">profile</router-link>
      <router-link to="/mypage/profilemodify">profilemodify</router-link>
      <router-link to="/mypage/review">review</router-link> -->
      <ul class="nav nav-tabs" id="myTab3" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab"         data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profile-tabs" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
        </li>
      </ul>
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <p class="mb-0 m-t-30">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </p>
      </div>
      <div class="tab-pane fade" id="profile"        role="tabpanel" aria-labelledby="profile-tab">
        <p class="mb-0 m-t-30">
          profile Testttttt
        </p>
      </div>

      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BasicHeader from '@/components/common/BasicHeader.vue';

export default {
  components: {
    BasicHeader
  }
}
</script>

<style>

</style>