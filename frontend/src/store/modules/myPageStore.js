const myPageStore = {
  namespaced: true,
  state: {
    isMyPage: false,
    pageId: "",
    myPageUserInfo: null
  },
  mutations: {
    SET_ISMYPAGE(state, isMyPage) {
      state.isMyPage = isMyPage;
    },
    SET_PAGEID(state, pageId) {
        state.pageId = pageId;
      },
    SET_USERINFO(state, myPageUserInfo) {
      state.myPageUserInfo = myPageUserInfo;
    },
  },
  actions: {
    setIsMyPage(context, isMyPage) {
      context.commit("SET_ISMYPAGE", isMyPage);
    },
    setPageId(context, pageId) {
        context.commit("SET_PAGEID", pageId);
    },
    setUserInfo(context, myPageUserInfo) {
      context.commit("SET_USERINFO", myPageUserInfo);
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
      return state.myPageUserInfo;
    },
    followingCheck: function (state) {
      return (userId) => {
        console.log(state.myPageUserInfo.userId + " " + userId)
        return false;
      }
    },
  },
};

export default myPageStore;
