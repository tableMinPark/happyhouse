<template>
  <form class="theme-form login-form">
    <h4>로그인</h4>
    <h6>Login</h6>
    <div class="form-group">
      <label>Email</label>
      <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
        <input class="form-control" type="email" placeholder="your-email@domain.com" v-model="userInfo.userEmail">
      </div>
    </div>
    <div class="form-group">
      <label>Password</label>
      <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
        <input class="form-control" type="password" placeholder="*********" v-model="userInfo.userPassword">
      </div>
    </div>
    <div class="form-group">
      <a class="btn btn-primary btn-block" @click="login">로그인</a>
    </div>
    <div class="form-group pb-2">
      <router-link to="/forgetPassword" class="link">비밀번호찾기</router-link>
      <router-link to="/register" class="link me-2">회원가입</router-link>
    </div>
    
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return{
      userInfo: {
        userEmail: '',
        userPassword: ''
      }
    }
  },
  computed: {
    ...mapState("userStore", ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions("userStore", ["userConfirm", "getUserInfo"]),

    async login() {
      await this.userConfirm(this.userInfo);
      let token = sessionStorage.getItem("access-token");
      
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "main" });
      }
    }
  }
}
</script>

<style>

</style>