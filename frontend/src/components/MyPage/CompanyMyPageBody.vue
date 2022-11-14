<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
            <div class="card custom-card pt-3">
                <div class="card-profile"><img class="rounded-circle" :src="profileUrl" alt=""></div>
                    <div class="text-center profile-details m-3 mb-0">
                        <h4>박 상 민</h4>
                        <h6 class="mb-2">2022.12.25 가입</h6>
                        <h6>기업 회원</h6>
                    </div>
                    <div class="card-footer row">
                        <div class="col-6 col-sm-6">
                            <h6>Following</h6>
                            <h3 class="counter">1</h3>
                        </div>
                        <div class="col-6 col-sm-6">
                            <h6>Follwer</h6>
                            <h3 class="counter">1</h3>
                        </div>
                    </div>
            </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-sm-12 col-xl-6 xl-100">
            <div class="card">
                <div class="card-body">
                <ul class="nav nav-tabs border-tab" id="top-tab" role="tablist">
                    <li class="nav-item"><a class="nav-link" :class="{active: tabSelect == 1}" @click="tabSelecting(1)"><i class="icofont icofont-ui-home"></i>매물 관리</a></li>
                    <li class="nav-item"><a class="nav-link" :class="{active: tabSelect == 2}" @click="tabSelecting(2)"><i class="icofont icofont-man-in-glasses"></i>프로필 수정</a></li>
                    <li class="nav-item"><a class="nav-link" :class="{active: tabSelect == 3}" @click="tabSelecting(3)"><i class="icofont icofont-contacts"></i>문의 관리</a></li>
                </ul>
                <div class="tab-content" id="pills-icontabContent">
                    <div class="tab-pane fade active show" id="bookmark" role="tabpanel" aria-labelledby="pills-iconhome-tab">
                        <profile-house-list-page v-if="tabSelect == 1"></profile-house-list-page>
                        <profile-modify-page v-if="tabSelect == 2"></profile-modify-page>
                        <profile-ask-page v-if="tabSelect == 3"></profile-ask-page>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import ProfileHouseListPage from '@/components/MyPage/ProfileHouseListPage.vue';
import ProfileModifyPage from '@/components/MyPage/ProfileModifyPage.vue'
import ProfileAskPage from '@/components/MyPage/ProfileAskPage.vue';


export default {
    components: {
        ProfileHouseListPage,
        ProfileModifyPage,
        ProfileAskPage
    },
    data() {    
        return {
            tabSelect: 1,
            profileUrl: this.$hostname + "/assets/images/user/7.jpg" 
        }
    },
    methods: {
        tabSelecting(select) {
            this.tabSelect = select;
        }
    }
}
</script>

<style>
.nav-item {
    cursor: pointer;
}
</style>