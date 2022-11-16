<template>
    <div class="card">
        <div class="container-fruid card-body p-5">
            <div class="row">
                <div class="col-7">
                    <div class="media p-3">
                        <img class="img-50 img-fluid m-r-20 rounded-circle" alt src="assets/images/user/2.png">
                        <div class="media-body mt-2">
                            <h5 class="d-block">박 상 민</h5>
                            <h6 class="d-block">2022.11.11 가입</h6>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="row text-center">
                        <div class="col-6">
                            <h6>
                                <feather type="truck" size="15" class="pe-2" />교통점수
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
                                <feather type="home" size="15" class="pe-2" />치안점수
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
                                <feather type="shopping-cart" size="15" class="pe-2" />상가점수
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
            <div class="row mt-4">
                <div class="col-12">
                    <h6>
                        리뷰 테스트
                    </h6>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>

export default {
    components: {
    },
    data() {
        return {
            selectedReview: null,
            reviewList: null,

            reviewTraficRating: 5,
            reviewSafetyRating: 3,
            reviewStoreRating: 1
        }
    },
    methods: {
        // Delete Review
        reviewDelete(reviewId) {
            console.log("call reviewDelete " + reviewId);
        },
        // Detail Modal show/hide
        showReviewDetail(review) {
            this.selectedReview = review;
            this.reviewDetailModal.show();
        },
        closeReviewDetail() {
            this.reviewDetailModal.hide();
        },
        // Modify Modal show/hide
        showReviewModify(review) {
            this.selectedReview = review;
            this.reviewModifyModal.show();
        },
        closeReviewModify() {
            this.reviewModifyModal.hide();
        },
    },
    created() {
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