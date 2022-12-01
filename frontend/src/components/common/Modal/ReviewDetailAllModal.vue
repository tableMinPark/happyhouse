<template>
  <div class="modal" tabindex="-1" id="reviewDetailAllModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">리뷰 정보</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="vertical-scroll scroll-demo ps-container ps-theme-default ps-active-y" data-ps-id="aee1c989-0156-03d5-0f39-9ef9ce206617">
          <div class="card-body" v-for="(review, index) in reviewList" :key="index">
            <div class="modal-body container">
              <div class="row">
                <div class="col-7 ps-3 pe-3" v-html="review.reviewContent"></div>
                <div class="col-5">
                  <div class="row text-center">
                    <div class="col-6">
                      <h6><feather type="truck" size="15" class="pe-2" />교통</h6>
                    </div>
                    <div class="col-6">
                      <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                          <div class="br-widget">
                            <a :class="{ 'br-selected br-current': 1 <= review.reviewTraficRating }"></a>
                            <a :class="{ 'br-selected br-current': 2 <= review.reviewTraficRating }"></a>
                            <a :class="{ 'br-selected br-current': 3 <= review.reviewTraficRating }"></a>
                            <a :class="{ 'br-selected br-current': 4 <= review.reviewTraficRating }"></a>
                            <a :class="{ 'br-selected br-current': 5 <= review.reviewTraficRating }"></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row text-center">
                    <div class="col-6">
                      <h6><feather type="home" size="15" class="pe-2" />치안</h6>
                    </div>
                    <div class="col-6">
                      <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                          <div class="br-widget">
                            <a :class="{ 'br-selected br-current': 1 <= review.reviewSafetyRating }"></a>
                            <a :class="{ 'br-selected br-current': 2 <= review.reviewSafetyRating }"></a>
                            <a :class="{ 'br-selected br-current': 3 <= review.reviewSafetyRating }"></a>
                            <a :class="{ 'br-selected br-current': 4 <= review.reviewSafetyRating }"></a>
                            <a :class="{ 'br-selected br-current': 5 <= review.reviewSafetyRating }"></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row text-center">
                    <div class="col-6">
                      <h6><feather type="shopping-cart" size="15" class="pe-2" />상가</h6>
                    </div>
                    <div class="col-6">
                      <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                          <div class="br-widget">
                            <a :class="{ 'br-selected br-current': 1 <= review.reviewStoreRating }"></a>
                            <a :class="{ 'br-selected br-current': 2 <= review.reviewStoreRating }"></a>
                            <a :class="{ 'br-selected br-current': 3 <= review.reviewStoreRating }"></a>
                            <a :class="{ 'br-selected br-current': 4 <= review.reviewStoreRating }"></a>
                            <a :class="{ 'br-selected br-current': 5 <= review.reviewStoreRating }"></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px"></div></div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; height: 298px; right: 3px"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 154px"></div></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeReviewDetail" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  methods: {
    closeReviewDetail() {
      this.$emit("call-parent-detail-all-close")
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState("dealStore", ["reviewList"]),
  },
}
</script>

<style scoped></style>
