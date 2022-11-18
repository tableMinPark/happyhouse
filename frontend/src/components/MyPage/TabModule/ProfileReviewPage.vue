<template>
  <div class="table-responsive">                     
    <table class="table">
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
        <tr v-for="(review, index) in reviewList" :key="index" >
          <td><a @click="showReviewDetail(review)"><div class="task_desc_0">{{ review.house.houseName}}</div></a></td>
          <td><div class="task_desc_0">{{ review.house.sidoName }} {{ review.house.gugunName }} {{ review.house.dongName }}</div></td>
          <td>
            <div class="rating-container">
              <div class="br-wrapper br-theme-fontawesome-stars">
                <div class="br-widget">
                  <a :class="{'br-selected br-current': 1 <= review.reviewTraficRating}"></a>
                  <a :class="{'br-selected br-current': 2 <= review.reviewTraficRating}"></a>
                  <a :class="{'br-selected br-current': 3 <= review.reviewTraficRating}"></a>
                  <a :class="{'br-selected br-current': 4 <= review.reviewTraficRating}"></a>
                  <a :class="{'br-selected br-current': 5 <= review.reviewTraficRating}"></a>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="rating-container">
              <div class="br-wrapper br-theme-fontawesome-stars">
                <div class="br-widget">
                  <a :class="{'br-selected br-current': 1 <= review.reviewSafetyRating}"></a>
                  <a :class="{'br-selected br-current': 2 <= review.reviewSafetyRating}"></a>
                  <a :class="{'br-selected br-current': 3 <= review.reviewSafetyRating}"></a>
                  <a :class="{'br-selected br-current': 4 <= review.reviewSafetyRating}"></a>
                  <a :class="{'br-selected br-current': 5 <= review.reviewSafetyRating}"></a>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="rating-container">
              <div class="br-wrapper br-theme-fontawesome-stars">
                <div class="br-widget">
                  <a :class="{'br-selected br-current': 1 <= review.reviewStoreRating}"></a>
                  <a :class="{'br-selected br-current': 2 <= review.reviewStoreRating}"></a>
                  <a :class="{'br-selected br-current': 3 <= review.reviewStoreRating}"></a>
                  <a :class="{'br-selected br-current': 4 <= review.reviewStoreRating}"></a>
                  <a :class="{'br-selected br-current': 5 <= review.reviewStoreRating}"></a>
                </div>
              </div>
            </div>
          </td>
          <td><a @click="showReviewModify(review)"><feather  class="me-3" type="edit" size="20"/></a></td>
          <td><a @click="reviewDelete(review.reviewId)"><feather type="trash" size="20"/></a></td>
        </tr>
      </tbody>      
    </table>

    <!-- Modal -->
    <review-modify-modal :review="selectedReview" v-on:call-parent-modify-close="closeReviewModify"></review-modify-modal>
    <review-detail-modal :review="selectedReview" v-on:call-parent-detail-close="closeReviewDetail"></review-detail-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ReviewModifyModal from '@/components/common/Modal/ReviewModifyModal.vue';
import ReviewDetailModal from "@/components/common/Modal/ReviewDetailModal.vue";

import { Modal } from "bootstrap";

export default {
  components: {
    ReviewModifyModal,
    ReviewDetailModal
  },  
  data(){
    return {
      selectedReview: null,
      reviewList: null,
      reviewModifyModal: null,
      reviewDetailModal: null
    }
  },
  methods: {
    // Delete Review
    reviewDelete(reviewId) {
      console.log("call reviewDelete " + reviewId);
    },
    // Detail Modal show/hide
    showReviewDetail(review){
      this.selectedReview = review;
      this.reviewDetailModal.show(); 
    },
    closeReviewDetail(){
      this.reviewDetailModal.hide();
    },
    // Modify Modal show/hide
    showReviewModify(review) { 
      this.selectedReview = review;
      this.reviewModifyModal.show();      
    },
    closeReviewModify(){
      this.reviewModifyModal.hide();
    },
  },
    computed: {
        ...mapState("myPageStore", ["myPageUserInfo"])
    },
  mounted() {
    this.reviewModifyModal = new Modal(document.getElementById("reviewModifyModal"));
    this.reviewDetailModal = new Modal(document.getElementById("reviewDetailModal"));
  },  
  created() {
    console.log("review read for " + this.myPageUserInfo.userId);
    // 리뷰 리스트 get
    this.reviewList = [
        {
          reviewId: 10,
          reviewContent: "넘흐 좋아용",
          reviewRegDt: '2022-12-31',
          reviewTraficRating: 3,
          reviewSafetyRating: 4,
          reviewStoreRating: 5,

          house: {
            houseId: 1,
            houseName: '삼정 그린코아',
            houseBuildYear: '2022',
            lat: 12.4,
            lng: 30.1,
            sidoCode: '1',
            sidoName: '부산시',
            gugunCode: '2',
            gugunName: '강서구',
            dongCode: '3',
            dongName: '송정동',
            jibun: '1627-5',
            houseCode: '100',
            houseCodeName: '아파트'
          }
        }
    ]
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