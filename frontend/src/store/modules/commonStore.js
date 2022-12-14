import { addressList, getCodeByGroupCode } from "@/api/common"

const commonStore = {
  namespaced: true,
  state: {
    isLoading: false,

    accessAlert: false,
    alertTitle: "",
    alertMessage: "",

    sidoList: [],
    gugunList: [],
    dongList: [],

    userCodeList: [],
    dealCodeList: [],
    houseCodeList: [],
  },
  mutations: {
    SET_IS_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
    },
    SET_ALERT_TITLE: (state, alertTitle) => {
      state.alertTitle = alertTitle
    },
    SET_ALERT_MESSAGE: (state, alertMessage) => {
      state.alertMessage = alertMessage
    },
    SET_ACCESS_ALERT: (state, accessAlert) => {
      state.accessAlert = accessAlert
    },
    SET_SIDO_LIST: (state, sidoList) => {
      state.sidoList = sidoList
    },
    SET_GUGUN_LIST: (state, gugunList) => {
      state.gugunList = gugunList
    },
    SET_DONG_LIST: (state, dongList) => {
      state.dongList = dongList
    },
    SET_USER_CODE_LIST: (state, userCodeList) => {
      state.userCodeList = userCodeList
    },
    SET_DEAL_CODE_LIST: (state, dealCodeList) => {
      state.dealCodeList = dealCodeList
    },
    SET_HOUSE_CODE_LIST: (state, houseCodeList) => {
      state.houseCodeList = houseCodeList
    },
  },
  actions: {
    async setInit({ commit, dispatch }) {
      commit("SET_IS_LOADING", false)
      commit("SET_ALERT_TITLE", "")
      commit("SET_ALERT_MESSAGE", "")
      commit("SET_ACCESS_ALERT", false)
      await dispatch("getSido")
    },
    setLoading({ commit }, isLoading) {
      commit("SET_IS_LOADING", isLoading)
    },
    alertMessage({ commit }, payload) {
      commit("SET_ALERT_TITLE", payload.alertTitle)
      commit("SET_ALERT_MESSAGE", payload.alertMessage)
      commit("SET_ACCESS_ALERT", true)
      setTimeout(async () => {
        commit("SET_ACCESS_ALERT", false)
      }, 4000)
    },
    initAddressList({ commit }) {
      commit("SET_GUGUN_LIST", [])
      commit("SET_DONG_LIST", [])
    },
    async getSido({ commit }) {
      // API 호출
      await addressList(
        0,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_SIDO_LIST", data.addressList)
          } else {
            console.log("시/도 불러오기 실패")
          }
        },
        (error) => {
          console.log(error)
        }
      )
    },
    async getGugun({ commit }, sidoCode) {
      await addressList(
        sidoCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_GUGUN_LIST", data.addressList)
          } else {
            console.log("구/군 불러오기 실패")
          }
        },
        (error) => {
          console.log(error)
        }
      )
    },
    async getDong({ commit }, dongCode) {
      await addressList(
        dongCode,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_DONG_LIST", data.addressList)
          } else {
            console.log("동 불러오기 실패")
          }
        },
        (error) => {
          console.log(error)
        }
      )
    },
    async getCode({ commit }) {
      await getCodeByGroupCode(
        "100",
        ({ data }) => {
          commit("SET_USER_CODE_LIST", data.codeList)
        },
        (error) => {
          console.log(error)
        }
      )
      await getCodeByGroupCode(
        "200",
        ({ data }) => {
          commit("SET_DEAL_CODE_LIST", data.codeList)
        },
        (error) => {
          console.log(error)
        }
      )
      await getCodeByGroupCode(
        "300",
        ({ data }) => {
          commit("SET_HOUSE_CODE_LIST", data.codeList)
        },
        (error) => {
          console.log(error)
        }
      )
    },
  },
}

export default commonStore
