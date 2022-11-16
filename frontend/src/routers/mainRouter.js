import MainPage from "@/components/view/MainPage.vue"
import DealPage from "@/components/view/DealPage.vue"

import HousePage from "@/components/view/HousePage.vue"

import NoticePage from "@/components/view/NoticePage.vue"
import LoginPage from "@/components/view/LoginPage.vue"
import RegisterPage from "@/components/view/RegisterPage.vue"
import ForgetPasswordPage from "@/components/view/ForgetPasswordPage.vue"

import NoticeBody from "@/components/NoticePage/NoticeBody.vue"
import NoticeDetail from "@/components/NoticePage/NoticeDetail.vue"
import NoticeWrite from "@/components/NoticePage/NoticeWrite.vue"

import HouseList from "@/components/House/HouseList.vue"
import HouseInfo from "@/components/House/HouseInfo.vue"
import HouseRegister from "@/components/House/HouseRegister.vue"
import HouseModify from "@/components/House/HouseModify.vue"

export default [
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
    component: HousePage,
    children: [
      {
        path: "",
        component: HouseList,
      },
      {
        path: "modify",
        name: "houseinfomodify",
        component: HouseModify,
      },

      {
        path: "register",
        component: HouseRegister,
      },
      {
        path: ":houseId",
        component: HouseInfo,
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
    path: "/notice",
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
