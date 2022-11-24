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
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h5 class="card-title">Reviews</h5>

            <button class="btn btn-primary" @click.prevent="showReviewRegister">
              <feather type="file-text" size="18" />
            </button>
          </div>
          <div class="card-body">
            <review-list v-if="reviewList.length != 0"></review-list>
            <div v-else>작성된 리뷰가 없습니다.</div>
            <div style="float: right; cursor: pointer">
              <p @click="showReviewDetailAllModal">+ 전체보기</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" style="height: 100%">
        <div class="card" style="height: 70%">
          <div class="card-header pb-0">
            <h5 class="card-title">Infomation</h5>
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
import { Modal } from "bootstrap"

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

  },
  methods: {
    ...mapActions("houseStore", ["getImgList", "dealDetail", "getReviewList"]),

    showReviewRegister() {
      this.reviewRegisterModal.show()
    },
    closeReviewRegister() {
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
        center: new kakao.maps.LatLng(37.55931174210629, 127.00434608141744),
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
      // 마우스 클릭
      kakao.maps.event.addListener(marker, "click", function () {
        console.log("click")
      })

      marker.setMap(this.map)
    }
  },
  async mounted() {
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

    this.dealId = this.$route.params.houseId
    console.log(this.dealId);
    await this.getImgList(this.dealId);
    console.log(this.imgList);
    await this.dealDetail(this.dealId);
    console.log(this.dealInfo);
    console.log(this.houseInfo);
    await this.getReviewList(this.houseInfo.houseId);


    this.reviewRegisterModal = new Modal(document.getElementById("reviewRegisterModal"));
    this.reviewDetailAllModal = new Modal(document.getElementById("reviewDetailAllModal"));
  },
}
</script>

<style>
#kakao-map {
  height: 450px;
}

#houseInfoImage {
  height: 500px;
}
</style>