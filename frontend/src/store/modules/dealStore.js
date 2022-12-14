import { registBookmark } from "@/api/bookmark";
import {
  searchByKeyword,
  searchByAddress,
  getOldDealList,
  getNowDealList,
  getReviewList,
  getChartList,
} from "@/api/deal";

import store from "@/store";

const dealStore = {
  namespaced: true,
  state: {
    houseList: [],
    houseInfo: {},
    nowDealList: [],
    reviewList: [],

    oldDealList: [],

    oldDealData: {},
  },
  mutations: {
    SET_HOUSE_LIST(state, houseList) {
      state.houseList = houseList;
    },
    SET_HOUSE_INFO(state, houseInfo) {
      state.houseInfo = houseInfo;
    },
    SET_REVIEW_LIST(state, reviewList) {
      state.reviewList = reviewList;
    },
    SET_OLD_DEAL_LIST(state, oldDealList) {
      state.oldDealList = oldDealList;
    },
    SET_NOW_DEAL_LIST(state, nowDealList) {
      state.nowDealList = nowDealList;
    },
    SET_OLD_DEAL_DATA(state, oldDealData) {
      state.oldDealData = oldDealData;
    },
  },
  actions: {
    setInit({ commit }) {
      commit("SET_HOUSE_LIST", []);
      commit("SET_HOUSE_INFO", []);
      commit("SET_REVIEW_LIST", []);
      commit("SET_OLD_DEAL_LIST", []);
      commit("SET_NOW_DEAL_LIST", []);
    },
    setDealReviewList({ commit }) {
      commit("SET_OLD_DEAL_LIST", []);
      commit("SET_NOW_DEAL_LIST", []);
      commit("SET_REVIEW_LIST", []);
    },
    // 관심 매물 등록
    async registBookmark({ state }, userId) {
      const params = {
        userId: userId,
        houseId: state.houseInfo.houseId,
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
    // 키워드 검색
    async searchByKeyword({ commit }, keyword) {
      if (keyword === "") {
        store.dispatch("commonStore/alertMessage", {
          alertTitle: "불러오기 실패!",
          alertMessage: "키워드가 입력되지 않았습니다.",
        });
        return;
      }
      await searchByKeyword(
        keyword,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_HOUSE_LIST", data.houseList);

            if (data.houseList.length > 0) {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `${keyword} 불러오기 성공!`,
                alertMessage: `${data.houseList.length}개의 건물이 조회되었습니다.`,
              });
            } else {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `${keyword} 불러오기 실패!`,
                alertMessage: "조회 된 건물정보가 없습니다.",
              });
            }
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
    },
    // 주소 검색
    async searchByAddress({ commit }, dongCode) {
      await searchByAddress(
        dongCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_HOUSE_LIST", data.houseList);

            if (data.houseList.length > 0) {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `불러오기 성공!`,
                alertMessage: `${data.houseList.length}개의 건물이 조회되었습니다.`,
              });
            } else {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `불러오기 실패!`,
                alertMessage: "조회 된 건물정보가 없습니다.",
              });
            }
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
    },

    setHouseInfo({ commit }, houseInfo) {
      commit("SET_HOUSE_INFO", houseInfo);
    },

    async getOldDealList({ commit }, houseId) {
      await getOldDealList(
        houseId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_OLD_DEAL_LIST", data.dealList);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getNowDealList({ commit }, houseId) {
      await getNowDealList(
        houseId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_NOW_DEAL_LIST", data.dealList);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getReviewList({ commit }, houseId) {
      await getReviewList(
        houseId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_REVIEW_LIST", data.reviewList);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getChartList({ commit }, payload) {
      await getChartList(
        payload,
        ({ data }) => {
          if (data.message === "success") {
            let oldDealData = {
              labels: data.labels,
              charterData: [],
              rentData: [],
              dealingData: [],
            };
            let ch = data.charterData;
            let re = data.rentData;
            let de = data.dealingData;

            let temp = 0;
            for (let i = 0; i < 12; i++) {
              if (ch[0] === undefined || ch[0].dealDate !== data.labels[i]) {
                oldDealData.charterData.push(temp);
              } else {
                let price = ch.shift().dealPrice;
                temp = price;
                oldDealData.charterData.push(price);
              }
            }

            temp = 0;
            for (let i = 0; i < 12; i++) {
              if (re[0] === undefined || re[0].dealDate !== data.labels[i]) {
                oldDealData.rentData.push(temp);
              } else {
                let price = re.shift().dealPrice;
                temp = price;
                oldDealData.rentData.push(price);
              }
            }
            // 매매
            temp = 0;
            for (let i = 0; i < 12; i++) {
              if (de[0] === undefined || de[0].dealDate !== data.labels[i]) {
                oldDealData.dealingData.push(temp);
              } else {
                let price = de.shift().dealPrice;
                temp = price;
                oldDealData.dealingData.push(price);
              }
            }

            commit("SET_OLD_DEAL_DATA", oldDealData);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  getters: {
    getDealId(state) {
      return state.houseInfo.houseId;
    },
  },
};

export default dealStore;
