<template>
  <div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
            <ul class="nav nav-tabs border-tab" id="top-tab" role="tablist">
                <li class="nav-item"><a class="nav-link" :class="{active: tabSelect == 1}" @click="tabSelecting(1)"><i class="icofont icofont-ui-home"></i>관심 매물</a></li>
                <li class="nav-item"><a class="nav-link" :class="{active: tabSelect == 2}" @click="tabSelecting(2)"><i class="icofont icofont-contacts"></i>친구</a></li>
            </ul>
            <div class="tab-content" id="pills-icontabContent">
                <div class="tab-pane fade active show" id="bookmark" role="tabpanel" aria-labelledby="pills-iconhome-tab">
                    <profile-bookmark-page v-if="tabSelect == 1" :isMyPage="isMyPage" :userId="userId"></profile-bookmark-page>
                    <profile-follow-page v-if="tabSelect == 2"></profile-follow-page>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import ProfileBookmarkPage from '@/components/MyPage/TabItem/ProfileBookmarkPage.vue';
import ProfileFollowPage from '@/components/MyPage/TabItem/ProfileFollowPage.vue';

export default {
    props: ['isMyPage', 'userId'],
    components: {
        ProfileBookmarkPage,
        ProfileFollowPage
    },
    data() {
        return {
            tabSelect: 1
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