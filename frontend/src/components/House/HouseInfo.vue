<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6" style="height: 100%">
        <div class="card">
          <div class="card-header pb-0">
            <h5>House Images</h5>
          </div>
          <div class="card-body p-4">
            <house-carousel></house-carousel>
          </div>
        </div>
        <div class="card reviewList">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h5 class="card-title">Reviews ({{ reviewList.length }})</h5>

            <button v-if="isLogin" class="btn btn-primary" @click.prevent="showReviewRegister">
              <feather type="edit-3" size="20" />
            </button>
          </div>
          <div v-if="reviewList.length != 0" class="card-body">
            <review-list v-for="(review, index) in reviewList" :key="index" :idx="index"></review-list>
          </div>
          <div v-else class="card-body">
            <h5 class="text-center" style="font-weight: 500;">작성된 리뷰가 없습니다.</h5>
          </div>
        </div>
      </div>
      <div class="col-6" style="height: 100%">
        <div class="card" style="height: 70%">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h5 class="card-title">Infomation</h5>

            <!-- 핫트 버튼 >< -->
            <div v-if="isLogin" class="me-3 mt-2">
              <a v-if="!isBookmarking" @click="registBookmark(dealInfo.dealId)">
                <i class="fa fa-heart-o fa-2x" size="30"></i>
              </a>
              <a v-else @click="deleteBookmark(dealInfo.dealId)">
                <i class="fa fa-heart fa-2x" size="30" style="color: red;"></i>
              </a>
            </div>

          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <colgroup>
                <col span="1" style="width: 20%" />
                <col span="1" style="width: 80%" />
              </colgroup>

              <tbody>
                <tr>
                  <th scope="col">매물 명</th>
                  <td>{{ houseInfo.houseName }}</td>
                </tr>
                <tr>
                  <th scope="col">주소</th>
                  <td>{{ houseInfo | formatAddress }}</td>
                </tr>
                <tr>
                  <th scope="col">거래</th>
                  <td>{{ dealInfo | formatDeal }}</td>
                </tr>
                <tr v-if="dealInfo.code == '200' || dealInfo.code == '100'">
                  <th scope="col">보증금</th>
                  <td>{{ dealInfo.dealDeposit | formatPrice }} 만원</td>
                </tr>
                <tr v-if="dealInfo.code != '100'">
                  <th scope="col">금액</th>
                  <td>{{ parseInt(dealInfo.dealPrice) | formatPrice }} 만원</td>
                </tr>
                <tr>
                  <th scope="col">면적</th>
                  <td>{{ dealInfo.dealArea }}</td>
                </tr>
                <tr>
                  <th scope="col">층</th>
                  <td>{{ dealInfo.dealFloor }} 층</td>
                </tr>
                <tr>
                  <th scope="col">설명</th>
                  <td v-html="dealInfo.dealContent"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header pb-0">
            <h5 class="card-title">Map</h5>
          </div>
          <div class="card-body">
            <div id="kakao-map"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <review-register-modal v-on:call-parent-register-close="closeReviewRegister"></review-register-modal>
    <review-detail-all-modal v-on:call-parent-detail-all-close="closeReviewDetailAll"></review-detail-all-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ReviewList from "@/components/House/Module/ReviewList.vue"
import ReviewRegisterModal from "@/components/common/Modal/ReviewRegisterModal.vue"
import ReviewDetailAllModal from "@/components/common/Modal/ReviewDetailAllModal.vue"
import HouseCarousel from "@/components/House/Module/HouseCarousel.vue"
import { Modal } from "bootstrap";

export default {
  components: {
    ReviewList,
    ReviewRegisterModal,
    ReviewDetailAllModal,
    HouseCarousel
  },
  data() {
    return {
      dealId: '',
      reviewRegisterModal: null,
      reviewDetailAllModal: null,
    }
  },
  computed: {
    ...mapState("houseStore", ["imgList", "houseInfo", "dealInfo", "reviewList"]),
    ...mapState("userStore", ["isLogin", "userInfo", "isBookmarking"]),

  },
  methods: {
    ...mapActions("houseStore", ["getImgList", "dealDetail", "getReviewList"]),
    ...mapActions("userStore", ["checkBookmarking", "registBookmark", "deleteBookmark"]),

    showReviewRegister() {
      this.reviewRegisterModal.show()
    },
    async closeReviewRegister() {
      await this.getReviewList(this.houseInfo.houseId);
      this.reviewRegisterModal.hide()
    },
    showReviewDetailAllModal() {
      this.reviewDetailAllModal.show()
    },
    closeReviewDetailAll() {
      this.reviewDetailAllModal.hide()
    },
    initMap() {
      let mapContainer = document.querySelector("#kakao-map")
      let mapOption = {
        center: new kakao.maps.LatLng(this.houseInfo.houseLat, this.houseInfo.houseLng),
        level: 3,
      }
      this.map = new kakao.maps.Map(mapContainer, mapOption);

      let position = new kakao.maps.LatLng(this.houseInfo.houseLat, this.houseInfo.houseLng)
      let marker = new kakao.maps.Marker({ position })
      this.map.setCenter(position);

      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; text-align: center;">${this.houseInfo.houseName}</div>`,
      })

      // 마우스 오버
      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(this.map, marker)
      })
      // 마우스 아웃
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close()
      })
      let $this = this;
      // 마우스 클릭
      kakao.maps.event.addListener(marker, "click", function () {
        $this.$router.push({ name: "deal", params: { searchWord: $this.houseInfo.houseName } })
      })

      marker.setMap(this.map)
    }
  },
  async mounted() {
    this.dealId = this.$route.params.houseId
    await this.getImgList(this.dealId);
    await this.dealDetail(this.dealId);
    await this.getReviewList(this.houseInfo.houseId);
    await this.checkBookmarking(this.dealId);

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script")
      script.setAttribute("src", "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b17c3ca2cf51dc08967913607c029db4&libraries=services")
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap)
      })
      document.head.appendChild(script)
    } else {
      this.initMap()
    }
    this.reviewRegisterModal = new Modal(document.getElementById("reviewRegisterModal"));
    this.reviewDetailAllModal = new Modal(document.getElementById("reviewDetailAllModal"));
  },
}
</script>

<style>
i,
a {
  cursor: pointer;
}

.reviewList {
  max-height: 750px;
  overflow-y: scroll;
}

#kakao-map {
  height: 450px;
}

#houseInfoImage {
  height: 500px;
}
</style>