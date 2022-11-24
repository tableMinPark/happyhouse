<template>
  <div class="container mt-4">
    <div class="row text-center">
      <div class="profile-title">
        <img class="img-80 rounded-circle" alt="" v-if="selimg === '' && userInfo.userProfileImageUrl !== undefined"
          :src="require(`@/assets/upload/${userInfo.userProfileImageUrl}`)" />
        <img v-if="selimg !== ''" class="img-80 rounded-circle" :src="selimg" alt="" /><br />
      </div>
      <div class="mt-3 mb-3">
        <button class="btn btn-primary" @click="profileImageModify">프로필사진변경</button>
        <div v-if="profile != ''" class="thumbnail">
          <button class="btn btn-primary mb-3" @click="deleteProfile">삭제</button>
        </div>
        <input type="file" style="display: none" ref="changeProfile" @change="changeProfiles" />
      </div>
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Email</label>
      <input class="form-control" placeholder="your-email@domain.com" readonly :value="userEmail" />
    </div>
    <div class="mb-3">
      <label class="form-label">New Password</label>
      <input class="form-control" type="password" value="password" :class="{ 'input-error': isUserPassword }"
        v-model="userPassword" />
    </div>
    <div class="mb-3">
      <label class="form-label">New Password Check</label>
      <input class="form-control" type="password" value="password" :class="{ 'input-error': isUserPasswordCheck }"
        v-model="userPasswordCheck" />
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Name</label>
      <input class="form-control" placeholder="Name" readonly :value="userName" />
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Address</label>
      <input class="form-control" placeholder="Address" :class="{ 'input-error': isUserAddress }"
        v-model="userAddress" />
    </div>
    <div class="mt-3 mb-3">
      <label class="form-label">Tel</label>
      <input class="form-control" placeholder="Tel" :class="{ 'input-error': isUserTel }" v-model="userTel" />
    </div>
    <div class="form-footer text-end">
      <button class="btn btn-primary btn-block mb-5" @click="profileModify">수정</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { userModify } from "@/api/user"

export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      userPasswordCheck: "",
      userName: "",
      userAddress: "",
      userTel: "",

      isUserPassword: false,
      isUserPasswordCheck: false,
      isUserTel: false,
      isUserAddress: false,

      selimg: "",
      profile: '',
    }
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("commonStore", ["setLoading", "alertMessage", "alertClose"]),
    ...mapActions("userStore", ["setUserInfo"]),

    profileImageModify() {
      console.log("call profileImageModify");
      this.$refs.changeProfile.click();
    },

    changeProfiles() {
      this.profile = this.$refs.changeProfile.files;
      this.selimg = URL.createObjectURL(this.profile[0]);
    },

    deleteProfile() {
      this.profile = '';
      this.selimg = '';
      this.$refs.changeProfile.value = '';
    },

    inputCheck() {
      if (this.userPassword !== this.userPasswordCheck) {
        this.isUserPassword = true
        this.isUserPasswordCheck = true
        return false
      }

      let check = true

      if (this.userPassword === "") {
        this.isUserPassword = true
        check = false
      } else this.isUserPassword = false
      if (this.userPasswordCheck === "") {
        this.isUserPasswordCheck = true
        check = false
      } else this.isUserPasswordCheck = false
      if (this.userAddress === "") {
        this.isUserAddress = true
        check = false
      } else this.isUserTel = false
      if (this.userTel === "") {
        this.isUserTel = true
        check = false
      } else this.isUserTel = false

      return check
    },

    async profileModify() {
      if (this.inputCheck()) {
        this.userInfo.userProfileImageUrl = undefined;

        let formData = new FormData()
        formData.append("userId", this.userInfo.userId)
        formData.append("userPassword", this.userPassword)
        formData.append("userAddress", this.userAddress)
        formData.append("userTel", this.userTel)
        console.log(this.profile)
        if (this.profile.length > 0) {
          const fileArray = Array.from(this.profile)
          fileArray.forEach((file) => formData.append("file", file))
        }

        await userModify(
          formData,
          async ({ data }) => {
            console.log(data)
            if (data.message === "success") {
              await this.setUserInfo(data.userInfo);    // 수정과 동시에 새로운 정보를 받아와야지 타이밍이 맞음
              // 파일삭제 -> 파일참조 -> 새로운 파일경로 수신 (순서가 안맞음)
              this.alertMessage({ alertTitle: "회원정보 수정 성공!", alertMessage: "" });
              this.$router.go();
            } else {
              this.alertMessage({ alertTitle: "회원정보 수정 실패!", alertMessage: "잠시후 다시 시도해주세요." })
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
  },
  mounted() {
    console.log(this.userInfo)
    this.userEmail = this.userInfo.userEmail
    this.userName = this.userInfo.userName
    this.userAddress = this.userInfo.userAddress
    this.userTel = this.userInfo.userTel
    this.userProfileImageUrl = this.userInfo.userProfileImageUrl
  },
}
</script>

<style scoped>
.input-error {
  border-color: #d22d3d !important;
}

.thumbnail {
  margin-top: 5px;
}

.thumbnail img {
  width: 100px !important;
  margin-top: 5px;
  max-width: 100%;
}
</style>
