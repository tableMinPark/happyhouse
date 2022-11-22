<template>
  <form class="theme-form login-form">
    <h4>로그인</h4>
    <h6>Login</h6>
    <div class="form-group">
      <label>Email</label>
      <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
        <input class="form-control" type="email" placeholder="your-email@domain.com" :class="{'input-error': isEmail}" v-model="user.userEmail">
      </div>
    </div>
    <div class="form-group">
      <label>Password</label>
      <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
        <input class="form-control" type="password" placeholder="*********" :class="{'input-error': isPassword}" v-model="user.userPassword">
      </div>
    </div>
    <div class="form-group">
      <a class="btn btn-primary btn-block" @click="login">로그인</a>
    </div>
    <div class="form-group">
      <a class="btn btn-primary btn-block" @click="kakaoLogin">카카오 로그인</a>
    </div>
    <div class="form-group pb-2">
      <router-link to="/forgetPassword" class="link">비밀번호찾기</router-link>
      <router-link to="/register" class="link me-2">회원가입</router-link>
    </div>
  </form>
</template>

<script>

import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        userEmail: '',
        userPassword: ''
      },
      isEmail: false,
      isPassword: false
    }
  },
  methods: {
    ...mapActions("userStore", ["userLogin"]),
    
    inputCheck() {
      let check = true;
      if (this.user.userEmail === "") {
        this.isEmail = true;
        check = false;
      }
      if (this.user.userPassword === "") {
        this.isPassword = true;
        check = false;
      }
      return check;
    },
    async login() {      
      if (this.inputCheck()) {
        await this.userLogin(this.user);
      }
    },

    async kakaoLogin() {

    }
  },
  mounted() {
      /* global Kakao */
      if (typeof Kakao != undefined) return;

      const script = document.createElement("script");

      script.onload = () => Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      document.head.appendChild(script);
  },
}
</script>

<style scoped>
.input-error {
  border-color: #d22d3d !important;
}
</style>