import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import dealStore from "@/store/modules/dealStore";
import noticeStore from "@/store/modules/noticeStore";
import userStore from "@/store/modules/userStore";
import houseStore from "@/store/modules/houseStore";
import myPageStore from "@/store/modules/myPageStore";
import commonStore from "@/store/modules/commonStore";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dealStore,
        noticeStore,
        userStore,
        houseStore,
        myPageStore,
        commonStore
      },
      plugins: [
        createPersistedState({
          storage: sessionStorage,
        }),
      ],
});