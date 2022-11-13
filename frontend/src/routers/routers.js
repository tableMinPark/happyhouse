import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import MainPage from "@/components/view/MainPage.vue";
import DealPage from "@/components/view/DealPage.vue";
import HouseInfoPage from "@/components/view/HouseInfoPage.vue";
import NoticePage from "@/components/view/NoticePage.vue";
import LoginPage from "@/components/view/LoginPage.vue";
import RegisterPage from "@/components/view/RegisterPage.vue";
import ForgetPasswordPage from "@/components/view/ForgetPasswordPage.vue";
import MyPage from "@/components/view/MyPage.vue";

import AskPage from "@/components/MyPage/AskPage.vue";
import BookmarkPage from "@/components/MyPage/BookmarkPage.vue";
import HouseListPage from "@/components/MyPage/HouseListPage.vue";
import ProfilePage from "@/components/MyPage/ProfilePage.vue";
import ProfileModifyPage from "@/components/MyPage/ProfileModifyPage.vue";
import ReviewPage from "@/components/MyPage/ReviewPage.vue";

import CharterPage from "@/components/HouseInfoPage/CharterPage.vue";
import DealingPage from "@/components/HouseInfoPage/DealingPage.vue";
import RentPage from "@/components/HouseInfoPage/RentPage.vue";

import NoticeBody from "@/components/NoticePage/NoticeBody.vue";
import NoticeDetail from "@/components/NoticePage/NoticeDetail.vue";
import NoticeWrite from "@/components/NoticePage/NoticeWrite.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/deal",
      component: DealPage,
    },
    {
      path: "/houseinfo",
      component: HouseInfoPage,
      children: [
        {
          path: "",
          component: CharterPage,
        },
        {
          path: "charter",
          name: "charter",
          component: CharterPage,
        },
        {
          path: "rent",
          name: "rent",
          component: RentPage,
        },
        {
          path: "dealing",
          name: "dealing",
          component: DealingPage,
        },
      ],
    },
    {
      path: "/notice",
      component: NoticePage,
      children: [
        {
          path: "",
          name: "noticeBody",
          component: NoticeBody,
        },
        {
          path: "detail/:num",
          name: "noticeDetail",
          component: NoticeDetail,
        },
        {
          path: "write",
          name: "noticeWrite",
          component: NoticeWrite,
        },
      ],
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
      path: "/forgetPassword",
      component: ForgetPasswordPage,
    },
    {
      path: "/mypage",
      component: MyPage,
      children: [
        {
          path: "",
          component: BookmarkPage,
        },
        {
          path: "ask",
          component: AskPage,
        },
        {
          path: "bookmark",
          component: BookmarkPage,
        },
        {
          path: "houselist",
          component: HouseListPage,
        },
        {
          path: "profile",
          component: ProfilePage,
        },
        {
          path: "profilemodify",
          component: ProfileModifyPage,
        },
        {
          path: "review",
          component: ReviewPage,
        },
      ],
    },
  ],
});
