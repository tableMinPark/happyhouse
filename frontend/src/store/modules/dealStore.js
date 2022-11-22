import { registBookmark } from "@/api/bookmark";

import store from '@/store';

const dealStore = {
  namespaced: true,
  state: {    
    dealInfo: {
        dealId: 1025,
        houseName: "삼정그린코코아",
        houseAddress: "부산시 강서구 송정동 1627-5",
        houseBuildYear: 2021
    },
    reviewList: [
        {        
            userName: "박상민",
            reviewContent: "아이 좋심더 여기",
            reviewTraficRating: 1,
            reviewSafetyRating: 2,
            reviewStoreRating: 3,
        }
    ],
    
    isBookmarking: false
  },
  mutations: {
    SET_DEAL_INFO(state, dealInfo) {
      state.dealInfo = { ...dealInfo };
    },
    SET_IS_BOOKMARING(state, isBookmarking) {
    state.isBookmarking = isBookmarking;
    },
  },
  actions: {
     // 관심매물 등록
     async registBookmark({ state }, userId) {
        const params = {
          userId: userId,
          dealId: state.dealInfo.dealId
        };
  
        console.log("관심매물 등록");
        await registBookmark( params,
          ({ data }) => {
            if (data.message === "success") {        
              store.dispatch("commonStore/alertMessage", {
                alertTitle: "관심매물 등록 성공!",
                alertMessage: '관심매물로 등록되었습니다.',
              });
            } else {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: "관심매물 등록 실패!",
                alertMessage: '잠시후 다시 시도 해주세요.',
              });
            }
          },
          (error) => {
            console.log(error);
          }     
        )
      },
  },
};

export default dealStore;
