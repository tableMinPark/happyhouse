const commonStore = {
  namespaced: true,
  state: {
    isLoading: false,

    accessAlert: false,
    alertTitle: '',
    alertMessage: '',



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
  },
  actions: {
    setInit({ commit }) {
      commit("SET_IS_LOADING", false);
      commit("SET_ALERT_TITLE", '');
      commit("SET_ALERT_MESSAGE", '');
      commit("SET_ACCESS_ALERT", false);
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
  }
};

export default commonStore;
