import { getPageUserInfo, getFollowUserList, followingCheck, follow, unFollow} from "@/api/user";

const myPageStore = {
  namespaced: true,
  state: {
    // 마이페이지 전역
    isMyPage: false,
    isFollowing: false,
    pageId: null,
    myPageUserInfo: null,

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
    SET_MYPAGE_USER_INFO(state, myPageUserInfo) {
      state.myPageUserInfo = {...myPageUserInfo};
    },
    SET_FOLLOWING_LIST(state, followingList) {
      state.followingList = {...followingList};
    }
  },
  actions: {
    // 마이페이지 정보 채우는 action
    async setMyPageInit({ commit }, payload){
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
    },

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

    // 팔로잉 확인하는 함수
    async followingCheck({ commit, state }, userId) {
      const params = {
        userId: userId,
        pageId: state.pageId 
      }

      console.log(params);

      await followingCheck( params,
        ({ data }) => {
          if (data.message === "success") {
            console.log(data);
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

    // 팔로우 함수
    async follow({ commit, state }, userId) {
      const params = {
        pageId: state.pageId, 
        userId: userId 
      }

      await follow( params,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_FOLLOWING", true);
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
          } else {
            commit("SET_IS_FOLLOWING", true);
          }
        },
        (error) => {
          console.log(error);
        }      
      )
    }
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
    }
  },
};

export default myPageStore;
