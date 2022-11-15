<template>
  <div>
    <div class="container-fluid">
      <basic-header name="매물 등록"></basic-header>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body add-post">
              <form class="row needs-validation" novalidate="">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="form-label" for="validationCustom01"
                      >매물 명:</label
                    >
                    <input
                      class="form-control"
                      id="validationCustom01"
                      type="text"
                      placeholder="Post Title"
                      required=""
                    />
                  </div>
                  <div class="form-group">
                    <label>Type:</label>
                    <div class="m-checkbox-inline" style="margin-bottom: 10px">
                      <label class="f-w-500" for="edo-ani">
                        <input
                          class="radio_animated"
                          type="radio"
                          name="rdo-ani"
                          @change="dealMethod($event)"
                          value="charter"
                          checked
                        />전세
                      </label>
                      <label class="f-w-500" for="edo-ani1">
                        <input
                          class="radio_animated"
                          type="radio"
                          name="rdo-ani"
                          @change="dealMethod($event)"
                          value="rent"
                        />월세
                      </label>
                      <label class="f-w-500" for="edo-ani2">
                        <input
                          class="radio_animated"
                          type="radio"
                          name="rdo-ani"
                          @change="dealMethod($event)"
                          value="dealing"
                        />매매
                      </label>
                    </div>
                    <div class="row" v-if="deal == 'charter'">
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01"
                          >전세금</label
                        >
                        <input
                          class="form-control"
                          id="validationDefault01"
                          type="text"
                          placeholder="전세금"
                          required=""
                          v-model="charterPrice"
                        />
                      </div>
                    </div>
                    <div class="row" v-else-if="deal == 'rent'">
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault01"
                          >보증금</label
                        >
                        <input
                          class="form-control"
                          id="validationDefault01"
                          type="text"
                          placeholder="보증금"
                          required=""
                          v-model="rentDeposit"
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label" for="validationDefault02"
                          >월세</label
                        >
                        <input
                          class="form-control"
                          id="validationDefault02"
                          type="text"
                          placeholder="월"
                          required=""
                          v-model="rentPrice"
                        />
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-8">
                        <label class="form-label" for="validationDefault01"
                          >매매가</label
                        >
                        <input
                          class="form-control"
                          id="validationDefault01"
                          type="text"
                          placeholder="매매가"
                          required=""
                          v-model="dealingPrice"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">시 / 도</label>
                        <select
                          class="form-select form-control"
                          v-model="selectedSido"
                        >
                          <option value="서울">서울</option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">구 / 군</label>
                        <select
                          class="form-select form-control"
                          v-model="selectedGugun"
                        >
                          <option value="top">Top</option>
                        </select>
                      </div>
                      <div class="col-xl-4 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">동</label>
                        <select
                          class="form-select form-control"
                          v-model="selectedDong"
                        >
                          <option value="top">Top</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-12 col-sm-12 col-md-12 mb-4">
                        <label class="form-label">상세주소</label>
                        <input
                          class="form-control"
                          type="text"
                          required=""
                          v-model="detailAddress"
                        />
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
              <form
                class="dropzone digits dz-clickable"
                id="multiFileUpload"
                action="/upload.php"
              >
                <div class="m-0 dz-message needsclick">
                  <i class="icon-cloud-up"></i>
                  <h6 class="mb-0">Drop files here or click to upload.</h6>
                </div>
              </form>
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
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";
// import http from "@/common/axios.js";
import BasicHeader from "@/components/common/BasicHeader.vue";

Vue.use(CKEditor).use(VueAlertify);

export default {
  data() {
    return {
      map: null,
      deal: "charter",
      charterPrice: 0,
      rentDeposit: 0,
      rentPrice: 0,
      dealingPrice: 0,

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
    };
  },
  components: {
    BasicHeader,
  },
  methods: {
    initMap() {
      // let mapContainer = document.querySelector("#kakao-map");
      // let mapOption = {
      //     center: new kakao.maps.LatLng(33.450701, 126.570667),
      //     level: 1,
      // };
      // this.map = new kakao.maps.Map(mapContainer, mapOption);
    },

    dealMethod(event) {
      this.deal = event.target.value;
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(
        document.querySelector("#cke_text-box")
      );
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
#kakao-map {
  height: 450px;
}
#houseInfoImage {
  height: 500px;
}
</style>
