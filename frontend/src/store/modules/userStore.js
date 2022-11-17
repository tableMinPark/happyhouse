const userStore = {
  namespaced: true,
  state: {
    isLogin: true,
    userInfo: {
      userId: 1,
      userName: "박상민",
      userRegDt: "2022-12-24",
      userAddress: "부산시 강서구 송정동 1627-5",
      userTel: "010-5793-2055",
      userCode: 200,
      userCodeName: "일반회원",
      userProfileImageUrl: `http://${location.host}/assets/images/user/9.jpg`,
      userFollowing: 1,
      userFollower: 2,
    },


    // MyPage   
    isMyPage: false,
    pageId: '',
    

    noProfileImageUrl: `http://${location.host}/assets/images/dashboard/1.png`,
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_ISMYPAGE(state, isMyPage, pageId) {
      state.isMyPage = isMyPage;
      state.pageId = pageId;
    }
  },
  actions: {
    // context = Vuex
    setUserInfo(context, userInfo) {
      context.commit("SET_USERINFO", userInfo);
    },
    setIsMyPage(context, isMyPage, pageId){
      context.commit("SET_ISMYPAGE", isMyPage, pageId);
    }
  },
  // 저장소인 state 의 값을 외부에 노출시키는 방법
  // 그대로 또는 state 의 데이터의 변형을 처리한 후 결과를 return <== getters 는 return 이 있는 메소드들
  getters: {
    getUserInfo: function (state) {
      return state.userInfo;
    },
    getUserId: function (state) {
      return state.userInfo.userId;
    },
    getUserCode: function (state) {
      return state.userInfo.userCode;
    },
    getUserIsLogin: function(state) {
      return state.isLogin;
    },
    getIsMyPage: function(state){
      return state.isMyPage;
    }
  },
};

export default userStore;