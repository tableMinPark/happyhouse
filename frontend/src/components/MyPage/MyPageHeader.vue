<template>
  <div class="row">
    <div class="col-sm-12">
        <div class="card custom-card pt-3">
            <div class="card-profile"><img class="rounded-circle" :src="userInfo.userProfileImageUrl" alt=""></div>
            <div class="text-center profile-details m-3 mb-0">
                <h4>{{ userInfo.userName }}</h4>
                <h6 class="mb-2">{{ userInfo.userRegDt }}</h6>
                <h6>{{ userInfo.userCodeName }}</h6>

                <!-- 친구페이지를 방문했을 때 -->
                <button v-if="followingCheck(userInfo.userId)" class="btn btn-primary mb-4">
                    <span v-if="true">Follow</span>
                    <span v-else>Unfollow</span>
                </button>
            </div>
            <div class="card-footer row">
                <div class="col-6 col-sm-6">
                    <h6>Following</h6>
                    <h3 class="counter">{{ userInfo.userFollowing }}</h3>
                </div>
                <div class="col-6 col-sm-6">
                    <h6>Follwer</h6>
                    <h3 class="counter">{{ userInfo.userFollower }}</h3>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    computed: {
        ...mapState("myPageStore", ["isMyPage", "userInfo"]),
        ...mapGetters("myPageStore", ["followingCheck"]),
    }
}
</script>

<style>

</style>