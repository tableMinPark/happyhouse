<template>
    <div class="row">
        <div v-for="(user, index) in userList" :key="index" class="col-sm-4 col-lg-4 col-xl-4">
            <router-link :to="'/profile/' + user.userId">
            <div class="card custom-card">
                <div class="card-profile">
                    <img class="rounded-circle" :src="user.userProfileImageUrl" alt="">
                </div>
                <div class="text-center profile-details m-3 mb-0">
                    <h4>{{ user.userName }}</h4>
                    <h6 class="mb-2">{{ user.userRegDt }} 가입</h6>
                    <h6>{{ user.userCodeName }}</h6>
                </div>
            </div>
        </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            userList: null
        }
    },
    computed: {
        ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"])
    },
    created() {
        console.log("read following for " + this.myPageUserInfo.userId);
        // 팔로잉 정보를 받아오는 get
        this.userList = [         
            {
                userId: 2,
                userName: '서우린',
                userRegDt: '2022-12-25',
                userCodeName: '일반회원',                    
                userProfileImageUrl: this.$hostname + "/assets/images/user/8.jpg"
            }
        ]
    }
}
</script>

<style>

</style>