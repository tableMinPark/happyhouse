<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card custom-card pt-3">
                <div class="card-profile"><img class="rounded-circle"
                        v-if="myPageUserInfo.userProfileImageUrl != undefined"
                        :src="require(`@/assets/upload/${myPageUserInfo.userProfileImageUrl}`)"></div>
                <div class="text-center profile-details m-3 mb-0">
                    <h4>{{ myPageUserInfo.userName }}</h4>
                    <h6 class="mb-2">{{ myPageUserInfo.userRegDt | formatDate }} 가입</h6>
                    <h6>{{ getCodeName() }}</h6>
                    <div v-if="!isMyPage">
                        <button v-if="!isFollowing" @click="follow(userInfo.userId)" class="btn btn-primary mb-4">
                            <span>Follow</span>
                        </button>
                        <button v-else @click="unFollow(userInfo.userId)" class="btn btn-primary mb-4">
                            <span>Unfollow</span>
                        </button>
                    </div>

                </div>
                <div class="card-footer row">
                    <div class="col-6 col-sm-6">
                        <h6>Following</h6>
                        <h3 class="counter">{{ myPageUserInfo.following }}</h3>
                    </div>
                    <div class="col-6 col-sm-6">
                        <h6>Follwer</h6>
                        <h3 class="counter">{{ myPageUserInfo.follower }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState("myPageStore", ["myPageUserInfo"]),
        ...mapState("userStore", ["userInfo"]),
        ...mapState("myPageStore", ["isMyPage", "myPageUserInfo", "isFollowing"]),
    },
    methods: {
        ...mapGetters("userStore", ["getCodeName"]),
        ...mapActions("myPageStore", ["followingCheck", "follow", "unFollow"])
    },
    watch: {
        async myPageUserInfo() {
            await this.followingCheck(this.userInfo.userId);
        }
    }
}
</script>

<style>

</style>