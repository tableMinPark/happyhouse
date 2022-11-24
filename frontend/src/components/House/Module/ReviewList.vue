<template>
  <div class="card">
    <div class="container-fruid card-body p-5">
      <div class="row">
        <div class="col-7">
          <div class="media p-3">
            <img class="img-50 img-fluid m-r-20 rounded-circle" alt
              :src="require(`@/assets/upload/${reviewList[0].userProfileImageUrl}`)" />
            <div class="media-body mt-2">
              <h5 class="d-block">{{ reviewList[0].userName }}</h5>
              <h6 class="d-block">{{ reviewList[0].userRegDt }}</h6>
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[0].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[0].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[0].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[0].reviewTraficRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[0].reviewTraficRating }"></a>
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[0].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[0].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[0].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[0].reviewSafetyRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[0].reviewSafetyRating }"></a>
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
                    <a :class="{ 'br-selected br-current': 1 <= reviewList[0].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 2 <= reviewList[0].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 3 <= reviewList[0].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 4 <= reviewList[0].reviewStoreRating }"></a>
                    <a :class="{ 'br-selected br-current': 5 <= reviewList[0].reviewStoreRating }"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <h6 v-html="reviewList[0].reviewContent"></h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      selectedReview: null,
    }
  },
  computed: {
    ...mapState("houseStore", ["reviewList"]),
  },
  methods: {
    // Delete Review
    reviewDelete(reviewId) {
      console.log("call reviewDelete " + reviewId)
    },
    // Detail Modal show/hide
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
  mounted() {
    console.log(this.reviewList)
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
