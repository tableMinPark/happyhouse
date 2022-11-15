<template>
  <div class="container mt-4">
    <div class="row text-center">
      <div class="profile-title">
        <img class="img-100 rounded-circle" alt="" :src="userProfileImageUrl">
      </div>
      <div class="mt-3 mb-3">
          <button class="btn btn-primary" @click="profileImageModify">프로필사진변경</button>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Email</label>
      <input class="form-control" placeholder="your-email@domain.com" readonly :value="userEmail">
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input class="form-control" type="password" value="password" placeholder="*********" v-model="userPassword">
    </div>
    <div class="mb-3">
      <label class="form-label">Password Check</label>
      <input class="form-control" type="password" value="password" placeholder="*********" v-model="userPasswordCheck">
    </div>    
    <div class="mt-3 mb-3">
      <label class="form-label">Name</label>
      <input class="form-control" placeholder="Name" v-model="userName">
    </div> 
    <div class="mt-3 mb-3">
      <label class="form-label">Address</label>
      <input class="form-control" placeholder="Address" v-model="userAddress">
    </div>    
    <div class="mt-3 mb-3">
      <label class="form-label">Tel</label>
      <input class="form-control" placeholder="Tel" v-model="userTel">
    </div>  
    <div class="form-footer text-end">
      <button class="btn btn-primary btn-block" @click="profileModify">수정</button>
    </div></div>
  </template>
  
  <script>
  export default {
    data() {    
        return {
            userEmail: '',
            userPassword: '',
            userPasswordCheck: '',
            userName: '',
            userAddress: '',
            userTel: '',
            userProfileImageUrl: this.$hostname + "/assets/images/user/7.jpg" 
        }
    },
    methods: {
      profileImageModify() {
        console.log("call profileImageModify");
      },
      profileModify() {
        console.log("call profileModify " + this.userEmail + " " + this.userPassword);
      }
    },
    created() {
      const userInfo = this.$store.state.userInfo;
      this.userEmail = userInfo.userEmail;
      this.userName = userInfo.userName;
      this.userAddress = userInfo.userAddress;
      this.userTel = userInfo.userTel;
      this.userProfileImageUrl = userInfo.userProfileImageUrl;
    }
  }
  </script>
  
  <style>
  
  </style>