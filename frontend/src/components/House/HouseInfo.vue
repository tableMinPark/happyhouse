<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6" style="height: 100%">
        <div class="card">
          <div class="card-header pb-0">
            <h5>House Images</h5>
          </div>
          <div class="card-body">
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
                  <td>{{ house.houseName }}</td>
                </tr>
                <tr>
                  <th scope="col">주소</th>
                  <td>{{ houseAddress }}</td>
                </tr>
                <tr>
                  <th scope="col">거래</th>
                  <td>{{ dealKind }}</td>
                </tr>
                <tr v-if="deal.code == 200">
                  <th scope="col">보증금</th>
                  <td>{{ deal.dealDeposit }}</td>
                </tr>
                <tr>
                  <th scope="col">금액</th>
                  <td>{{ deal.dealPrice }}</td>
                </tr>
                <tr>
                  <th scope="col">면적</th>
                  <td>{{ house.houseArea }}</td>
                </tr>
                <tr>
                  <th scope="col">층</th>
                  <td>{{ house.houseArea }}</td>
                </tr>
                <tr>
                  <th scope="col">설명</th>
                  <td v-html="deal.dealContent"></td>
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
import ReviewList from "@/components/House/Module/ReviewList.vue"
import ReviewRegisterModal from "@/components/common/Modal/ReviewRegisterModal.vue"
import ReviewDetailAllModal from "@/components/common/Modal/ReviewDetailAllModal.vue"
import HouseCarousel from "@/components/House/Module/HouseCarousel.vue"
import { Modal } from "bootstrap"

import { dealDetail } from "@/api/deal"

import { mapActions, mapState } from "vuex"

export default {
  components: {
    ReviewList,
    ReviewRegisterModal,
    ReviewDetailAllModal,
    HouseCarousel,
  },
  data() {
    return {
      dealId: null,
      house: [], //집정보
      deal: [], //거래정보
      map: null,
      reviewRegisterModal: null,
      reviewDetailAllModal: null,
    }
  },
  methods: {
    initMap() {
      let mapContainer = document.querySelector("#kakao-map")
      let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      }
      this.map = new kakao.maps.Map(mapContainer, mapOption)
    },
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
    ...mapActions("dealStore", ["getReviewList", "getImgList"]),
  },

  computed: {
    dealKind: function () {
      if (this.deal.code == "100") return "전세"
      if (this.deal.code == "200") return "월세"
      return "매매"
    },
    houseAddress: function () {
      if (this.house.houseDongName == "undefined") return this.house.houseSidoName + " " + this.house.houseGugunName + " " + this.house.houseJibun
      return this.house.houseSidoName + " " + this.house.houseGugunName + " " + this.house.houseDongName + " " + this.house.houseJibun
    },
    ...mapState("dealStore", ["reviewList"]),
  },

  mounted() {
    this.dealId = this.$route.params.houseId
    this.getImgList(this.dealId)
    dealDetail(
      this.dealId,
      ({ data }) => {
        this.deal = data.dealList.dealDto
        this.house = data.dealList.houseDto
        console.log(this.house)
        this.getReviewList(this.house.houseId)
      },
      (error) => {
        console.error(error)
      }
    )

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
    this.reviewRegisterModal = new Modal(document.getElementById("reviewRegisterModal"))
    this.reviewDetailAllModal = new Modal(document.getElementById("reviewDetailAllModal"))
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
