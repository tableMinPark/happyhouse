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
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
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
  },
  actions: {
    async setUserInfo({ commit }, userInfo) {
      commit("SET_USER_INFO", userInfo);
    },
    // 토큰발급
    async userConfirm({ commit }, user) {
      // 로그인시 토큰만 받아옴
      await login(
        user,
        // 성공시 콜백
        ({ data }) => {
          if (data.message === "success") {
            // 토큰 수신
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // state 변경
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            // 토큰 저장
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
        // 실패시 콜백
        (error) => {
          console.log(error);
        }
      );
    },
    // 유저정보가져옴
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);

      await getUserInfo(
        decodeToken.userid,
        // 성공시 콜백
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
          }
        },
        // 실패시 콜백
        async (error) => {
          console.log(error);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    // 토큰 갱신
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        state.userInfo,
        // 성공시 콜백
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        // 실패시 콜백
        async (error) => {
          if (error.response.status === 401) {
            // db 토큰 제거
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
    // 로그인
    async userLogin({ dispatch, state }, user) {
      await dispatch("userConfirm", user);
      const token = sessionStorage.getItem("access-token");

      if (state.isLogin) {
        await dispatch("getUserInfo", token);
        store.dispatch("commonStore/alertMessage", {
          alertTitle: "로그인 성공!",
          alertMessage: `${state.userInfo.userName} 님 반갑습니다.`,
        });
        router.push({ name: "main" }).catch(() => {});
      } else {
        if (state.isLoginError) {
          store.dispatch("commonStore/alertMessage", {
            alertTitle: "로그인 실패!",
            alertMessage: "이메일 인증을 완료되지 않았습니다.",
          });
        } else {
          store.dispatch("commonStore/alertMessage", {
            alertTitle: "로그인 실패!",
            alertMessage: "아이디 또는 비밀번호가 일치하지 않습니다.",
          });
        }
      }
    },
    // 로그아웃
    async userLogout({ commit, state }) {
      await logout(
        state.userInfo.userId,
        ({ data }) => {
          if (data.message === "success") {
            // 플래그 변경
            commit("SET_USER_INFO", null);
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_VALID_TOKEN", false);

            // 토큰삭제
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("refresh-token");

            // alert
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "로그아웃 성공!",
              alertMessage: "",
            });
            router.push({ name: "main" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "로그아웃 실패!",
              alertMessage: "유저정보가 없습니다.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 비밀번호찾기
    async forgetPassword({ commit }, user) {
      await forgetPassword(
        user,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_IS_FORGET_PASSWORD_ERROR", false);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "비밀번호 찾기 성공!",
              alertMessage: "임시 비밀번호가 포함된 이메일을 전송했습니다. 이메일을 확인해주세요.",
            });
            router.push({ name: "login" }).catch(() => {});
          } else {
            commit("SET_IS_FORGET_PASSWORD_ERROR", true);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "비밀번호 찾기 실패!",
              alertMessage: "입력하신 정보와 일치하는 계정이 없습니다.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 회원가입
    async userRegister(context, user) {
      await userRegister(
        user,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "회원가입 성공!",
              alertMessage: `${user.userName} 님 반갑습니다.`,
            });
            router.push({ name: "login" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "회원가입 실패!",
              alertMessage: "잠시후 다시 시도해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 회원가입 인증
    async emailAuth(context, authCode) {
      await emailAUth(
        authCode,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "이메일 인증 성공!",
              alertMessage: `로그인이 가능합니다.`,
            });
            router.push({ name: "main" }).catch(() => {});
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "이메일 인증 실패!",
              alertMessage: "잠시후 다시 시도해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  // 저장소인 state 의 값을 외부에 노출시키는 방법
  // 그대로 또는 state 의 데이터의 변형을 처리한 후 결과를 return <== getters 는 return 이 있는 메소드들
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
    // 모달에서 mapstate 를 통해 참조가 안됨 왜? 그래서 getters 씀
    getUserId(state) {
      return state.userInfo.userId;
    },
    // 회원 구분을 받아옴 (codeName)
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
