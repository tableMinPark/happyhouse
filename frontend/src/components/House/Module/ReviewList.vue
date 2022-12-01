<template>
  <div class="card">
    <div class="container-fruid card-body p-5">
      <div class="row">
        <div class="col-7">
          <div class="media p-3" @click="move(reviewList[idx].userId)" style="cursor: pointer;">
            <img class="img-50 img-fluid m-r-20 rounded-circle" alt
              :src="require(`@/assets/upload/${reviewList[idx].userProfileImageUrl}`)" />
            <div class="media-body mt-2">
              <h5 class="d-block">{{ reviewList[idx].userName }}</h5>
              <h6 class="d-block">{{ reviewList[idx].userRegDt }}</h6>
            </div>
          </div>
        </div>
        <div class="col-5">
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[idx].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[idx].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[idx].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[idx].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[idx].reviewTraficRating }"></a>
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[idx].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[idx].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[idx].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[idx].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[idx].reviewSafetyRating }"></a>
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[idx].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[idx].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[idx].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[idx].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[idx].reviewStoreRating }"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <h6 v-html="reviewList[idx].reviewContent"></h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  props: ["idx"],
  data() {
    return {
      selectedReview: null,
    }
  },
  computed: {
    ...mapState("houseStore", ["reviewList"]),
    ...mapState("userStore", ["isLogin"]),
  },
  methods: {
    move(userId) {
      this.$router.push({ path: "/profile/" + userId });
    },
    showReviewDetail(review) {
      this.selectedReview = review
      this.reviewDetailModal.show()
    },
    closeReviewDetail() {
      this.reviewDetailModal.hide()
    },
    // Modify Modal show/hide
    showReviewModify(review) {
      this.selectedReview = review
      this.reviewModifyModal.show()
    },
    closeReviewModify() {
      this.reviewModifyModal.hide()
    },
  },
}
</script>

<style scoped>
table {
  table-layout: fixed;
}

td div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

a {
  cursor: pointer;
}
</style>
