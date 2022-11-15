import MainPage from "@/components/view/MainPage.vue"
import DealPage from "@/components/view/DealPage.vue"
import HouseInfoPage from "@/components/view/HouseInfoPage.vue"
import HouseListPage from "@/components/view/HouseListPage.vue"
import NoticePage from "@/components/view/NoticePage.vue"
import LoginPage from "@/components/view/LoginPage.vue"
import RegisterPage from "@/components/view/RegisterPage.vue"
import ForgetPasswordPage from "@/components/view/ForgetPasswordPage.vue"
import HouseInfoInput from "@/components/view/HouseInfoInput.vue"

import NoticeBody from "@/components/NoticePage/NoticeBody.vue"
import NoticeDetail from "@/components/NoticePage/NoticeDetail.vue"
import NoticeWrite from "@/components/NoticePage/NoticeWrite.vue"

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
    path: "/houselist",
    component: HouseListPage,
  },
  {
    path: "/houseinfo",
    component: HouseInfoPage,
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
  {
    path: "/houseInfoInput",
    name: "houseInfoInput",
    component: HouseInfoInput,
  },
]
