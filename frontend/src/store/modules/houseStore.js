import { registReview } from "@/api/review";

import store from "@/store";

const houseStore = {
  namespaced: true,
  state: {
    // HouseList 에서 참조할 매물 리스트 데이터
    dealList: [

    ],
    // HouseInfo 에서 참조할 매물 데이터
    dealInfo: {
      dealId: 1025,
      houseId: 2,
      houseName: "삼정그린코코아",
      houseAddress: "부산시 강서구 송정동 1627-5",
      houseBuildYear: 2021
    },
  },
  mutations: {

  },
  actions: {
    // 리뷰 등록
    async registReview(context, reviewInfo) {
      console.log("리뷰 등록");
      store.dispatch("commonStore/setLoading", true);
      console.log(reviewInfo)
      await registReview( reviewInfo,
        ({ data }) => {
          if (data.message === "success") {    
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 등록 성공!",
              alertMessage: '리뷰가 등록되었습니다.',
            });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "리뷰 등록 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
        },
        (error) => {
          console.log(error);
        }     
      )
      store.dispatch("commonStore/setLoading", false); 
    },
  },
  getters: {
    // 모달에서 mapstate 를 통해 참조가 안됨 왜? 그래서 getters 씀
    getDealId(state) {
      return state.dealInfo.dealId;
    }
  }
};

export default houseStore;
