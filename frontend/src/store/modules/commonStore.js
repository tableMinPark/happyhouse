import { addressList } from "@/api/common";

const commonStore = {
  namespaced: true,
  state: {
    isLoading: false,

    accessAlert: false,
    alertTitle: '',
    alertMessage: '',

    sidoList: [],
    gugunList: [],
    dongList: [],

    noProfileImageUrl: `http://${location.host}/assets/images/dashboard/1.png`,
  },
  mutations: {    
    SET_IS_LOADING: (state, isLoading) => {
      state.isLoading = isLoading;
    },
    SET_ALERT_TITLE: (state, alertTitle) => {      
      state.alertTitle = alertTitle;
    },
    SET_ALERT_MESSAGE: (state, alertMessage) => {
      state.alertMessage = alertMessage;
    },
    SET_ACCESS_ALERT: (state, accessAlert) => {
      state.accessAlert = accessAlert;
    },
    SET_SIDO_LIST: (state, sidoList) => {
      state.sidoList = sidoList;
    },
    SET_GUGUN_LIST: (state, gugunList) => {
      state.gugunList = gugunList;
    },
    SET_DONG_LIST: (state, dongList) => {
      state.dongList = dongList;
    }
  },
  actions: {
    async setInit({ commit, dispatch }) {
      commit("SET_IS_LOADING", false);
      commit("SET_ALERT_TITLE", '');
      commit("SET_ALERT_MESSAGE", '');
      commit("SET_ACCESS_ALERT", false);
      await dispatch("getSido");
    },
    setLoading({ commit }, isLoading) {
      commit("SET_IS_LOADING", isLoading);
    },
    alertMessage({ commit }, payload ) {
      commit("SET_ALERT_TITLE", payload.alertTitle);
      commit("SET_ALERT_MESSAGE", payload.alertMessage);
      commit("SET_ACCESS_ALERT", true);
      setTimeout(() => { commit("SET_ACCESS_ALERT", false) }, 4000);
    },

    async getSido({ commit }) {
      // API 호출
      await addressList(
        0,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_SIDO_LIST", data.addressList);
          } else {
            console.log("시/도 불러오기 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },
    async getGugun({ commit }, sidoCode) {
      await addressList(
        sidoCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_GUGUN_LIST", data.addressList);
          } else {
            console.log("구/군 불러오기 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },
    async getDong({ commit }, dongCode) {
      await addressList(
        dongCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_DONG_LIST", data.addressList);
          } else {
            console.log("동 불러오기 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      )      
    }
  }
};

export default commonStore;
