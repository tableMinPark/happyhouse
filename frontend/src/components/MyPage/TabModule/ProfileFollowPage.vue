<template>
    <div class="row">
        <div v-for="(userInfo, index) in followingList" :key="index" class="col-sm-4 col-lg-4 col-xl-4">
            <router-link :to="`/profile/${userInfo.userId}`">
                <div class="card custom-card">
                    <div class="card-profile">
                        <img class="rounded-circle" :src="require(`@/assets/upload/${userInfo.userProfileImageUrl}`)"
                            alt="">
                    </div>
                    <div class="text-center profile-details m-3 mb-0">
                        <h4>{{ userInfo.userName }}</h4>
                        <h6 class="mb-2">{{ userInfo.userRegDt }} 가입</h6>
                        <h6>{{ userInfo.code }}</h6>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState("myPageStore", ["followingList"])
    },
    methods: {
        ...mapActions("myPageStore", ["getFollow"])
    },
    async created() {
        await this.getFollow();
    }
}
</script>

<style>

</style>