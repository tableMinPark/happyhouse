<template>
  <div class="pt-5 p-3">
    <form class="theme-form login-form">
      <h4>회원가입</h4>
      <h6>Create your account</h6>

      <div class="form-builder-header-1 mb-4">
        <ul class="nav nav-primary justify-content-center">
          <li class="nav-item" @click="codeToggle"><a class="nav-link m-r-5" :class="{ active: code == '100' }"
              style="border-radius: 5px">일반회원</a></li>
          <li class="nav-item" @click="codeToggle"><a class="nav-link m-r-5" :class="{ active: code == '200' }"
              style="border-radius: 5px">기업회원</a></li>
        </ul>
      </div>

      <div class="form-group">
        <label>Name</label>
        <div class="small-group">
          <div class="input-group">
            <span class="input-group-text"><i class="icon-user"></i></span>
            <input class="form-control" :class="{ 'input-error': isUserName }" type="text" placeholder="Name"
              v-model="userName" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Email</label>
        <div class="input-group">
          <span class="input-group-text"><i class="icon-email"></i></span>
          <input class="form-control" :class="{ 'input-error': isUserEmail }" type="email"
            placeholder="your-email@domain.com" @change="emailCheck" v-model="userEmail" />
        </div>
        <div v-show="popupEmail" class="popover fade show bs-popover-end"
          style="margin: 0px; position: absolute; inset: 0px auto auto 0px; transform: translate(400px, 10px)"
          data-popper-placement="right">
          <div class="popover-arrow" style="position: absolute; top: 0px; transform: translate(0px, 15px)"></div>
          <h3 class="popover-header"></h3>
          <div class="popover-body">사용 불가능한 이메일</div>
        </div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="icon-lock"></i></span>
          <input class="form-control" :class="{ 'input-error': isUserPassword }" type="password" placeholder="*********"
            v-model="userPassword" />
        </div>
      </div>
      <div class="form-group">
        <label>Password Check</label>
        <div class="input-group">
          <span class="input-group-text"><i class="icon-lock"></i></span>
          <input class="form-control" :class="{ 'input-error': isUserPasswordCheck }" @change="passwordCheck"
            type="password" placeholder="*********" v-model="userPasswordCheck" />
        </div>

        <div v-show="popupPassword" class="popover fade show bs-popover-end"
          style="margin: 0px; position: absolute; inset: 0px auto auto 0px; transform: translate(400px, 10px)"
          data-popper-placement="right">
          <div class="popover-arrow" style="position: absolute; top: 0px; transform: translate(0px, 15px)"></div>
          <h3 class="popover-header"></h3>
          <div class="popover-body">비밀번호 불일치</div>
        </div>
      </div>
      <div class="form-group">
        <label>Tel</label>
        <div class="input-group">
          <span class="input-group-text"><i class="icofont icofont-iphone"></i></span>
          <input class="form-control" :class="{ 'input-error': isUserTel }" type="text" placeholder="010-1234-5678"
            v-model="userTel" />
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-xl-4 col-sm-12 col-md-12 mb-2">
            <label class="form-label">시 / 도</label>
            <select class="form-select form-control" :class="{ 'input-error': isSelectedSido }" v-model="selectedSido"
              @change="getGugunList">
              <option v-for="(sido, index) in sidoList" :key="`sido-${index}`" :value="sido">{{ sido.name }}
              </option>
            </select>
          </div>
          <div class="col-xl-4 col-sm-12 col-md-12 mb-2">
            <label class="form-label">구 / 군</label>
            <select class="form-select form-control" :class="{ 'input-error': isSelectedGugun }" v-model="selectedGugun"
              @change="getDongList">
              <option v-for="(gugun, index) in gugunList" :key="`gugun-${index}`" :value="gugun">{{ gugun.name }}
              </option>
            </select>
          </div>
          <div class="col-xl-4 col-sm-12 col-md-12 mb-2">
            <label class="form-label">동</label>
            <select class="form-select form-control" :class="{ 'input-error': isSelectedDong }" v-model="selectedDong">
              <option v-for="(dong, index) in dongList" :key="`dong-${index}`" :value="dong">{{ dong.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-md-12 mb-2">
            <label class="form-label">상세주소</label>
            <input class="form-control" :class="{ 'input-error': isDetailAddress }" type="text" placeholder="상세 주소"
              v-model="detailAddress" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <a class="btn btn-primary btn-block" @click="register">회원가입</a>
      </div>
    </form>
  </div>
</template>

<script>
import { emailCheck } from "@/api/user"
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      code: "100",
      userName: "",
      userEmail: "",
      userPassword: "",
      userPasswordCheck: "",
      userTel: "",
      selectedSido: "",
      selectedGugun: "",
      selectedDong: "",
      detailAddress: "",

      isUserName: false,
      isUserEmail: false,
      isUserPassword: false,
      isUserPasswordCheck: false,
      isUserTel: false,
      isSelectedSido: false,
      isSelectedGugun: false,
      isSelectedDong: false,
      isDetailAddress: false,

      popupEmail: false,
      popupPassword: false,
    }
  },
  computed: {
    ...mapState("commonStore", ["sidoList", "gugunList", "dongList"]),
  },
  mounted() {
    this.initAddressList()
  },
  methods: {
    ...mapActions("userStore", ["userRegister"]),
    ...mapActions("commonStore", ["initAddressList", "getSido", "getGugun", "getDong"]),
    codeToggle() {
      if (this.code === "100") {
        this.code = "200"
      } else if (this.code === "200") {
        this.code = "100"
      }
    },

    async emailCheck() {
      if (this.userEmail !== "") {
        await emailCheck(this.userEmail, ({ data }) => {
          if (data.message === "success") {
            this.popupEmail = false
            this.isUserEmail = false
            // 가능
          } else {
            this.popupEmail = true
            this.isUserEmail = true
          }
        })
      } else {
        this.popupEmail = false
        this.isUserEmail = false
      }
    },

    passwordCheck() {
      if (this.userPassword !== this.userPasswordCheck) {
        this.popupPassword = true
        this.isUserPassword = true
        this.isUserPasswordCheck = true
      } else {
        this.popupPassword = false
        this.isUserPassword = false
        this.isUserPasswordCheck = false
      }
    },

    inputCheck() {
      if (this.popupPassword || this.popupEmail) {
        return false
      }

      let check = true

      if (this.userName === "") {
        this.isUserName = true
        check = false
      } else this.isUserName = false
      if (this.userEmail === "") {
        this.isUserEmail = true
        check = false
      } else this.isUserEmail = false
      if (this.userPassword === "") {
        this.isUserPassword = true
        check = false
      } else this.isUserPassword = false
      if (this.userPasswordCheck === "") {
        this.isUserPasswordCheck = true
        check = false
      } else this.isUserPasswordCheck = false
      if (this.userTel === "") {
        this.isUserTel = true
        check = false
      } else this.isUserTel = false
      if (this.selectedSido === "") {
        this.isSelectedSido = true
        check = false
      } else this.isSelectedSido = false
      if (this.selectedGugun === "") {
        this.isSelectedGugun = true
        check = false
      } else this.isSelectedGugun = false
      if (this.selectedDong === "") {
        this.isSelectedDong = true
        check = false
      } else this.isSelectedDong = false
      if (this.detailAddress === "") {
        this.isDetailAddress = true
        check = false
      } else this.isDetailAddress = false

      return check
    },

    async register() {
      if (this.inputCheck()) {
        const user = {
          userEmail: this.userEmail,
          userPassword: this.userPassword,
          userName: this.userName,
          userAddress: `${this.selectedSido.name} ${this.selectedGugun.name} ${this.selectedDong.name}`,
          userTel: this.userTel,
          code: this.code,
        }
        await this.userRegister(user)
      }
    },
    async getGugunList() {
      this.selectedGugun = ""
      this.selectedDong = ""
      await this.getGugun(this.selectedSido.code)
    },
    async getDongList() {
      this.selectedDong = ""
      await this.getDong(this.selectedGugun.code)
    },
  },
}
</script>

<style scoped>
.input-error {
  border-color: #d22d3d !important;
}
</style>
