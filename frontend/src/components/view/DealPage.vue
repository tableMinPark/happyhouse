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
                  <div class="info-block"><h6><feather type="search" size="15" class="pe-2"/>검색종류를 선택하세요</h6></div>
                </div>    
                <div class="card shadow shadow-showcase p-3 mb-1 text-center">
                  <div class="container-fluid">
                    <!-- 검색 종류 선택 START -->
                    <div class="row">
                        <div class="col-6 pt-2">
                          <div class="form-group custom-radio-ml">
                            <div class="radio radio-primary">
                              <input id="search-radio-keyword"  name="search-radio" checked type="radio" value="A" v-model="searchType" />
                              <label for="search-radio-keyword" class="form-check-label ps-2" >키워드 검색</label>     
                            </div>
                          </div>  
                        </div>
                        <div class="col-6 pt-2">
                          <div class="form-group custom-radio-ml"> 
                            <div class="radio radio-primary">             
                              <input id="search-radio-address" class="radio radio-primary" name="search-radio" type="radio" value="K" v-model="searchType" />
                              <label for="search-radio-address" class="form-check-label ps-2" >주소 기준 검색</label>    
                            </div>
                          </div>  
                        </div>
                    </div>
                    <!-- 검색 종류 선택 END -->
                    <!-- 동, 키워드 검색 START -->
                    <div v-show="searchType == 'A'" class="row">
                        <div class="col-10 pe-0 d-flex">
                            <input type="text" class="form-control" placeholder="동, 키워드" v-model="keyword">
                        </div>
                        <div class="col-2">
                            <button type="button" @click="keywordSearch" class="btn btn-primary ps-2 pe-2"><feather type="search" size="15"/></button>
                        </div>
                    </div>
                    <!-- 동, 키워드 검색 END --> 
                    <!-- 주소 검색 START -->
                    <div v-show="searchType == 'K'" class="row">
                        <div class="col-10 pe-0 d-flex">
                            <select id="si" class="form-select me-1" v-model="si">
                                <option selected>시</option>
                            </select>                                          
                            <select id="gugun" class="form-select me-1" v-model="gugun">
                                <option selected>군</option>
                            </select>                                                      
                            <select id="dong" class="form-select" v-model="dong">
                                <option selected>동</option>
                            </select>  
                        </div>
                        <div class="col-2">
                            <button @click="addressSearch" type="button" class="btn btn-primary ps-2 pe-2"><feather type="search" size="15"/></button>
                        </div>
                    </div>
                    <!-- 주소검색 END -->      
                </div>
              </div>
            </div>
            <div class="default-according" id="accordion">
              <div class="card">
                <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-2"  id="headingFour"> 
                  <div class="info-block">
                    <button @click="dealInfoToggler" class="btn btn-link text-white" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">  
                      <h6>검색된 매물 (2)</h6>
                    </button>
                  </div>
                </div> 
                <div class="collapse" :class="{show: dealInfoToggle}" id="collapseFour" aria-labelledby="headingOne" data-bs-parent="#accordion">
                  <div class="container-fruid"> 
                    <div class="card shadow shadow-showcase mb-2">                
                      <div class="container card-body"> 
                        <div class="row">
                          <h3>삼정그린코아</h3>
                          <p>부산시 강서구 송정동 1627-5</p>
                          <div class="col-4">
                            <h6>건축년도</h6>
                          </div>
                          <div class="col-8">
                            <h6>2022</h6>                          
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card shadow shadow-showcase mb-2">
                      <div class="card-header bg-primary d-flex justify-content-center align-items-center pb-0 pt-2"> 
                        <div class="info-block">
                          <h6>리뷰</h6>
                        </div>
                      </div>                    
                      <div class="container-fruid card-body"> 
                        <div class="row">
                          <div class="col-8">   
                            <div class="media">
                              <img class="img-50 img-fluid m-r-20 rounded-circle" alt src="assets/images/user/2.png">
                              <div class="media-body">
                                <span class="d-block">박 상 민</span>
                                <span class="d-block">2022.11.11 가입</span>
                              </div>
                            </div>
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
import BasicHeader from '@/components/common/BasicHeader.vue';

export default {
  data() {
    return {
      map: null,
      searchType: 'A',    // A - K
      si: '시',
      gugun: '군',
      dong: '동',
      keyword: '',
      houseInfo: "1",

      dealInfoToggle: false
    }
  },
  components: {
    BasicHeader
  },
  methods: {
    dealInfoToggler() {
      if (this.dealInfoToggle) this.dealInfoToggle = false;
      else this.dealInfoToggle = true;
    },
    addressSearch() {
      console.log("call address search " + this.si + " " + this.gugun + " " + this.dong);
      this.dealInfoToggle = true;
    },  
    keywordSearch() {
      console.log("call keyword search " + this.keyword);
      this.dealInfoToggle = true;
    },  
    initMap() {
      let mapContainer = document.querySelector("#kakao-map");
      let mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 1,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    }  
  },  
  mounted () {
    if (!window.kakao || !window.kakao.maps){
      const script = document.createElement('script');
      script.setAttribute('src', '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b17c3ca2cf51dc08967913607c029db4&libraries=services');
      /* global kakao */
      script.addEventListener('load', () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
 }
}
</script>

<style scoped>
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

#accordion > .card,
#collapseFour {
  background-color:transparent;
  border-color:transparent;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
}


</style>