import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    router.push({ name: "login" });
  } else {
    next();
  }
};


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
        beforeEnter: onlyAuthUser,
        component: HouseModify,
      },

      {
        path: "register",
        name: "houseRegister",
        beforeEnter: onlyAuthUser,
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
        beforeEnter: onlyAuthUser,
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