import Vue from "vue";
import VueRouter from "vue-router";

import store from '@/store';

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const isLogin = store.getters["userStore/getUserIsLogin"];

  console.log("로그인 상태 : " + isLogin);

  if (!isLogin) {
    router.push({ name: "login" });
  } else {
    next();
  }
}


// const onlyAuthUser = async (to, from, next) => {
//   const checkUserInfo = store.getters["memberStore/checkUserInfo"];
//   const checkToken = store.getters["memberStore/checkToken"];
//   let token = sessionStorage.getItem("access-token");
//   console.log("로그인 처리 전", checkUserInfo, token);

//   if (checkUserInfo != null && token) {
//     console.log("토큰 유효성 체크하러 가자!!!!");
//     await store.dispatch("memberStore/getUserInfo", token);
//   }
//   if (!checkToken || checkUserInfo === null) {
//     alert("로그인이 필요한 페이지입니다..");
//     // next({ name: "login" });
//     router.push({ name: "login" });
//   } else {
//     console.log("로그인 했다!!!!!!!!!!!!!.");
//     next();
//   }
// };


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
    component: MainPage,
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
        component: HouseModify,
      },

      {
        path: "register",
        name: "houseRegister",
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
      path: '/profile/:userId',
      name: "myPage",
      component: MyPage
  },

  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
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
        beforeEnter: onlyAuthUser,
        component: NoticeDetail,
      },
      {
        path: "write",
        name: "noticeWrite",
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