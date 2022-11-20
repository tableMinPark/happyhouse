<template>
   <div class="modal" tabindex="-1" id="reviewDetailModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">리뷰 정보</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body container">
               <div class="row">
                  <div class="col-7 ps-3 pe-3" v-html="reviewContent">
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
                                    <a :class="{ 'br-selected br-current': 1 <= reviewTraficRating }"></a>
                                    <a :class="{ 'br-selected br-current': 2 <= reviewTraficRating }"></a>
                                    <a :class="{ 'br-selected br-current': 3 <= reviewTraficRating }"></a>
                                    <a :class="{ 'br-selected br-current': 4 <= reviewTraficRating }"></a>
                                    <a :class="{ 'br-selected br-current': 5 <= reviewTraficRating }"></a>
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
                                    <a :class="{ 'br-selected br-current': 1 <= reviewSafetyRating }"></a>
                                    <a :class="{ 'br-selected br-current': 2 <= reviewSafetyRating }"></a>
                                    <a :class="{ 'br-selected br-current': 3 <= reviewSafetyRating }"></a>
                                    <a :class="{ 'br-selected br-current': 4 <= reviewSafetyRating }"></a>
                                    <a :class="{ 'br-selected br-current': 5 <= reviewSafetyRating }"></a>
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
                                    <a :class="{ 'br-selected br-current': 1 <= reviewStoreRating }"></a>
                                    <a :class="{ 'br-selected br-current': 2 <= reviewStoreRating }"></a>
                                    <a :class="{ 'br-selected br-current': 3 <= reviewStoreRating }"></a>
                                    <a :class="{ 'br-selected br-current': 4 <= reviewStoreRating }"></a>
                                    <a :class="{ 'br-selected br-current': 5 <= reviewStoreRating }"></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
            <div class="modal-footer">
               <button @click="closeReviewDetail" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal"
                  type="button">닫기</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: ['review'],
   methods: {
      closeReviewDetail() {
         this.$emit('call-parent-detail-close');
      }
   },
   data() {
      return {
         reviewId: '',
         reviewContent: '',
         reviewTraficRating: 1,
         reviewSafetyRating: 1,
         reviewStoreRating: 1,
      }
   },
   watch: {
      // 모달 초기화
      review: function () {
         this.reviewId = this.review.reviewId,
            this.reviewContent = this.review.reviewContent;
         this.reviewTraficRating = this.review.reviewTraficRating
         this.reviewSafetyRating = this.review.reviewSafetyRating
         this.reviewStoreRating = this.review.reviewStoreRating
      }
   },
};
</script>


<style scoped>

</style>
