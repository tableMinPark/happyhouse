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
                  <div class="form-group">
                    <label class="form-label" for="validationCustom01">매물 명:</label>
                    <input class="form-control" id="validationCustom01" type="text" placeholder="Post Title" required="" />
                  </div>
                  <div class="form-group">
                    <label>Type:</label>
                    <div class="m-checkbox-inline" style="margin-bottom: 10px">
                      <label class="f-w-500" for="edo-ani">
                        <input class="radio_animated" type="radio" name="rdo-ani" @change="dealMethod($event)" value="charter" checked />전세
                      </label>
                      <label class="f-w-500" for="edo-ani1"> <input class="radio_animated" type="radio" name="rdo-ani" @change="dealMethod($event)" value="rent" />월세 </label>
                      <label class="f-w-500" for="edo-ani2"> <input class="radio_animated" type="radio" name="rdo-ani" @change="dealMethod($event)" value="dealing" />매매 </label>
                    </div>
                    <div class="row" v-if="deal == 'charter'">
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01">전세금</label>
                        <input class="form-control" id="validationDefault01" type="text" placeholder="전세금" required="" v-model="charterPrice" />
                        <p class="form-label">{{ parsePrice(charterPrice) }}</p>
                      </div>
                    </div>
                    <div class="row" v-else-if="deal == 'rent'">
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault01">보증금</label>
                        <input class="form-control" id="validationDefault01" type="text" placeholder="보증금" required="" v-model="rentDeposit" />
                        <p class="form-label">{{ parsePrice(rentDeposit) }}</p>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault02">월세</label>
                        <input class="form-control" id="validationDefault02" type="text" placeholder="월" required="" v-model="rentPrice" />
                        <p class="form-label">{{ parsePrice(rentPrice) }}</p>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01">매매가</label>
                        <input class="form-control" id="validationDefault01" type="text" placeholder="매매가" required="" v-model="dealingPrice" />
                        <p class="form-label">{{ parsePrice(dealingPrice) }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">시 / 도</label>
                        <select class="form-select form-control" v-model="selectedSido">
                          <option value="서울">서울</option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">구 / 군</label>
                        <select class="form-select form-control" v-model="selectedGugun">
                          <option value="top">Top</option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">동</label>
                        <select class="form-select form-control" v-model="selectedDong">
                          <option value="top">Top</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-12 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">상세주소</label>
                        <input class="form-control" type="text" required="" v-model="detailAddress" />
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
                <button class="btn btn-primary" type="submit">등록</button>
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
import VueAlertify from "vue-alertify"
// import http from "@/common/axios.js";

import BasicHeader from "@/components/common/BasicHeader.vue"
import DropZone from "@/components/common/UI/DropZone"

Vue.use(CKEditor).use(VueAlertify)

export default {
  components: {
    BasicHeader,
    DropZone,
  },
  data() {
    return {
      map: null,
      deal: "charter",
      charterPrice: "",
      rentDeposit: "",
      rentPrice: "",
      dealingPrice: "",

      //시 군 동 선택
      selectedSido: "서울",
      selectedGugun: "",
      selectedDong: "",

      detailAddress: "",

      //시 군 동 리스트
      sido: [], //create 때 초기화
      gugun: [], //sido change 때 초기화
      dong: [], // gugun change 때 초기화

      //CKEditor
      CKEditor: null,

      //files
      attachedFiles: null,
    }
  },
  methods: {
    uploadImg(files) {
      this.attachedFiles = files
      console.log(this.attachedFiles)
    },

    dealMethod(event) {
      this.charterPrice = ""
      this.rentDeposit = ""
      this.rentPrice = ""
      this.dealingPrice = ""
      this.deal = event.target.value
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
  },
  async mounted() {
    console.log(this.$route.params.deal)
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#cke_text-box"))
    } catch (error) {
      console.error(error)
    }
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
