<template>
  <div class="container mt-4">
    <div class="row text-center">
      <div class="profile-title">
        <img class="img-100 rounded-circle" alt="" :src="profileUrl">
      </div>
      <div class="mt-3 mb-3">
          <button class="btn btn-primary" @click="profileImageModify">프로필사진변경</button>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Email</label>
      <input class="form-control" placeholder="your-email@domain.com" v-model="userEmail">
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input class="form-control" type="password" value="password" placeholder="*********" v-model="userPassword">
    </div>
    <div class="mb-3">
      <label class="form-label">Password Check</label>
      <input class="form-control" type="password" value="password" placeholder="*********" v-model="userPasswordCheck">
    </div>
    <div class="form-footer text-end">
      <button class="btn btn-primary btn-block" @click="profileModify">저장</button>
    </div></div>
  </template>
  
  <script>
  export default {
    data() {    
        return {
            userEmail: '',
            userPassword: '',
            userPasswordCheck: '',
            profileUrl: this.$hostname + "/assets/images/user/7.jpg" 
        }
    },
    methods: {
      profileImageModify() {
        console.log("call profileImageModify");
      },
      profileModify() {
        console.log("call profileModify " + this.userEmail + " " + this.userPassword);
      }
    }
  }
  </script>
  
  <style>
  
  </style>