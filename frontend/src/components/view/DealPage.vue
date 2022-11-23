<template>
  <div>
    <div class="container-fluid">
      <basic-header name="실거래가"></basic-header>
    </div>
    <div class="container-fluid map-wrapper">
      <!-- map div -->
      <div class="row">
        <div id="kakao-map"></div>
        <div class="wrapper container-fluid">
          <div id="search-wrapper" class="row">
            <div class="container-fruid">
              <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2">
                <div class="info-block">
                  <h6>
                    <feather type="search" size="15" class="pe-2" />검색종류를
                    선택하세요
                  </h6>
                </div>
              </div>
              <div class="card shadow shadow-showcase p-3 mb-1 text-center">
                <div class="container-fluid">
                  <!-- 검색 종류 선택 START -->
                  <div class="row">
                    <div class="col-6 pt-2">
                      <div class="form-group custom-radio-ml">
                        <div class="radio radio-primary">
                          <input id="search-radio-keyword" name="search-radio" checked type="radio" value="A"
                            v-model="searchType" />
                          <label for="search-radio-keyword" class="form-check-label ps-2">키워드 검색</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 pt-2">
                      <div class="form-group custom-radio-ml">
                        <div class="radio radio-primary">
                          <input id="search-radio-address" class="radio radio-primary" name="search-radio" type="radio"
                            value="K" v-model="searchType" />
                          <label for="search-radio-address" class="form-check-label ps-2">주소 기준 검색</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 검색 종류 선택 END -->
                  <!-- 동, 키워드 검색 START -->
                  <div v-show="searchType == 'A'" class="row">
                    <div class="col-10 pe-0 d-flex">
                      <input type="text" class="form-control" placeholder="동, 키워드" v-model="keyword" />
                    </div>
                    <div class="col-2">
                      <button type="button" @click="keywordSearch" class="btn btn-primary ps-2 pe-2">
                        <feather type="search" size="15" />
                      </button>
                    </div>
                  </div>
                  <!-- 동, 키워드 검색 END -->
                  <!-- 주소 검색 START -->
                  <div v-show="searchType == 'K'" class="row">
                    <div class="col-10 pe-0 d-flex">
                      <select id="si" class="form-select me-1" v-model="selectedSido" @change="getGugunList">
                        <option v-for="(sido, index) in sidoList" :key="`sido-${index}`" :value="sido">
                          {{ sido.name }}
                        </option>
                      </select>
                      <select id="gugun" class="form-select me-1" v-model="selectedGugun" @change="getDongList">
                        <option v-for="(gugun, index) in gugunList" :key="`gugun-${index}`" :value="gugun">
                          {{ gugun.name }}
                        </option>
                      </select>
                      <select id="dong" class="form-select" v-model="selectedDong">
                        <option v-for="(dong, index) in dongList" :key="`dong-${index}`" :value="dong">
                          {{ dong.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-2">
                      <button @click="addressSearch" type="button" class="btn btn-primary ps-2 pe-2">
                        <feather type="search" size="15" />
                      </button>
                    </div>
                  </div>
                  <!-- 주소검색 END -->
                </div>
              </div>
            </div>
            <div>
              <div class="card">
                <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-2 pt-3"
                  id="headingFour">
                  <div class="info-block">
                    <button @click="() => { houseInfoToggle = !houseInfoToggle }" class="btn btn-link text-white">
                      <h6>검색된 건물 ({{ houseList.length }})</h6>
                    </button>
                  </div>
                </div>
                <div v-show="houseInfoToggle & isSelected">
                  <div class="container-fruid">
                    <div class="card shadow shadow-showcase mb-1">
                      <div class="container card-body p-3">
                        <div class="row">
                          <div class="d-flex justify-content-between">
                            <h5>{{ houseInfo.houseName }}</h5>
                            <!-- <a v-if="userInfo.userId !== undefined" @click="registBookmark(userInfo.userId)">
                              <i v-if="isBookmarking" class="fa fa-heart fa-2x" size="30"></i>
                              <i v-else class="fa fa-heart-o fa-2x"></i>
                            </a> -->
                          </div>
                          <p>{{ houseInfo | formatAddress }}</p>
                          <p>{{ houseInfo.houseBuildYear }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="card shadow shadow-showcase mb-1">
                      <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2">
                        <div class="info-block">
                          <h6>리뷰</h6>
                        </div>
                      </div>
                      <div v-if="reviewList.length === 0" class="container-fruid card-body">
                        <h6>등록된 리뷰가 없습니다.</h6>
                      </div>
                      <div v-else class="container-fruid card-body">
                        <div class="row">
                          <div class="col-5">
                            <div class="media p-1">
                              <img class="img-50 img-fluid m-r-20 rounded-circle" alt src="assets/images/user/2.png" />
                              <div class="media-body mt-2">
                                <h6 class="d-block">
                                  {{ reviewList[0].userName }}
                                </h6>
                                <p class="d-block">
                                  {{ reviewList[0].userRegDt | formatDate }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-7">
                            <div class="row text-end">
                              <div class="rating-container">
                                <div class="br-wrapper br-theme-fontawesome-stars">
                                  <div class="br-widget">
                                    <feather type="truck" size="15" class="pe-2" />
                                    <a :class="{
                                      'br-selected br-current':
                                        1 <=
                                        reviewList[0].reviewTraficRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        2 <=
                                        reviewList[0].reviewTraficRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        3 <=
                                        reviewList[0].reviewTraficRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        4 <=
                                        reviewList[0].reviewTraficRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        5 <=
                                        reviewList[0].reviewTraficRating,
                                    }"></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row text-end">
                              <div class="rating-container">
                                <div class="br-wrapper br-theme-fontawesome-stars">
                                  <div class="br-widget">
                                    <feather type="home" size="15" class="pe-2" />
                                    <a :class="{
                                      'br-selected br-current':
                                        1 <=
                                        reviewList[0].reviewSafetyRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        2 <=
                                        reviewList[0].reviewSafetyRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        3 <=
                                        reviewList[0].reviewSafetyRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        4 <=
                                        reviewList[0].reviewSafetyRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        5 <=
                                        reviewList[0].reviewSafetyRating,
                                    }"></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row text-end">
                              <div class="rating-container">
                                <div class="br-wrapper br-theme-fontawesome-stars">
                                  <div class="br-widget">
                                    <feather type="shopping-cart" size="15" class="pe-2" />
                                    <a :class="{
                                      'br-selected br-current':
                                        1 <=
                                        reviewList[0].reviewStoreRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        2 <=
                                        reviewList[0].reviewStoreRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        3 <=
                                        reviewList[0].reviewStoreRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        4 <=
                                        reviewList[0].reviewStoreRating,
                                    }"></a>
                                    <a :class="{
                                      'br-selected br-current':
                                        5 <=
                                        reviewList[0].reviewStoreRating,
                                    }"></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-12">
                            <h6 class="text-center" v-html="reviewList[0].reviewContent">
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card shadow shadow-showcase mb-2">
                      <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2">
                        <div class="info-block">
                          <h6>실거래가</h6>
                        </div>
                      </div>

                      <deal-chart :oldDealData="oldDealData"></deal-chart>

                      <div v-if="oldDealList.length === 0" class="container-fruid card-body">
                        <h6>등록된 실거래 정보가 없습니다.</h6>
                      </div>
                      <div v-else class="container-fruid card-body p-0 pb-2">
                        <div class="row">
                          <div class="col-12">
                            <div class="col-sm-12 col-lg-12 col-xl-12">
                              <div class="table-responsive">
                                <table class="table">
                                  <colgroup>
                                    <col span="1" style="width: 25%" />
                                    <col span="1" style="width: 40%" />
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 15%" />
                                  </colgroup>
                                  <thead class="table-primary">
                                    <tr>
                                      <th scope="col">거래일</th>
                                      <th scope="col">거래가격</th>
                                      <th scope="col">면적</th>
                                      <th scope="col">층수</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(deal, index) in oldDealList" :key="`old-${index}`">
                                      <td>{{ deal.dealDate | formatDate }}</td>
                                      <td><span v-if="deal.dealCode === 200">{{ deal.dealDeposit }} / </span><span>{{
                                          deal.dealPrice | formatPrice
                                      }}</span></td>
                                      <td>{{ deal.dealArea }}</td>
                                      <td>{{ deal.dealFloor }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card shadow shadow-showcase mb-2">
                      <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2">
                        <div class="info-block">
                          <h6>매물</h6>
                        </div>
                      </div>
                      <div class="container-fruid card-body p-0 pb-2">
                        <div class="row">
                          <div class="col-12">
                            <div class="col-sm-12 col-lg-12 col-xl-12">
                              <div class="table-responsive">
                                <table class="table">
                                  <colgroup>
                                    <col span="1" style="width: 25%" />
                                    <col span="1" style="width: 40%" />
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 15%" />
                                  </colgroup>
                                  <thead class="table-primary">
                                    <tr>
                                      <th scope="col">거래일</th>
                                      <th scope="col">거래가격</th>
                                      <th scope="col">면적</th>
                                      <th scope="col">층수</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(deal, index) in nowDealList" :key="`now-${index}`">
                                      <td>{{ deal.dealDate | formatDate }}</td>
                                      <td><span v-if="deal.dealCode === 200">{{ deal.dealDeposit }} / </span><span>{{
                                          deal.dealPrice | formatPrice
                                      }}</span></td>
                                      <td>{{ deal.dealArea }}</td>
                                      <td>{{ deal.dealFloor }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";
import DealChart from "@/components/common/UI/DealChart.vue"
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    BasicHeader,
    DealChart,
  },
  data() {
    return {
      // 카카오맵
      map: null,
      markerList: [],


      // 검색창 데이터
      searchType: "A", // A - K
      selectedSido: "",
      selectedGugun: "",
      selectedDong: "",
      keyword: "",

      // 정보창 토글
      isSelected: false,
      houseInfoToggle: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("dealStore", ["houseList", "houseInfo", "reviewList", "oldDealList", "nowDealList", "isBookmarking", "oldDealData"]),
    ...mapState("commonStore", ["sidoList", "gugunList", "dongList"]),
  },
  methods: {
    ...mapGetters("dealStore", ["getAddress"]),
    ...mapActions("dealStore", ["registBookmark", "setHouseInfo", "searchByKeyword", "searchByAddress", "setInit",
      "getOldDealList", "getNowDealList", "getReviewList", "setDealReviewList", "getChartList"]),
    ...mapActions("commonStore", ["getSido", "getGugun", "getDong"]),

    // 구군 스토어 리드
    async getGugunList() {
      this.selectedGugun = "";
      this.selectedDong = "";
      await this.getGugun(this.selectedSido.code);
    },
    // 동 스토어 리드
    async getDongList() {
      this.selectedDong = "";
      await this.getDong(this.selectedGugun.code);
    },

    ///////////////////////////// 검색 ///////////////////////////////////////////
    // 주소기준 검색 
    async addressSearch() {
      await this.searchByAddress(this.selectedDong.code);
      this.selectedSido = "";
      this.selectedGugun = "";
      this.selectedDong = "";
      this.keyword = "";
      this.isSelected = false;
      this.houseInfoToggle = false;
    },
    // 키워드 기준 검색
    async keywordSearch() {
      await this.searchByKeyword(this.keyword);
      this.keyword = "";
      this.isSelected = false;
      this.houseInfoToggle = false;
    },
    /////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////// 마커 ///////////////////////////////////////////
    // 마커삭제
    async removeMarker() {
      this.markerList.forEach((marker) => {
        marker.setMap(null);
      });
      this.markerList = [];
    },
    // 마커생성 (houseList)
    async makeMarker() {
      let bounds = new kakao.maps.LatLngBounds();

      Object.values(this.houseList).forEach((house) => {
        let position = new kakao.maps.LatLng(house.houseLat, house.houseLng);
        let marker = new kakao.maps.Marker({ position });

        let infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px; text-align: center;">${house.houseName}</div>`
        });

        // 마우스 오버
        kakao.maps.event.addListener(marker, 'mouseover', () => { infowindow.open(this.map, marker); });
        // 마우스 아웃
        kakao.maps.event.addListener(marker, 'mouseout', () => { infowindow.close(); });
        // 마우스 클릭
        const $this = this;
        kakao.maps.event.addListener(marker, 'click', function () {
          $this.isSelected = true;
          $this.setHouseInfo(house);
          // 리뷰, 거래내역, 현재거래중인 매물 초기화
          $this.setDealReviewList();
          // 실거래가 리드
          $this.getOldDealList(house.houseId);
          // 현재 거래중인 거래 리드
          $this.getNowDealList(house.houseId);
          // 리뷰 리드
          $this.getReviewList(house.houseId);
          // 차트 데이터 리드
          $this.getChartList({ houseId: house.houseId, code: "300" });    // 매매정보만 들고옴 일단은
          $this.houseInfoToggle = true;
        });

        this.markerList.push(marker);
        marker.setMap(this.map);
        bounds.extend(position);
      });

      // 센터 위치이동
      this.map.setBounds(bounds);
    },
    ////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////// 맵생성 ///////////////////////////////////////
    initMap() {
      let mapContainer = document.querySelector("#kakao-map");
      let mapOption = {
        center: new kakao.maps.LatLng(37.55931174210629, 127.00434608141744),
        level: 7,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
    /////////////////////////////////////////////////////////////////////////////////////  
  },
  mounted() {
    this.setInit();
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b17c3ca2cf51dc08967913607c029db4&libraries=services"
      );
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  watch: {
    // houseList 변화감지해서 마커찍는 watch
    async houseList() {
      await this.removeMarker();
      if (this.houseList.length > 0) {
        await this.makeMarker();
      }
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}

#kakao-map {
  z-index: 1;
  height: 80vh;
}

.map-wrapper {
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.wrapper {
  z-index: 2;
  right: 0;
  width: 450px;
  height: auto;
  max-height: 100%;
  overflow-x: hidden;
  padding: 10px 5px;
  position: absolute;
}

#accordion>.card,
#collapseFour {
  background-color: transparent;
  border-color: transparent;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
