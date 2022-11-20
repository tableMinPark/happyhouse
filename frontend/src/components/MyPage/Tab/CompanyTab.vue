<template>
  <div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs border-tab" id="top-tab" role="tablist">
                    <li class="nav-item"><a class="nav-link" :class="{ active: tabSelect == 1 }"
                            @click="tabSelecting(1)"><i class="icofont icofont-ui-home"></i>매물 관리</a></li>
                    <li class="nav-item"><a class="nav-link" :class="{ active: tabSelect == 2 }"
                            @click="tabSelecting(2)"><i class="icofont icofont-man-in-glasses"></i>프로필수정</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-icontabContent">
                    <div class="tab-pane fade active show" id="bookmark" role="tabpanel"
                        aria-labelledby="pills-iconhome-tab">
                        <profile-house-list-page v-if="tabSelect == 1"></profile-house-list-page>
                        <profile-modify-page v-if="tabSelect == 2"></profile-modify-page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProfileModifyPage from '@/components/MyPage/TabModule/ProfileModifyPage.vue';
import ProfileHouseListPage from '@/components/MyPage/TabModule/ProfileHouseListPage.vue';

export default {
    components: {        
        ProfileHouseListPage,
        ProfileModifyPage
    },
    data() {
        return {
            tabSelect: 1,
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

</style>