import { login, findById, tokenRegeneration, logout } from "@/api/user";

const commonStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,

    // MyPage
    isMyPage: false,
    pageId: "",

    noProfileImageUrl: `http://${location.host}/assets/images/dashboard/1.png`,
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
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_IS_MYPAGE(state, isMyPage, pageId) {
      state.isMyPage = isMyPage;
      state.pageId = pageId;
    },
  },
  actions: {
    // context = Vuex
    setUserInfo({ commit }, userInfo) {
      commit("SET_USER_INFO", userInfo);
    },
    setIsMyPage({ commit }, isMyPage, pageId) {
      commit("SET_IS_MYPAGE", isMyPage, pageId);
    },

    // 토큰발금
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
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
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

      await findById(
        decodeToken.userid,
        // 성공시 콜백
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
          } else {
            console.log("유저정보가 없음");
          }
        },
        // 실패시 콜백
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
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
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
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
  },
  // 저장소인 state 의 값을 외부에 노출시키는 방법
  // 그대로 또는 state 의 데이터의 변형을 처리한 후 결과를 return <== getters 는 return 이 있는 메소드들
  getters: {
  },
};

export default commonStore;
