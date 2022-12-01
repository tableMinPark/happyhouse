import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

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
const loginCheckFilter = (to, from, next) => {
  const isLogin = store.getters["userStore/checkIsLogin"];
  if (isLogin) router.go(-1);
  else next();
};

const loginFilter = async (to, from, next) => {
  const authFlag = await authAccount();
  if (authFlag) next();
  else router.push({ name: "login" });
};

const compnayFilter = async (to, from, next) => {
  const authFlag = await authAccount();
  const adminFlag =
    store.getters["userStore/checkUserInfo"].code === "200" ||
    store.getters["userStore/checkUserInfo"].code === "300";
  if (authFlag) {
    if (!adminFlag) {
      alert("일반회원은 접근이 불가능합니다.");
      router.go(-1);
    } else next();
  } else router.push({ name: "login" });
};

const adminFilter = async (to, from, next) => {
  const authFlag = await authAccount();
  const adminFlag = store.getters["userStore/checkUserInfo"].code == "300";
  if (authFlag) {
    if (!adminFlag) {
      alert("관리자만 접근이 가능합니다.");
      router.go(-1);
    } else next();
  } else router.push({ name: "login" });
};

const emailAuther = async (to) => {
  const authCode = to.params.authCode;
  store.dispatch("userStore/emailAuth", authCode);
};

import MainPage from "@/components/view/MainPage.vue";
import DealPage from "@/components/view/DealPage.vue";

import HousePage from "@/components/view/HousePage.vue";

import LoginPage from "@/components/view/LoginPage.vue";
import RegisterPage from "@/components/view/RegisterPage.vue";
import ForgetPasswordPage from "@/components/view/ForgetPasswordPage.vue";

import MyPage from "@/components/view/MyPage.vue";

import NoticeBody from "@/components/Notice/NoticeBody.vue";
import NoticePage from "@/components/view/NoticePage.vue";
import NoticeDetail from "@/components/Notice/NoticeDetail.vue";
import NoticeWrite from "@/components/Notice/NoticeWrite.vue";

import HouseList from "@/components/House/HouseList.vue";
import HouseInfo from "@/components/House/HouseInfo.vue";
import HouseRegister from "@/components/House/HouseRegister.vue";
import HouseModify from "@/components/House/HouseModify.vue";

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
        path: "list",
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
    path: "/email_auth/:authCode",
    beforeEnter: emailAuther,
  },
  {
    path: "/profile/:userId",
    name: "myPage",
    beforeEnter: loginFilter,
    component: MyPage,
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
        path: "list",
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
