<template>
  <div>
    <div class="container-fluid">
      <basic-header name="매물수정"></basic-header>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body add-post">
              <form class="row needs-validation" novalidate="">
                <div class="col-sm-12">
                  <div class="row">
                    <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                      <label class="form-label" for="validationCustom01">매물 명:</label>
                      <input class="form-control" id="validationCustom01" type="text" placeholder="house name" required="" v-model="houseName" />
                    </div>
                    <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                      <label class="form-label" for="validationCustom01">건축년도:</label>
                      <input class="form-control" id="validationCustom01" type="text" placeholder="build year" required="" v-model="houseBuildYear" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label>매물 종류:</label>
                    <div class="m-checkbox-inline" style="margin-bottom: 10px">
                      <label class="f-w-500" for="edo-ani">
                        <input class="radio_animated" type="radio" name="checkboxDealCode" id="edo-ani" value="100" v-model="dealCode" @change="dealMethod" />전세
                      </label>
                      <label class="f-w-500" for="edo-ani1">
                        <input class="radio_animated" type="radio" name="checkboxDealCode" id="edo-ani1" value="200" v-model="dealCode" @change="dealMethod" />월세
                      </label>
                      <label class="f-w-500" for="edo-ani2">
                        <input class="radio_animated" type="radio" name="checkboxDealCode" id="edo-ani2" value="300" v-model="dealCode" @change="dealMethod" />매매
                      </label>
                    </div>
                    <div class="row" v-if="dealCode === '100'">
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01">전세금</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="전세금" required="" v-model="charterPrice" />
                        <p class="form-label pt-3 ps-3">{{ parsePrice(charterPrice) }}</p>
                      </div>
                    </div>
                    <div class="row" v-else-if="dealCode === '200'">
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault01">보증금</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="보증금" required="" v-model="rentDeposit" />
                        <p class="form-label pt-3 ps-3">{{ parsePrice(rentDeposit) }}</p>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault02">월세</label>
                        <input class="form-control" id="validationDefault02" type="number" placeholder="월" required="" v-model="rentPrice" />
                        <p class="form-labe pt-3 ps-3">{{ parsePrice(rentPrice) }}</p>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01">매매가</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="매매가" required="" v-model="dealingPrice" />
                        <p class="form-label pt-3 ps-3">{{ parsePrice(dealingPrice) }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>건물 종류:</label>
                    <div class="m-checkbox-inline" style="margin-bottom: 10px">
                      <label class="f-w-500" for="edo-ani3">
                        <input class="radio_animated" type="radio" name="checkboxHouseCode" id="edo-ani3" value="100" v-model="houseCode" @change="houseMethod" />아파트
                      </label>
                      <label class="f-w-500" for="edo-ani4">
                        <input class="radio_animated" type="radio" name="checkboxHouseCode" id="edo-ani4" value="200" v-model="houseCode" @change="houseMethod" />빌라
                      </label>
                      <label class="f-w-500" for="edo-ani5">
                        <input class="radio_animated" type="radio" name="checkboxHouseCode" id="edo-ani5" value="300" v-model="houseCode" @change="houseMethod" />주택
                      </label>
                    </div>

                    <div class="row" v-if="houseCode !== '300'">
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label" for="validationDefault01">평수</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="평수" required="" v-model="dealArea" />
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label" for="validationDefault01">층</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="층" required="" v-model="dealFloor" />
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label" for="validationDefault01">평수</label>
                        <input class="form-control" id="validationDefault01" type="number" placeholder="평수" required="" v-model="dealArea" />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">시 / 도</label>
                        <select class="form-select form-control" v-model="selectedSido" @change="getGugunList">
                          <option v-for="(sido, index) in sidoList" :key="`sido-${index}`" :value="sido">
                            {{ sido.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">구 / 군</label>
                        <select class="form-select form-control" v-model="selectedGugun" @change="getDongList">
                          <option v-for="(gugun, index) in gugunList" :key="`gugun-${index}`" :value="gugun">
                            {{ gugun.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">동</label>
                        <select class="form-select form-control" v-model="selectedDong">
                          <option v-for="(dong, index) in dongList" :key="`dong-${index}`" :value="dong">
                            {{ dong.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-12 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">상세주소</label>
                        <input class="form-control" type="text" required="" v-model.lazy="detailAddress" />
                      </div>
                    </div>
                  </div>

                  <div class="email-wrapper">
                    <div class="theme-form">
                      <div class="form-group">
                        <label>Content:</label>

                        <div
                          id="cke_text-box"
                          class="cke_1 cke cke_reset cke_chrome cke_editor_text-box cke_ltr cke_browser_webkit"
                          dir="ltr"
                          lang="ko"
                          role="application"
                          aria-labelledby="cke_text-box_arialbl"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <!--file upload-->
              <drop-zone @call-parent-upload-img="uploadImg"></drop-zone>
              <div class="btn-showcase">
                <button class="btn btn-primary" @click="houseModify">수정</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import CKEditor from "@ckeditor/ckeditor5-vue2"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { mapActions, mapState } from "vuex"

import BasicHeader from "@/components/common/BasicHeader.vue"
import DropZone from "@/components/common/UI/DropZone"
Vue.use(CKEditor)

export default {
  components: {
    BasicHeader,
    DropZone,
  },
  data() {
    return {
      map: null,
      deal: null,
      houseName: "",
      houseBuildYear: "",

      // 매물 종류
      dealCode: "100",
      charterPrice: "",
      rentDeposit: "",
      rentPrice: "",
      dealingPrice: "",

      // 매물 부가정보
      houseCode: "100",
      dealFloor: "",
      dealArea: "",

      //시 군 동 선택
      selectedSido: "",
      selectedGugun: "",
      selectedDong: "",
      detailAddress: "",

      //CKEditor
      CKEditor: null,

      //files
      attachedFiles: [],
    }
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("commonStore", ["sidoList", "gugunList", "dongList"]),
  },
  methods: {
    ...mapActions("commonStore", ["getSido", "getGugun", "getDong"]),
    ...mapActions("houseStore", ["modifyDeal"]),

    // 매물수정함수 (데이터 정리해서 스토어에 있는 함수로 보내서 매물등록 진행)
    async houseModify() {
      const dealInfo = {
        userId: this.userInfo.userId,
        dealId: this.deal.dealId,
        houseId: this.deal.houseId,
        houseName: this.houseName,
        houseBuildYear: this.houseBuildYear,
        dealContent: this.CKEditor.getData(),
        houseSidoCode: this.selectedSido.code,
        houseSidoName: this.selectedSido.name,
        houseGugunCode: this.selectedGugun.code,
        houseGugunName: this.selectedGugun.name,
        houseDongCode: this.selectedDong.code,
        houseDongName: this.selectedDong.name,
        houseJibun: this.detailAddress,
        code: this.dealCode,
        houseCode: this.houseCode,
        charterPrice: this.charterPrice,
        rentPrice: this.rentPrice,
        rentDeposit: this.rentDeposit,
        dealingPrice: this.dealingPrice,
        dealArea: this.dealArea,
        dealFloor: this.dealFloor,
        attachedFiles: this.attachedFiles,
      }
      console.log(dealInfo)
      await this.modifyDeal(dealInfo)
    },
    parsePrice(p) {
      if (p == "") return ""
      let price = p
      let a = 0,
        b = 0
      if (price >= 100000000) {
        a = parseInt(price / 100000000)
        price %= 100000000
      }
      if (price >= 10000) {
        b = parseInt(price / 10000)
        price %= 10000
      }
      let ret = ""
      if (a > 0) ret += a + "억"
      if (b > 0) ret += b + "만"
      if (price > 0) ret += price
      ret += "원"
      return ret
    },
    uploadImg(files) {
      this.attachedFiles = files
      console.log(this.attachedFiles)
    },
    dealMethod() {
      this.charterPrice = ""
      this.rentDeposit = ""
      this.rentPrice = ""
      this.dealingPrice = ""
    },
    houseMethod() {
      this.dealFloor = ""
      this.dealArea = ""
    },
    // 구군 스토어 리드
    async getGugunList() {
      this.selectedGugun = ""
      this.selectedDong = ""
      await this.getGugun(this.selectedSido.code)
    },
    // 동 스토어 리드
    async getDongList() {
      this.selectedDong = ""
      await this.getDong(this.selectedGugun.code)
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#cke_text-box"))
    } catch (error) {
      console.error(error)
    }
    this.deal = this.$route.params.deal

    this.houseName = this.deal.houseName
    this.houseBuildYear = this.deal.houseBuildYear

    // 매물 종류
    this.dealCode = this.deal.code
    if (this.dealCode == "100") {
      this.charterPrice = this.deal.dealPrice
    } else if (this.dealCode == "200") {
      this.rentDeposit = this.deal.dealDeposit
      this.rentPrice = this.deal.dealPrice
    } else {
      this.dealingPrice = this.deal.dealPrice
    }

    // 매물 부가정보
    this.houseCode = this.deal.houseCode

    this.dealFloor = this.deal.dealFloor
    this.dealArea = this.deal.dealArea

    //시 군 동 선택
    this.selectedSido = {
      code: this.deal.houseSidoCode,
      name: this.deal.houseSidoName,
    }
    this.selectedGugun = {
      code: this.deal.houseGugunCode,
      name: this.deal.houseGugunName,
    }
    this.selectedDong = {
      code: this.deal.houseDongCode,
      name: this.deal.houseDongName,
    }
    this.detailAddress = this.deal.houseJibun

    this.CKEditor.setData(this.deal.dealContent)
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
