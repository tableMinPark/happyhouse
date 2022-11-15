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
                        <label class="form-label" for="validationDefault01">전세</label>
                        <input class="form-control" id="validationDefault01" type="text" placeholder="First name" required="" />
                      </div>
                    </div>
                    <div v-else-if="deal == 'rent'">월세 선택</div>
                    <div v-else>매매 선택</div>
                  </div>

                  <div class="email-wrapper">
                    <div class="theme-form">
                      <div class="form-group">
                        <label>Content:</label>
                        <textarea id="text-box" name="text-box" cols="10" rows="2" style="visibility: hidden; display: none"></textarea>
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
              <form class="dropzone digits dz-clickable" id="singleFileUpload" action="/upload.php">
                <div class="m-0 dz-message needsclick">
                  <i class="icon-cloud-up"></i>
                  <h6 class="mb-0">Drop files here or click to upload.</h6>
                </div>
              </form>
              <div class="btn-showcase">
                <button class="btn btn-primary" type="submit">Post</button>
                <input class="btn btn-light" type="reset" value="Discard" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue"

export default {
  data() {
    return {
      map: null,
      deal: "charter",
      charterPrice: 0,
      rentDeposit: 0,
      rentPrice: 0,
      dealingPrice: 0,
    }
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
      this.deal = event.target.value
    },
  },

  mounted() {
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
