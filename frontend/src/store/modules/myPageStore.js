const myPageStore = {
  namespaced: true,
  state: {
    isMyPage: false,
    pageId: "",
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
  },
  mutations: {
    SET_ISMYPAGE(state, isMyPage) {
      state.isMyPage = isMyPage;
    },
    SET_PAGEID(state, pageId) {
        state.pageId = pageId;
      },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    setIsMyPage(context, isMyPage) {
      context.commit("SET_ISMYPAGE", isMyPage);
    },
    setPageId(context, pageId) {
        context.commit("SET_PAGEID", pageId);
    },
    setUserInfo(context, userInfo) {
      context.commit("SET_USERINFO", userInfo);
    },
  },
  // 저장소인 state 의 값을 외부에 노출시키는 방법
  // 그대로 또는 state 의 데이터의 변형을 처리한 후 결과를 return <== getters 는 return 이 있는 메소드들
  getters: {
    getIsMyPage: function (state) {
      return state.isMyPage;
    },
    getPageId: function (state) {
      return state.pageId;
    },
    getUserInfo: function (state) {
      return state.userInfo;
    },
    followingCheck: function (state, userId) {
      console.log(this.userInfo.userId + " " + userId);
      return true;
    },
  },
};

export default myPageStore;
