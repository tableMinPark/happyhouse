<template>
  <swiper class="swiper" :style="{
    '--swiper-pagination-color': '#fff',
    '--swiper-navigation-color': '#fff',
  }" :slides-per-view="1" :space-between="50" :breakpoints="{
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
}" :loop="true" :navigation="true" :autoplay="{
  delay: 2800,
  disableOnInteraction: false,
}">
    <swiper-slide v-if="imgList.lenght == 0">
      <div class="card-box-a card-shadow">
        <div class="img-box-a text-center" id="imageBox">
          <img :src="require(`@/assets/upload/deal/noImage.jpg`)" class="img-a img-fluid" />
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-else v-for="(item, index) in imgList" :key="index">
      <div class="card-box-a card-shadow">
        <div class="img-box-a text-center" id="imageBox">
          <img :src="require(`@/assets/upload/${item}`)" class="img-a img-fluid" />/
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
  computed: {
    ...mapState("houseStore", ["imgList"]),
  },
}
</script>

<style>
.img-box-a {
  width: 100%;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

#imageBox {
  min-height: 400px;
  width: 100%;
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
