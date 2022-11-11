import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import MainPage from '@/components/view/MainPage.vue'
import DealPage from '@/components/view/DealPage.vue'
import HouseInfoPage from '@/components/view/HouseInfoPage.vue'
import NoticePage from '@/components/view/NoticePage.vue'
import LoginPage from '@/components/view/LoginPage.vue'
import MyPage from '@/components/view/MyPage.vue'

import AskPage from '@/components/MyPage/AskPage.vue'
import BookmarkPage from '@/components/MyPage/BookmarkPage.vue'
import HouseListPage from '@/components/MyPage/HouseListPage.vue'
import ProfilePage from '@/components/MyPage/ProfilePage.vue'
import ProfileModifyPage from '@/components/MyPage/ProfileModifyPage.vue'
import ReviewPage from '@/components/MyPage/ReviewPage.vue'

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
            path: '/houseinfo',            
            component: HouseInfoPage
        },
        {
            path: '/notice',
            component: NoticePage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/mypage',
            component: MyPage,
            children: [
                {
                    path: '',
                    component : BookmarkPage
                },
                {
                    path: 'ask',
                    component : AskPage
                },
                {
                    path: 'bookmark',
                    component : BookmarkPage
                },
                {
                    path: 'houselist',
                    component : HouseListPage
                },
                {
                    path: 'profile',
                    component : ProfilePage
                },
                {
                    path: 'profilemodify',
                    component : ProfileModifyPage
                },
                {
                    path: 'review',
                    component : ReviewPage
                },
            ]
        }
    ]
});