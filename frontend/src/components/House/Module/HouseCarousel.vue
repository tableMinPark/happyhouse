<template>
  <!-- <div class="owl-carousel owl-theme owl-loaded owl-drag" id="owl-carousel-14">
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
  </div> -->
  <swiper
    class="swiper"
    :style="{
      '--swiper-pagination-color': '#fff',
      '--swiper-navigation-color': '#fff',
    }"
    :slides-per-view="1"
    :space-between="50"
    :breakpoints="{
      1024: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }"
    :loop="true"
    :navigation="true"
    :autoplay="{
      delay: 2800,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="(item, index) in imgList" :key="index">
      <div class="card-box-a card-shadow">
        <div class="img-box-a">
          <img :src="path + item" alt="" class="img-a img-fluid" />
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation, Pagination } from "swiper"

import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2"

import "swiper/swiper-bundle.css"

SwiperCore.use([Navigation, Pagination])
import { mapState } from "vuex"
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      path: "http://localhost:8080/upload/",
    }
  },
  mounted() {
    console.log(this.imgList)
  },
  computed: {
    ...mapState("dealStore", ["imgList"]),
  },
}
</script>

<style>
.img-fluid {
  max-width: 100%;
  height: auto;
}
.w-100 {
  width: 100%;
}
.ml-auto,
.mx-auto {
  margin-left: auto;
}
.mr-auto,
.mx-auto {
  margin-right: auto;
}
</style>
