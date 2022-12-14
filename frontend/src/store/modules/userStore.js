import jwtDecode from "jwt-decode";
import router from "@/routers/routers";
import {
  login,
  getUserInfo,
  tokenRegeneration,
  logout,
  forgetPassword,
  userRegister,
  emailAUth,
} from "@/api/user";
import { getBookmarkList, registBookmark, deleteBookmark } from "@/api/bookmark";

import store from "@/store";

const userStore = {
  namespaced: true,
  state: {
    isAdmin: false,
    isLogin: false,
    isLoginError: false,
    isForgetPasswordError: false,
    userInfo: [],
    isValidToken: false,
    isBookmarking: false,
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_BOOKMARING(state, isBookmarking) {
      state.isBookmarking = isBookmarking;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = { ...userInfo };
    },
    SET_FOLLOW_COUNT(state, followCount) {
      state.userInfo.following = followCount.userIdFollowing;
      state.userInfo.follower = followCount.userIdFollower;
    },
    SET_IS_FORGET_PASSWORD_ERROR(state, isForgetPasswordError) {
      state.isForgetPasswordError = isForgetPasswordError;
    },
    SET_IS_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    async checkBookmarking({ commit, state }, dealId) {
      commit("SET_IS_BOOKMARING", false);
      await getBookmarkList(
        state.userInfo.userId,
        ({ data }) => {
          if (data.message === "success") {
            console.log(data.bookmarkList);
            for (let i = 0; i < data.bookmarkList.length; i++) {
              if (data.bookmarkList[i].dealId == dealId) {
                commit("SET_IS_BOOKMARING", true);
              }
            }
          } else {
            console.log(data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async registBookmark({ state, commit }, dealId) {
      const params = {
        userId: state.userInfo.userId,
        dealId: dealId,
      };
      await registBookmark(
        params,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "??????????????? ?????????????????????.",
            });
            commit("SET_IS_BOOKMARING", true);
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "????????? ?????? ?????? ????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async deleteBookmark({ state, commit }, dealId) {
      const params = {
        userId: state.userInfo.userId,
        dealId: dealId,
      };
      await deleteBookmark(
        params,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_BOOKMARING", false);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "??????????????? ?????????????????????.",
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "????????? ?????? ?????? ????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async setUserInfo({ commit }, userInfo) {
      commit("SET_USER_INFO", userInfo);
    },
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else if (data.message === "not email auth") {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);

      await getUserInfo(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            if (data.userInfo.code === "300") {
              commit("SET_IS_ADMIN", true);
            }
          }
        },
        // ????????? ??????
        async (error) => {
          console.log(error);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    // ?????? ??????
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        state.userInfo,
        // ????????? ??????
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        // ????????? ??????
        async (error) => {
          if (error.response.status === 401) {
            // db ?????? ??????
            await logout(
              state.userInfo.userid,

              ({ data }) => {
                data;
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" }).catch(() => {});
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    // ?????????
    async userLogin({ dispatch, state, commit }, user) {
      await dispatch("userConfirm", user);
      const token = sessionStorage.getItem("access-token");

      if (state.isLogin) {
        await dispatch("getUserInfo", token);
        store.dispatch("commonStore/alertMessage", {
          alertTitle: "????????? ??????!",
          alertMessage: `${state.userInfo.userName} ??? ???????????????.`,
        });
        if (state.userInfo.userCode === "300") commit("SET_IS_ADMIN", true);
        router.push({ name: "main" }).catch(() => {});
      } else {
        if (state.isLoginError) {
          store.dispatch("commonStore/alertMessage", {
            alertTitle: "????????? ??????!",
            alertMessage: "????????? ????????? ???????????? ???????????????.",
          });
        } else {
          store.dispatch("commonStore/alertMessage", {
            alertTitle: "????????? ??????!",
            alertMessage: "????????? ?????? ??????????????? ???????????? ????????????.",
          });
        }
      }
    },
    // ????????????
    async userLogout({ commit, state }) {
      await logout(
        state.userInfo.userId,
        ({ data }) => {
          if (data.message === "success") {
            // ????????? ??????
            commit("SET_USER_INFO", null);
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_VALID_TOKEN", false);
            commit("SET_IS_ADMIN", false);

            // ????????????
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("refresh-token");

            // alert
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ??????!",
              alertMessage: "",
            });
            commit("SET_IS_ADMIN", false);
            router.push({ name: "main" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ??????!",
              alertMessage: "??????????????? ????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // ??????????????????
    async forgetPassword({ commit }, user) {
      await forgetPassword(
        user,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_IS_FORGET_PASSWORD_ERROR", false);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "?????? ??????????????? ????????? ???????????? ??????????????????. ???????????? ??????????????????.",
            });
            router.push({ name: "login" }).catch(() => {});
          } else {
            commit("SET_IS_FORGET_PASSWORD_ERROR", true);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ?????? ??????!",
              alertMessage: "???????????? ????????? ???????????? ????????? ????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // ????????????
    async userRegister(context, user) {
      await userRegister(
        user,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ??????!",
              alertMessage: `${user.userName} ??? ???????????????.`,
            });
            router.push({ name: "login" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "???????????? ??????!",
              alertMessage: "????????? ?????? ??????????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // ???????????? ??????
    async emailAuth(context, authCode) {
      await emailAUth(
        authCode,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "????????? ?????? ??????!",
              alertMessage: `???????????? ???????????????.`,
            });
            router.push({ name: "main" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "????????? ?????? ??????!",
              alertMessage: "????????? ?????? ??????????????????.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  getters: {
    checkUserInfo(state) {
      return state.userInfo;
    },
    checkToken(state) {
      return state.isValidToken;
    },
    checkIsLogin(state) {
      return state.isLogin;
    },
    // ???????????? mapstate ??? ?????? ????????? ?????? ???? ????????? getters ???
    getUserId(state) {
      return state.userInfo.userId;
    },
    // ?????? ????????? ????????? (codeName)
    getCodeName(state) {
      let codeName = "";
      store.state.commonStore.userCodeList.forEach((item) => {
        if (state.userInfo.code === item.code) {
          codeName = item.codeName;
        }
      });
      return codeName;
    },
  },
};

export default userStore;
