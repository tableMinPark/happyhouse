import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import bookmarkStore from "@/store/modules/bookmarkStore";
import dealStore from "@/store/modules/dealStore";
import followStore from "@/store/modules/followStore";
import noticeStore from "@/store/modules/noticeStore";
import reviewStore from "@/store/modules/reviewStore";
import userStore from "@/store/modules/userStore";
import myPageStore from "@/store/modules/myPageStore";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        bookmarkStore,
        dealStore,
        followStore,
        noticeStore,
        reviewStore,
        userStore,
        myPageStore
      },
      plugins: [
        createPersistedState({
          storage: sessionStorage,
        }),
      ],
});