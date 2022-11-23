<template>
  <div class="owl-carousel owl-theme owl-loaded owl-drag" id="owl-carousel-14">
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
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
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

<style></style>
