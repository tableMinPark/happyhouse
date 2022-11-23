import { registBookmark } from "@/api/bookmark";
import {
  searchByKeyword,
  searchByAddress,
  getOldDealList,
  getNowDealList,
  getReviewList,
  getImgList,
  getChartList,
} from "@/api/deal";

import store from "@/store";

const dealStore = {
  namespaced: true,
  state: {
    houseList: [],
    houseInfo: {},
    oldDealList: [], // 과거순부터 순서대로
    nowDealList: [],
    reviewList: [],
    imgList: [],
    isBookmarking: false,

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
    SET_IMG_LIST(state, imgList) {
      state.imgList = imgList;
    },
    SET_OLD_DEAL_LIST(state, oldDealList) {
      state.oldDealList = oldDealList;
    },
    SET_NOW_DEAL_LIST(state, nowDealList) {
      state.nowDealList = nowDealList;
    },
    SET_IS_BOOKMARING(state, isBookmarking) {
      state.isBookmarking = isBookmarking;
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
      commit("SET_IMG_LIST", []);
      commit("SET_OLD_DEAL_LIST", []);
      commit("SET_NOW_DEAL_LIST", []);
      commit("SET_IS_BOOKMARING", false);
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
    // 현재 선택된 집 정보를 가져옴
    setHouseInfo({ commit }, houseInfo) {
      commit("SET_HOUSE_INFO", houseInfo);
    },
    // 선택한 집의 거래내역 (거래된 내역)
    async getOldDealList({ commit }, houseId) {
      await getOldDealList(
        houseId,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_OLD_DEAL_LIST", data.dealList);
          } else {
            console.log("거래된 내역이 없음");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 선택한 집의 거래내역 (현재 거래중인 내역)
    async getNowDealList({ commit }, houseId) {
      await getNowDealList(
        houseId,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_NOW_DEAL_LIST", data.dealList);
          } else {
            console.log("거래중인 내역이 없음");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getImgList({ commit }, dealId) {
      getImgList(
        dealId,
        ({ data }) => {
          console.log("리뷰 리스트 : " + data.imgList);
          commit("SET_IMG_LIST", data.imgList);
          if (data.imgList.length == 0)
            commit("SET_IMG_LIST", ["deal/noImage.png"]);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    // 해당 집에 대한 리뷰
    async getReviewList({ commit }, houseId) {
      await getReviewList(
        houseId,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            console.log("리뷰 리스트 : " + data.reviewList);
            commit("SET_REVIEW_LIST", data.reviewList);
          } else {
            console.log("리뷰 리스트 없음");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // 차트 생성
    async getChartList({ commit }, payload) {
      await getChartList(
        payload,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            console.log("차트 데이터 리드성공");
            console.log(data.chartList);

            // 차트 데이터 생성
            let oldDealData = {
              labels: [],
              dealingData: [],
            };
            // 하나하나 까면서 정리
            data.chartList.forEach((chartData) => {
              oldDealData.labels.push(chartData.dealDate);
              oldDealData.dealingData.push(chartData.dealPrice);
            });

            console.log(oldDealData);

            commit("SET_OLD_DEAL_DATA", oldDealData);
          } else {
            console.log("차트 데이터 리드실패");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default dealStore;
