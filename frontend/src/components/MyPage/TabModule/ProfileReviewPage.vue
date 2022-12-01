<template>
  <div class="table-responsive">
    <h5 v-if="Object.values(reviewList).length === 0" class="text-center mt-5 mb-5" style="font-weight: bold;">
      등록한 리뷰가 없습니다.</h5>
    <table v-else class="table">
      <thead class="table-primary">
        <tr>
          <th scope="col">건물명</th>
          <th scope="col">주소</th>
          <th scope="col">교통점수</th>
          <th scope="col">치안점수</th>
          <th scope="col">상가점수</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in reviewList" :key="index">
          <td><a @click="selectReviewDetail(review)">
              <div class="task_desc_0">{{ review.houseName }}</div>
            </a></td>
          <td>
            <div class="task_desc_0">{{ review.houseSidoName }} {{ review.houseGugunName }} {{ review.houseDongName }}
            </div>
          </td>
          <td>
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
          </td>
          <td>
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
          </td>
          <td>
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
          </td>
          <td><a @click="selectReviewModify(review)">
              <feather class="me-3" type="edit" size="20" />
            </a></td>
          <td><a @click="deleteReview(review.reviewId)">
              <feather type="trash" size="20" />
            </a></td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <review-modify-modal :review="selectedReview"
      v-on:call-parent-modify-close="closeReviewModify"></review-modify-modal>
    <review-detail-modal :review="selectedReview"
      v-on:call-parent-detail-close="closeReviewDetail"></review-detail-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ReviewModifyModal from '@/components/common/Modal/ReviewModifyModal.vue';
import ReviewDetailModal from "@/components/common/Modal/ReviewDetailModal.vue";

import { Modal } from "bootstrap";

export default {
  components: {
    ReviewModifyModal,
    ReviewDetailModal
  },
  data() {
    return {
      selectedReview: null,
      reviewModifyModal: null,
      reviewDetailModal: null
    }
  },
  methods: {
    ...mapActions("myPageStore", ["deleteReview", "getReviewList"]),
    selectReviewModify(review) {
      this.selectedReview = review;
      this.reviewModifyModal.show();
    },
    selectReviewDetail(review) {
      this.selectedReview = review;
      this.reviewDetailModal.show();
    },

    closeReviewModify() {
      this.reviewModifyModal.hide();
    },
    closeReviewDetail() {
      this.reviewDetailModal.hide();
    }
  },
  computed: {
    ...mapState("myPageStore", ["reviewList"]),
  },
  mounted() {
    this.reviewModifyModal = new Modal(document.getElementById("reviewModifyModal"));
    this.reviewDetailModal = new Modal(document.getElementById("reviewDetailModal"));
  },
  async created() {
    await this.getReviewList();
  }
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