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
                      <select id="si" class="form-select me-1" v-model="sidoCode">
                        <option v-for="(sido, index) in sidoList" :key="`sido-${index}`" :value="sido.code">
                          {{ sido.name }}
                        </option>
                      </select>
                      <select id="gugun" class="form-select me-1" v-model="gugunCode">
                        <option v-for="(gugun, index) in gugunList" :key="`gugun-${index}`" :value="gugun.code">
                          {{ gugun.name }}
                        </option>
                      </select>
                      <select id="dong" class="form-select" v-model="dongCode">
                        <option v-for="(dong, index) in dongList" :key="`dong-${index}`" :value="dong.code">
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
            <div class="default-according" id="accordion">
              <div class="card">
                <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-2"
                  id="headingFour">
                  <div class="info-block">
                    <button @click="dealInfoToggler" class="btn btn-link text-white" data-bs-toggle="collapse"
                      data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                      <h6>검색된 매물 (2)</h6>
                    </button>
                  </div>
                </div>
                <div class="collapse" :class="{ show: dealInfoToggle }" id="collapseFour" aria-labelledby="headingOne"
                  data-bs-parent="#accordion">
                  <div class="container-fruid">
                    <div class="card shadow shadow-showcase mb-2">
                      <div class="container card-body">
                        <div class="row">
                          <div class="d-flex justify-content-between">
                            <h3>{{ dealInfo.houseName }}</h3>
                            <a @click="registBookmark(userInfo.userId)">
                              <i v-if="isBookmarking" class="fa fa-heart fa-2x" size="30"></i>
                              <i v-else class="fa fa-heart-o fa-2x"></i>
                            </a>
                          </div>
                          <h6>{{ dealInfo.houseAddress }}</h6>
                          <h6>{{ dealInfo.houseBuildYear }}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="card shadow shadow-showcase mb-1">
                      <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2">
                        <div class="info-block">
                          <h6>리뷰</h6>
                        </div>
                      </div>
                      <div class="container-fruid card-body">
                        <div class="row">
                          <div class="col-5">
                            <div class="media p-1">
                              <img class="img-50 img-fluid m-r-20 rounded-circle" alt src="assets/images/user/2.png" />
                              <div class="media-body mt-2">
                                <h5 class="d-block">
                                  {{ reviewList[0].userName }}
                                </h5>
                                <h6 class="d-block">
                                  {{ reviewList[0].userRegDt }}
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div class="col-7">
                            <div class="row text-center">
                              <div class="col-6">
                                <h6>
                                  <feather type="truck" size="15" class="pe-2" />교통
                                </h6>
                              </div>
                              <div class="col-6">
                                <div class="rating-container">
                                  <div class="br-wrapper br-theme-fontawesome-stars">
                                    <div class="br-widget">
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
                            </div>

                            <div class="row text-center">
                              <div class="col-6">
                                <h6>
                                  <feather type="home" size="15" class="pe-2" />치안
                                </h6>
                              </div>
                              <div class="col-6">
                                <div class="rating-container">
                                  <div class="br-wrapper br-theme-fontawesome-stars">
                                    <div class="br-widget">
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
                            </div>
                            <div class="row text-center">
                              <div class="col-6">
                                <h6>
                                  <feather type="shopping-cart" size="15" class="pe-2" />상가
                                </h6>
                              </div>
                              <div class="col-6">
                                <div class="rating-container">
                                  <div class="br-wrapper br-theme-fontawesome-stars">
                                    <div class="br-widget">
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
                        </div>
                        <div class="row mt-3">
                          <div class="col-12">
                            <h6 class="text-center">
                              {{ reviewList[0].reviewContent }}
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
                      <div class="container-fruid card-body p-0 pb-2">
                        <div class="row">
                          <div class="col-12">
                            <div class="col-sm-12 col-lg-12 col-xl-12">
                              <div class="table-responsive">
                                <table class="table">
                                  <colgroup>
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 40%" />
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 20%" />
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
                                    <tr>
                                      <td>1</td>
                                      <td>2</td>
                                      <td>3</td>
                                      <td>4</td>
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
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 40%" />
                                    <col span="1" style="width: 20%" />
                                    <col span="1" style="width: 20%" />
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
                                    <tr>
                                      <td>1</td>
                                      <td>2</td>
                                      <td>3</td>
                                      <td>4</td>
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
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BasicHeader,
  },
  data() {
    return {
      // 카카오맵
      map: null,

      // 검색창 데이터
      searchType: "A", // A - K
      sidoCode: "",
      gugunCode: "",
      dongCode: "",
      keyword: "",

      // 정보창 토글
      dealInfoToggle: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("dealStore", ["dealList", "dealInfo", "reviewList", "isBookmarking", "markerList"]),
    ...mapState("commonStore", ["sidoList", "gugunList", "dongList"]),
  },
  methods: {
    ...mapActions("dealStore", ["registBookmark", "searchByKeyword", "searchByAddress"]),
    ...mapActions("commonStore", ["getSido", "getGugun", "getDong"]),
    
    dealInfoToggler() {
      if (this.dealInfoToggle) this.dealInfoToggle = false;
      else this.dealInfoToggle = true;
    },
    // 주소기준 검색 
    async addressSearch() {
      await this.searchByAddress(this.dongCode);

      // 지도에 마커 찍음

      // 마커에 클릭이벤트 추가
      this.dealInfoToggle = true;   // <- 클릭이벤트 추가하면서 토글버튼 여는 거 추가
    },
    // 키워드 기준 검색
    async keywordSearch() {
      await this.searchByKeyword(this.keyword);

      // 지도에 마커 찍음
      // 마커에 클릭 이벤트 추가
      
    },
    // 마커찍는함수
    async makeMarker() {

    },


    initMap() {
      let mapContainer = document.querySelector("#kakao-map");
      let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
  },
  mounted() {
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
  width: 400px;
  height: 100%;
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
