<template>
    <form class="theme-form login-form">
      <h4>비밀번호찾기</h4>
      <h6>Forget Password</h6>
      <div class="form-group">
        <label>Name</label>
        <div class="small-group">
        <div class="input-group"><span class="input-group-text"><i class="icon-user"></i></span>
            <input class="form-control" type="text" required="true" placeholder="Name" v-model="userName">
        </div>
        </div>
    </div>
      <div class="form-group">
        <label>Email</label>
        <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
          <input class="form-control" type="email" required="true" placeholder="Test@gmail.com" v-model="userEmail">
        </div>
      </div>
      <div class="form-group">
        <a class="btn btn-primary btn-block" @click="forgetPassword">비밀번호 찾기</a>
      </div>
      
    </form>
  </template>
  
  <script>
  export default {
    data() {
        return {
            userName: '',
            userEmail: ''
        }
    },
    methods: {
        forgetPassword() {
        console.log("forgetPassword " + this.userName + " " + this.userEmail);
        // this.$router.push('/login');
      }
    },  
  mounted () {
      const scriptNames = [
        // '',
      ]
      scriptNames.forEach(scriptName => {
      let script = document.createElement('script');
      script.setAttribute('src', scriptName);
      script.async = false;
      document.body.appendChild(script);
    });
 }
  }
  </script>
  
  <style>
  
  </style>