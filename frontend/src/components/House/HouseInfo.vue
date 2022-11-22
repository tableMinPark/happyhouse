<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6" style="height: 100%">
        <div class="card">
          <div class="card-header pb-0">
            <h5>House Images</h5>
          </div>
          <div class="card-body">
            <div class="owl-carousel owl-theme owl-loaded owl-drag" id="owl-carousel-14">
              <div class="owl-stage-outer owl-height">
                <div class="owl-stage" style="transform: translate3d(-3504px, 0px, 0px); transition: all 0s ease 0s; width: 12848px">
                  <div class="owl-item" v-for="(item, index) in imgList" :key="index">
                    <div class="item"><img :src="path + item" alt="" /></div>
                  </div>
                </div>
              </div>
              <div class="owl-nav disabled">
                <button type="button" role="presentation" class="owl-prev" data-bs-original-title="" title=""><span aria-label="Previous">‹</span></button
                ><button type="button" role="presentation" class="owl-next" data-bs-original-title="" title=""><span aria-label="Next">›</span></button>
              </div>
            </div>
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
            <review-list></review-list>
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
  </div>
</template>

<script>
import ReviewList from "@/components/House/Module/ReviewList.vue"
import ReviewRegisterModal from "@/components/common/Modal/ReviewRegisterModal.vue"

import { Modal } from "bootstrap"

import { dealDetail, imgList } from "@/api/deal"

export default {
  components: {
    ReviewList,
    ReviewRegisterModal,
  },
  data() {
    return {
      path: "http://localhost:8080/upload/",
      dealId: null,
      imgList: [],
      house: [], //집정보
      deal: [], //거래정보
      map: null,
      reviewRegisterModal: null,
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
  },

  mounted() {
    this.dealId = this.$route.params.houseId

    imgList(
      this.dealId,
      ({ data }) => {
        // console.log(data)
        this.imgList = data.imgList
        if (this.imgList.length == 0) this.imgList = ["deal/noImage.png"]
      },
      (error) => {
        console.error(error)
      }
    )
    dealDetail(
      this.dealId,
      ({ data }) => {
        this.deal = data.dealList.dealDto
        this.house = data.dealList.houseDto
      },
      (error) => {
        console.error(error)
      }
    )
    console.log(this.dealId)
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
