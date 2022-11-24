import Vue from "vue";
import App from "./App.vue";
import store from "@/store/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import LoadScript from "vue-plugin-load-script";
import VueFeather from "vue-feather";

Vue.use(LoadScript);
Vue.use(VueFeather);

// 호스트네임 전역선언
Vue.prototype.$hostname = `http://${location.host}`;
(Vue.prototype.$noProfileImageUrl = `http://${location.host}/assets/images/dashboard/1.png`),
  (Vue.prototype.$logoUrl = `http://${location.host}/assets/images/logo/logo.png`);

Vue.config.productionTip = false;

// 출력을 위한 전역 필터
import dayjs from "dayjs";
Vue.filter("formatDate", function (date) {
  return dayjs(date).format("YY-MM-DD");
});
Vue.filter("formatPrice", function (price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
Vue.filter("formatAddress", function (info) {
  return `${info.houseSidoName} ${info.houseGugunName} ${info.houseDongName} ${info.houseJibun}`;
});
Vue.filter("formatDeal", function (deal) {
  if (deal.code === "100") return "전세";
  else if (deal.code === "200") return "월세";
  else return "매매";
});
Vue.filter("formatCode", function (user) {
  if (user.code === "100") return "일반회원";
  else if (user.code === "200") return "기업회원";
  else return "관리자";
});

import router from "@/routers/routers.js";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
