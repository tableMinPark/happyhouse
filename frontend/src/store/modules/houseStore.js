import { registReview } from "@/api/review";
import { dealRegist, convertAddress, dealList } from "@/api/deal";

import store from "@/store";
import router from "@/routers/routers";

const houseStore = {
  namespaced: true,
  state: {
    // HouseList 에서 참조할 매물 리스트 데이터
    dealList: [],
    totalListItemCount: 0,

    // HouseInfo 에서 참조할 매물 데이터
    dealInfo: {},
  },
  mutations: {
    SET_DEAL_LIST: (state, dealList) => {
      state.dealList = dealList;
    },
    SET_TOTAL_LIST_ITEM_COUNT: (state, totalListItemCount) => {
      state.totalListItemCount = totalListItemCount;
    }

  },
  actions: {
    // 리뷰 등록
    async registReview(context, reviewInfo) {
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
    },

    // 컴포넌트에서 호출하는 함수 (주소확인)
    async registDeal({ dispatch }, dealInfo) {
      let address = `${dealInfo.houseSidoName} ${dealInfo.houseGugunName} ${dealInfo.houseDongName} ${dealInfo.houseJibun}`;
      await convertAddress(
        address, 
        // 좌표변환 성공
        async ({ data }) => {
          const documentList = JSON.parse(data.addressInfo).documents;

          if (data.message === "success" && documentList.length > 0){ 
            const address = documentList[0];
            const lat = address.y;
            const lng = address.x;  
            await dispatch("dealRegist", { dealInfo, lat, lng });
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "주소 확인 실패!",
              alertMessage: '올바르지 않은 주소입니다.',
            });      
          }
        },
        // 좌표변환 실패
        (error) => {
          console.log(error); 
        }
      );
    },

    // registDeal Actions 에서 호출하는 Actions (실 등록하는 함수)
    async dealRegist(context, { dealInfo, lat, lng }) {
      const formData = new FormData();
      formData.append("userId", dealInfo.userId);
      formData.append("houseName", dealInfo.houseName);
      formData.append("houseBuildYear", dealInfo.houseBuildYear);
      formData.append("dealContent", dealInfo.dealContent);
      formData.append("houseSidoCode", dealInfo.houseSidoCode);
      formData.append("houseSidoName", dealInfo.houseSidoName);
      formData.append("houseGugunCode", dealInfo.houseGugunCode);
      formData.append("houseGugunName", dealInfo.houseGugunName);
      formData.append("houseDongCode", dealInfo.houseDongCode);
      formData.append("houseDongName", dealInfo.houseDongName);
      formData.append("houseJibun", dealInfo.houseJibun);
      formData.append("houseLat", lat);
      formData.append("houseLng", lng);
      // 거래 분류 
      formData.append("code", dealInfo.code);
      if (dealInfo.code == "100") {
        formData.append("dealPrice", dealInfo.charterPrice);
      }
      else if (dealInfo.code == "200") {
        formData.append("dealPrice", dealInfo.rentPrice);
        formData.append("dealDeposit", dealInfo.rentDeposit);
      }
      else {
        formData.append("dealPrice", dealInfo.dealingPrice);
      }
      // 건물 분류       
      formData.append("houseCode", dealInfo.houseCode);
      formData.append("dealArea", dealInfo.dealArea);
      if (dealInfo.houseCode !== "300") {
        formData.append("dealFloor", dealInfo.dealFloor);
      }

      if (dealInfo.attachedFiles.length > 0) {
        const fileArray = Array.from(dealInfo.attachedFiles);
        fileArray.forEach((file) => formData.append("file", file));
      }

      await dealRegist(
        formData,
        ({ data }) => {
          if (data.message === "success"){
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "매물 등록 성공!",
              alertMessage: '',
            });
            router.go(-1);
          } else {
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "매물 등록 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
          
        },
        (error) => {
          console.error(error);
        }
      );
    },

    // 매물 수정
    async dealModify(context, dealInfo) {
      console.log(dealInfo);
    },

    // 매물 리스트
    async getDealList({ commit }, param) {
      await dealList(
        param,
        ({ data }) => {
          if (data.message === "success"){          
            commit("SET_DEAL_LIST", data.dealList.joinList);
            commit("SET_TOTAL_LIST_ITEM_COUNT", data.dealList.count);  
          } else {            
            store.dispatch("commonStore/alertMessage", {
              alertTitle: "매물 목록 조회 실패!",
              alertMessage: '잠시후 다시 시도 해주세요.',
            });
          }
        },
        (error) => {
          console.error(error);
        }
      ); 
    } 
    
  },
  getters: {
    // 모달에서 mapstate 를 통해 참조가 안됨 왜? 그래서 getters 씀
    getDealId(state) {
      return state.dealInfo.dealId;
    }
  }
};

export default houseStore;
