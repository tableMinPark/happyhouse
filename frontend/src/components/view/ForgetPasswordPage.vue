<template>
    <form class="theme-form login-form">
      <h4>비밀번호찾기</h4>
      <h6>Forget Password</h6>
      <div class="form-group">
        <label>Name</label>
        <div class="small-group">
        <div class="input-group"><span class="input-group-text"><i class="icon-user"></i></span>
            <input class="form-control" :class="{'input-error': isName}" type="text" required="true" placeholder="Name" v-model="user.userName">
        </div>
        </div>
    </div>
      <div class="form-group">
        <label>Email</label>
        <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
          <input class="form-control" :class="{'input-error': isEmail}" type="email" required="true" placeholder="Test@gmail.com" v-model="user.userEmail">
        </div>
      </div>
      <div class="form-group">
        <a class="btn btn-primary btn-block" @click="forget">비밀번호 찾기</a>
      </div>  
    </form>

  </template>
  
  <script>

  import { mapActions, mapState } from "vuex";

  export default {
    data() {
        return {
        user: {
          userName: '',
          userEmail: ''
        },
        isName: false,
        isEmail: false
      }
    },
    computed: {
      ...mapState("userStore", ["isForgetPasswordError"]),
    },
    methods: {
      ...mapActions("userStore", ["forgetPassword"]),
      
      inputCheck() {
        let check = true;
        if (this.user.userName === "") {
          this.isName = true;
          check = false;
        }
        if (this.user.userEmail === "") {
          this.isEmail = true;
          check = false;
        }
        return check;
      },

      async forget() {
        if (this.inputCheck()) {
          await this.forgetPassword(this.user);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .input-error {
    border-color: #d22d3d !important;
  }
  </style>