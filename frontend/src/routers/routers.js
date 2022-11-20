import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

Vue.use(VueRouter);

const authAccount = async () => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    return false;
  } else {
    return true;
  }
};
// 로그인되있으면 로그인이랑 회원가입 막음
const loginCheckFilter = (to, from, next) => {
  // 로그인체크함수
  const isLogin = store.getters["userStore/checkIsLogin"];
  if (isLogin) router.go(-1);
  else next();
}
const loginFilter = async (to, from, next) => {
  // 토큰 유효성 확인
  const authFlag = await authAccount();
  // 로그인 된 경우
  if (authFlag) next();
  else router.push({ name: "login" });
}
const compnayFilter = async (to, from, next) => {
  const authFlag = await authAccount();
  const adminFlag = store.getters["userStore/checkUserInfo"].code === "200" || store.getters["userStore/checkUserInfo"].code === "300";
  if (authFlag){    
    if (!adminFlag) {
      alert("일반회원은 접근이 불가능합니다.");
      router.go(-1);
    }
    else next();
  } 
  else router.push({ name: "login" }); 
}
const adminFilter = async (to, from, next) => {
  const authFlag = await authAccount();
  const adminFlag = store.getters["userStore/checkUserInfo"].code == "300";
  if (authFlag){    
    if (!adminFlag){
      alert("관리자만 접근이 가능합니다.");
      router.go(-1);
    }
    else next();
  } 
  else router.push({ name: "login" });
}


// 회원가입 인증
const emailAuther = async (to) => {
  const authCode = to.params.authCode;
  store.dispatch("userStore/emailAuth", authCode);
}

// 라우팅 //////////////////////////////////////////////////////////////////////////////

import MainPage from "@/components/view/MainPage.vue"
import DealPage from "@/components/view/DealPage.vue"

import HousePage from "@/components/view/HousePage.vue"

import LoginPage from "@/components/view/LoginPage.vue"
import RegisterPage from "@/components/view/RegisterPage.vue"
import ForgetPasswordPage from "@/components/view/ForgetPasswordPage.vue"

import MyPage from '@/components/view/MyPage.vue'

import NoticeBody from "@/components/Notice/NoticeBody.vue"
import NoticePage from "@/components/view/NoticePage.vue"
import NoticeDetail from "@/components/Notice/NoticeDetail.vue"
import NoticeWrite from "@/components/Notice/NoticeWrite.vue"

import HouseList from "@/components/House/HouseList.vue"
import HouseInfo from "@/components/House/HouseInfo.vue"
import HouseRegister from "@/components/House/HouseRegister.vue"
import HouseModify from "@/components/House/HouseModify.vue"

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage
  },
  {
    path: "/deal",
    name: "deal",
    component: DealPage,
  },
  {
    path: "/houseinfo",
    name: "houseInfo",
    component: HousePage,
    children: [
      {
        path: "",
        name: "houseList",
        component: HouseList,
      },
      {
        path: "modify",
        name: "houseModify",
        beforeEnter: compnayFilter,
        component: HouseModify,
      },

      {
        path: "register",
        name: "houseRegister",
        beforeEnter: compnayFilter,
        component: HouseRegister,
      },
      {
        path: ":houseId",
        name: "houseDetail",
        component: HouseInfo,
      },
    ],
  },    
  {
    path: '/email_auth/:authCode',
    beforeEnter: emailAuther
  },
  {
      path: '/profile/:userId',
      name: "myPage",
      beforeEnter: loginFilter,
      component: MyPage
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: loginCheckFilter,
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    beforeEnter: loginCheckFilter,
    component: RegisterPage,
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    beforeEnter: loginCheckFilter,
    component: ForgetPasswordPage,
  },
  {
    path: "/notice",
    name: "notice",
    component: NoticePage,
    children: [
      {
        path: "",
        name: "noticeBody",
        component: NoticeBody,
      },
      {
        path: ":noticeId",
        name: "noticeDetail",
        beforeEnter: loginFilter,
        component: NoticeDetail,
      },
      {
        path: "write",
        name: "noticeWrite",
        beforeEnter: adminFilter,
        component: NoticeWrite,
      },
    ],
  },
]


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;