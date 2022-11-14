import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import MainPage from '@/components/view/MainPage.vue'
import DealPage from '@/components/view/DealPage.vue'
import HouseInfoPage from '@/components/view/HouseInfoPage.vue'
import HouseListPage from '@/components/view/HouseListPage.vue'
import NoticePage from '@/components/view/NoticePage.vue'
import LoginPage from '@/components/view/LoginPage.vue'
import RegisterPage from '@/components/view/RegisterPage.vue'
import ForgetPasswordPage from '@/components/view/ForgetPasswordPage.vue'
import MyPage from '@/components/view/MyPage.vue'

import NormalMyPageBody from '@/components/MyPage/NormalMyPageBody.vue'
import CompanyMyPageBody from '@/components/MyPage/CompanyMyPageBody.vue'

// import ProfileAskPage from '@/components/MyPage/ProfileAskPage.vue'
// import ProfileBookmarkPage from '@/components/MyPage/ProfileBookmarkPage.vue'
// import ProfileHouseListPage from '@/components/MyPage/ProfileHouseListPage.vue'
// import ProfilePage from '@/components/MyPage/ProfilePage.vue'
// import ProfileModifyPage from '@/components/MyPage/ProfileModifyPage.vue'
// import ProfileReviewPage from '@/components/MyPage/ProfileReviewPage.vue'

import NoticeBody from "@/components/NoticePage/NoticeBody.vue";
import NoticeDetail from "@/components/NoticePage/NoticeDetail.vue";
import NoticeWrite from "@/components/NoticePage/NoticeWrite.vue";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/deal',            
            component: DealPage
        },
        {
            path: '/houselist',            
            component: HouseListPage
        },
        {
            path: '/houseinfo',           
            component: HouseInfoPage
           
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/register',
            component: RegisterPage
        },
        {
            path: '/forgetPassword',
            component: ForgetPasswordPage
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
            path: '/mypage',
            component: MyPage,
            children: [
                {
                    path: 'normal',
                    components :[
                        MyPage,
                        NormalMyPageBody,
                    ]
                },
                {
                    path: 'company',
                    components :[
                        MyPage,
                        CompanyMyPageBody,
                    ]
                }
            ]
        }
    ]
});