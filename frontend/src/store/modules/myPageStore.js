import { getPageUserInfo, getFollowUserList, followingCheck, follow, unFollow } from "@/api/user";
import { getBookmarkList, deleteBookmark } from "@/api/bookmark";
import { getReviewList, deleteReview, modifyReview } from "@/api/review";

import store from '@/store';

const myPageStore = {
  namespaced: true,
  state: {
    // 마이페이지 전역
    isMyPage: false,
    isFollowing: false,
    pageId: null,
    myPageUserInfo: null,

    // 관심매물
    bookmarkList: [],

    // 리뷰
    reviewList: [],

    // 팔로잉탭
    followingList: []

    
  },
  mutations: {
    SET_IS_MYPAGE(state, isMyPage) {
      state.isMyPage = isMyPage;
    },
    SET_IS_FOLLOWING(state, isFollowing){
      state.isFollowing = isFollowing;
    },
    SET_PAGEID(state, pageId) {
        state.pageId = pageId;
    },
    SET_BOOKMARK_LIST(state, bookmarkList) {
      state.bookmarkList = { ...bookmarkList }
    },
    SET_REVIEW_LIST(state, reviewList) {
      state.reviewList = { ...reviewList }
    },
    SET_MYPAGE_USER_INFO(state, myPageUserInfo) {
      state.myPageUserInfo = { ...myPageUserInfo };
    },
    SET_FOLLOWING_LIST(state, followingList) {
      state.followingList = { ...followingList };
    },
    SET_FOLLOW_COUNT(state, { pageIdFollowing, pageIdFollower }){
      state.myPageUserInfo.following = pageIdFollowing;
      state.myPageUserInfo.follower = pageIdFollower;
    }
  },
  actions: {


    ///////////////////////////////////////////// 마이페이지 초기화 /////////////////////////////////////////
    // 마이페이지 정보 채우는 action
    async setMyPageInit({ commit }, payload){
      
      store.dispatch("commonStore/setLoading", true);
      const userId = payload.userInfo.userId;
      const pageId = payload.pageId;
      const userInfo = payload.userInfo;
      const isMyPage = userId == pageId

      // 로그인한 계정의 페이지이면
      if (isMyPage) {
        commit("SET_MYPAGE_USER_INFO", userInfo);
        commit("SET_IS_MYPAGE", isMyPage);
        commit("SET_PAGEID", pageId); 
      } 
      // 다른 계정의 페이지이면 (새로받아옴)
      else {
        await getPageUserInfo(pageId, 
          ({ data }) => {
            if (data.message === "success") {
              commit("SET_MYPAGE_USER_INFO", data.pageUserInfo);
              commit("SET_IS_MYPAGE", isMyPage);
              commit("SET_PAGEID",  pageId); 
            } else {
              commit("SET_MYPAGE_USER_INFO", null);
              commit("SET_IS_MYPAGE", false);
              commit("SET_PAGEID", null);
            }
          },
          (error) => {
            console.log(error);
          }
        )
      }      
      store.dispatch("commonStore/setLoading", false);
    },

    // 팔로잉 확인하는 함수
    async followingCheck({ commit, state }, userId) {
      const params = {
        userId: userId,
        pageId: state.pageId 
      }

      await followingCheck( params,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_FOLLOWING", data.isFollowing);
          } else {
            commit("SET_IS_FOLLOWING", false);
          }
        },
        (error) => {
          console.log(error);
        }      
      )
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////// 관심매물 탭 /////////////////////////////////////////
    // 관심매물 리스트
    async getBookmarkList({ commit, state }) {
      console.log("관심매물 리스트");
      await getBookmarkList( state.pageId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_BOOKMARK_LIST", data.bookmarkList);
          } else {
            console.log(data.message);
          }
        },
        (error) => {
          console.log(error);
        }     
      )
    },
    // 관심매물 삭제
    async deleteBookmark({ dispatch }, bookmarkId) {
      console.log("관심매물 삭제");
      store.dispatch("commonStore/setLoading", true);
      await deleteBookmark( bookmarkId, 
        ({ data }) => {
          if (data.message === "success") {
            dispatch("getBookmarkList");
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 삭제 성공!",
              alertMessage: '관심매물이 삭제되었습니다.',
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 삭제 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
        },
        (error) => {
          console.log(error);
        }     
      )
      store.dispatch("commonStore/setLoading", false); 
    },   
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////// 리뷰관리 탭 /////////////////////////////////////////
    // 리뷰 리스트 
    async getReviewList({ commit, state }) {
      console.log("리뷰 리스트");
      await getReviewList( state.pageId,
        ({ data }) => {
          console.log(data)
          if (data.message === "success") {
            commit("SET_REVIEW_LIST", data.reviewList);
          } else {
            console.log(data.message);
          }
        },
        (error) => {
          console.log(error);
        }     
      )
    },
    // 리뷰 삭제
    async deleteReview({ dispatch }, reviewId) {
      console.log("리뷰 삭제");
      store.dispatch("commonStore/setLoading", true);
      await deleteReview( reviewId,
        ({ data }) => {
          if (data.message === "success") {
            dispatch("getReviewList");
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 삭제 성공!",
              alertMessage: '리뷰가 삭제되었습니다.',
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 삭제 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
        },
        (error) => {
          console.log(error);
        }     
      )
      store.dispatch("commonStore/setLoading", false); 
    },
    
    // 리뷰 수정
    async modifyReview({ dispatch }, reviewInfo) {
      console.log("리뷰 수정");
      store.dispatch("commonStore/setLoading", true);
      await modifyReview( reviewInfo,
        ({ data }) => {
          if (data.message === "success") {
            dispatch("getReviewList");            
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 수정 성공!",
              alertMessage: '리뷰 수정되었습니다.',
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 수정 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
        },
        (error) => {
          console.log(error);
        }     
      )
      store.dispatch("commonStore/setLoading", false); 
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////// 친구 탭 ////////////////////////////////////////////////
    // 팔로잉 리스트 받아오는 함수
    async getFollow({ commit, state }){
      await getFollowUserList( state.pageId, 
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_FOLLOWING_LIST", data.followList);
          } else {
            commit("SET_FOLLOWING_LIST", null);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },

    // 팔로우 함수
    async follow({ commit, state }, userId) {
      const params = {
        pageId: state.pageId, 
        userId: userId 
      }
      if (userId === undefined) {
        this.$router.push({ name: "login" })
      }

      await follow( params,
        async ({ data }) => {
          if (data.message === "success") {  
            commit("SET_IS_FOLLOWING", true);
            commit("SET_FOLLOW_COUNT", data.followCount);
            store.commit("userStore/SET_FOLLOW_COUNT", data.followCount);
          } else {
            commit("SET_IS_FOLLOWING", false);
          }
        },
        (error) => {
          console.log(error);
        }      
      )

    },

    // 언팔로우 함수
    async unFollow({ commit, state }, userId) {
      const params = {
        pageId: state.pageId, 
        userId: userId 
      }

      await unFollow( params,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_FOLLOWING", false);
            commit("SET_FOLLOW_COUNT", data.followCount);
            store.commit("userStore/SET_FOLLOW_COUNT", data.followCount);
          } else {
            commit("SET_IS_FOLLOWING", true);
          }
        },
        (error) => {
          console.log(error);
        }      
      )
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
};

export default myPageStore;
