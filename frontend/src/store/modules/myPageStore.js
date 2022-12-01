import { getPageUserInfo, getFollowUserList, followingCheck, follow, unFollow } from "@/api/user";
import { getBookmarkList, deleteBookmark } from "@/api/bookmark";
import { getReviewList, deleteReview, modifyReview } from "@/api/review";

import store from "@/store";

const myPageStore = {
  namespaced: true,
  state: {
    isMyPage: false,
    isFollowing: false,
    pageId: null,
    myPageUserInfo: null,

    bookmarkList: [],

    reviewList: [],

    followingList: [],
  },
  mutations: {
    SET_IS_MYPAGE(state, isMyPage) {
      state.isMyPage = isMyPage;
    },
    SET_IS_FOLLOWING(state, isFollowing) {
      state.isFollowing = isFollowing;
    },
    SET_PAGEID(state, pageId) {
      state.pageId = pageId;
    },
    SET_BOOKMARK_LIST(state, bookmarkList) {
      state.bookmarkList = { ...bookmarkList };
    },
    SET_REVIEW_LIST(state, reviewList) {
      state.reviewList = { ...reviewList };
    },
    SET_MYPAGE_USER_INFO(state, myPageUserInfo) {
      state.myPageUserInfo = { ...myPageUserInfo };
    },
    SET_FOLLOWING_LIST(state, followingList) {
      state.followingList = { ...followingList };
    },
    SET_FOLLOW_COUNT(state, { pageIdFollowing, pageIdFollower }) {
      state.myPageUserInfo.following = pageIdFollowing;
      state.myPageUserInfo.follower = pageIdFollower;
    },
  },
  actions: {
    async setMyPageInit({ commit }, payload) {
      const userId = payload.userInfo.userId;
      const pageId = payload.pageId;
      const userInfo = payload.userInfo;
      const isMyPage = userId == pageId;

      if (isMyPage) {
        commit("SET_MYPAGE_USER_INFO", userInfo);
        commit("SET_IS_MYPAGE", isMyPage);
        commit("SET_PAGEID", pageId);
      } else {
        await getPageUserInfo(
          pageId,
          ({ data }) => {
            if (data.message === "success") {
              commit("SET_MYPAGE_USER_INFO", data.pageUserInfo);
              commit("SET_IS_MYPAGE", isMyPage);
              commit("SET_PAGEID", pageId);
            } else {
              commit("SET_MYPAGE_USER_INFO", null);
              commit("SET_IS_MYPAGE", false);
              commit("SET_PAGEID", null);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },

    async followingCheck({ commit, state }, userId) {
      const params = {
        userId: userId,
        pageId: state.pageId,
      };

      await followingCheck(
        params,
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
      );
    },

    async getBookmarkList({ commit, state }) {
      await getBookmarkList(
        state.pageId,
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
      );
    },

    async deleteBookmark({ state, dispatch }, dealId) {
      const params = {
        userId: state.pageId,
        dealId: dealId,
      };
      await deleteBookmark(
        params,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("userStore/checkBookmarking");
            dispatch("getBookmarkList");
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 삭제 성공!",
              alertMessage: "관심매물이 삭제되었습니다.",
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 삭제 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getReviewList({ commit, state }) {
      console.log(state);
      await getReviewList(
        state.pageId,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_REVIEW_LIST", data.reviewList);
          } else {
            console.log(data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async deleteReview({ dispatch }, reviewId) {
      await deleteReview(
        reviewId,
        ({ data }) => {
          if (data.message === "success") {
            dispatch("getReviewList");
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 삭제 성공!",
              alertMessage: "리뷰가 삭제되었습니다.",
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 삭제 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async modifyReview({ dispatch }, reviewInfo) {
      await modifyReview(
        reviewInfo,
        ({ data }) => {
          if (data.message === "success") {
            dispatch("getReviewList");
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 수정 성공!",
              alertMessage: "리뷰 수정되었습니다.",
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 수정 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getFollow({ commit, state }) {
      await getFollowUserList(
        state.pageId,
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
      );
    },

    async follow({ commit, state }, userId) {
      const params = {
        pageId: state.pageId,
        userId: userId,
      };
      if (userId === undefined) {
        this.$router.push({ name: "login" });
      }

      await follow(
        params,
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
      );
    },

    async unFollow({ commit, state }, userId) {
      const params = {
        pageId: state.pageId,
        userId: userId,
      };

      await unFollow(
        params,
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
      );
    },
  },
};

export default myPageStore;
