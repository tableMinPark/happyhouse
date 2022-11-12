<template>
    <form class="theme-form login-form">
    <h4>회원가입</h4>
    <h6>Create your account</h6>
    <div class="form-group">
        <label>Name</label>
        <div class="small-group">
            <div class="input-group"><span class="input-group-text"><i class="icon-user"></i></span>
                <input class="form-control" type="text" placeholder="Name" v-model="userName">
            </div>
        </div>
    </div>
    <div class="form-group">
        <label>Email</label>
        <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
        <input class="form-control" type="email" placeholder="Test@gmail.com" v-model="userEmail">
        </div>
    </div>
    <div class="form-group">
        <label>Password</label>
        <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
        <input class="form-control" type="password" placeholder="*********" v-model="userPassword">
        </div>
    </div>
    <div class="form-group">
        <label>Password Check</label>
        <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
        <input class="form-control" type="password" placeholder="*********" v-model="userPasswordCheck">
        </div>
    </div>

    <div class="form-group">
      <a class="btn btn-primary btn-block" @click="register">회원가입</a>
    </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            userEmail: '',
            userPassword: '',
            userPasswordCheck: ''
        }        
    },  
    methods: {
        register() {
            console.log("register " + this.userName + " " + this.userEmail + " " + this.userPassword + " " + this.userPasswordCheck);
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