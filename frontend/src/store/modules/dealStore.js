import { registBookmark } from "@/api/bookmark";
import { searchByKeyword, searchByAddress } from "@/api/deal";

import store from "@/store";

const dealStore = {
  namespaced: true,
  state: {
    dealList: [],
    dealInfo: [],
    reviewList: [],

    markerList: [],

    isBookmarking: false,
  },
  mutations: {
    SET_DEAL_LIST(state, dealList) {
      state.dealList = { ...dealList };
    },
    SET_DEAL_INFO(state, dealInfo) {
      state.dealInfo = { ...dealInfo };
    },
    SET_REVIEW_LIST(state, reviewList) {
      state.reviewList = { ...reviewList };
    },
    SET_IS_BOOKMARING(state, isBookmarking) {
      state.isBookmarking = isBookmarking;
    },
  },
  actions: {
    // 관심 매물 등록
    async registBookmark({ state }, userId) {
      const params = {
        userId: userId,
        dealId: state.dealInfo.dealId,
      };
      await registBookmark(
        params,
        ({ data }) => {
          if (data.message === "success") {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 등록 성공!",
              alertMessage: "관심매물로 등록되었습니다.",
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "관심매물 등록 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // 키워드 기준 집 리스트
    async searchByKeyword({ commit, state }, keyword) {
      await searchByKeyword(
        keyword,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_DEAL_LIST", data.dealList);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: `${keyword} 불러오기 성공!`,
              alertMessage: "",
            });
            console.log(state.dealList);
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "불러오기 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
      this.dealInfoToggle = true;
    },

    // 주소 (동) 기준 집 리스트 
    async searchByAddress({ commit, state }, dongCode) {
      await searchByAddress(
        dongCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_DEAL_LIST", data.dealList);
            store.dispatch("commonStore/alertMessage", {
              alertTitle: `매물 불러오기 성공!`,
              alertMessage: "",
            });
            console.log(state.dealList);
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "불러오기 실패!",
              alertMessage: "잠시후 다시 시도 해주세요.",
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
      this.dealInfoToggle = true;
    },

    // 선택한 집의 거래내역 (거래완료 / 거래중 분리해서 리스트로 저장)
    async searchDealList({ commit }, house_id) {
      // houseId 기준으로 모든 거래내역 뽑음
    }
  },
};

export default dealStore;
