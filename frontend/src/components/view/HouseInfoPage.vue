<template>
  <div>
    <div class="container-fluid">
      <basic-header name="매물"></basic-header>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header pb-0">
              <h5 class="card-title">title</h5>
            </div>
            <div class="card-body">content</div>
          </div>
          <div class="card">
            <div class="card-header pb-0">
              <h5 class="card-title">title</h5>
            </div>
            <div class="card-body">content</div>
          </div>
        </div>
        <div class="col-4">
          <div class="card" style="height: 91%">
            <div class="card-header pb-0">
              <h5 class="card-title">title</h5>
            </div>
            <div class="card-body">content</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header pb-0">
              <h5 class="card-title">title</h5>
            </div>
            <div class="card-body">content</div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-header pb-0">
              <h5 class="card-title">title</h5>
            </div>
            <div class="card-body">content</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";

export default {
  data() {
    return {
      map: null,
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

<style>
#kakao-map {
  height: 450px;
}
#houseInfoImage {
  height: 500px;
}
</style>
