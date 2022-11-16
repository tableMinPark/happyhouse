<template>
   <div class="modal" tabindex="-1" id="reviewRegisterModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">리뷰 등록</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="mt-3 mb-3" id="divEditorModify"></div>
               <div class="row mt-3">
                  <div class="col-4 ps-5">
                     <h6>
                        <feather type="truck" size="15" class="pe-2" />교통점수
                     </h6>
                  </div>
                  <div class="col-4">
                     <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                           <div class="br-widget">
                              <a :class="{ 'br-selected br-current': 1 <= reviewTraficRating }"
                                 @click="traficRatingChange(1)"></a>
                              <a :class="{ 'br-selected br-current': 2 <= reviewTraficRating }"
                                 @click="traficRatingChange(2)"></a>
                              <a :class="{ 'br-selected br-current': 3 <= reviewTraficRating }"
                                 @click="traficRatingChange(3)"></a>
                              <a :class="{ 'br-selected br-current': 4 <= reviewTraficRating }"
                                 @click="traficRatingChange(4)"></a>
                              <a :class="{ 'br-selected br-current': 5 <= reviewTraficRating }"
                                 @click="traficRatingChange(5)"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-4 ps-5">
                     <h6>
                        <feather type="home" size="15" class="pe-2" />치안점수
                     </h6>
                  </div>
                  <div class="col-4">
                     <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                           <div class="br-widget">
                              <a :class="{ 'br-selected br-current': 1 <= reviewSafetyRating }"
                                 @click="safetyRatingChange(1)"></a>
                              <a :class="{ 'br-selected br-current': 2 <= reviewSafetyRating }"
                                 @click="safetyRatingChange(2)"></a>
                              <a :class="{ 'br-selected br-current': 3 <= reviewSafetyRating }"
                                 @click="safetyRatingChange(3)"></a>
                              <a :class="{ 'br-selected br-current': 4 <= reviewSafetyRating }"
                                 @click="safetyRatingChange(4)"></a>
                              <a :class="{ 'br-selected br-current': 5 <= reviewSafetyRating }"
                                 @click="safetyRatingChange(5)"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-4 ps-5">
                     <h6>
                        <feather type="shopping-cart" size="15" class="pe-2" />상가점수
                     </h6>
                  </div>
                  <div class="col-4">
                     <div class="rating-container">
                        <div class="br-wrapper br-theme-fontawesome-stars">
                           <div class="br-widget">
                              <a :class="{ 'br-selected br-current': 1 <= reviewStoreRating }"
                                 @click="storeRatingChange(1)"></a>
                              <a :class="{ 'br-selected br-current': 2 <= reviewStoreRating }"
                                 @click="storeRatingChange(2)"></a>
                              <a :class="{ 'br-selected br-current': 3 <= reviewStoreRating }"
                                 @click="storeRatingChange(3)"></a>
                              <a :class="{ 'br-selected br-current': 4 <= reviewStoreRating }"
                                 @click="storeRatingChange(4)"></a>
                              <a :class="{ 'br-selected br-current': 5 <= reviewStoreRating }"
                                 @click="storeRatingChange(5)"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button @click="reviewRegister" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">수정</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";

Vue.use(CKEditor).use(VueAlertify);

export default {
   data() {
      return {      
         reviewId: '',   
         reviewContent: '',
         reviewTraficRating: 1,
         reviewSafetyRating: 1,
         reviewStoreRating: 1,
         CKEditor: null,
      }
   },
   methods: {
      reviewRegister() {
         console.log("review register 'post'");
         console.log(this.reviewTraficRating + " " + this.reviewSafetyRating + " " + this.reviewStoreRating);
         this.$emit('call-parent-register-close');
      },
      traficRatingChange(rating){
         this.reviewTraficRating = rating;
      },
      safetyRatingChange(rating){
         this.reviewSafetyRating = rating;
      },
      storeRatingChange(rating){
         this.reviewStoreRating = rating;
      }
   },
   async mounted() {
      try {
         this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorModify"));
      } catch (error) {
         console.error(error);
      }
   },
   created(){
      this.reviewId = '';
      this.reviewContent = '';
      this.reviewTraficRating = 1;
      this.reviewSafetyRating = 1;
      this.reviewStoreRating = 1;    
   }
};
</script>


<style scoped>
.modal >>> .ck-editor__editable {
   min-height: 300px !important;
}

a {
   cursor: pointer;
}
</style>
