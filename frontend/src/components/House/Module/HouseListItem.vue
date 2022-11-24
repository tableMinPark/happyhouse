<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
      <div class="product-box">
        <div class="product-img">
          <img class="img-fluid" :src="require(`@/assets/upload/${path}`)" id="thImage" alt="" />
        </div>
        <div class="product-details" style="overflow: hidden">
          <router-link :to="`/houseinfo/${deal.dealId}`">
            <h4 class="name">
              <span class="badge bg-primary me-2 text-light">{{ deal | formatDeal }}</span>{{ deal.houseName }}
            </h4>
          </router-link>
          <p>{{ deal | formatAddress }}</p>

          <div class="d-flex justify-content-between">
            <div v-if="deal.code === '100'" class="product-price">$ {{ deal.dealDeposit | formatPrice }} 만원</div>
            <div v-else-if="deal.code === '200'" class="product-price">$ {{ deal.dealDeposit | formatPrice }} / {{
                deal.dealPrice | formatPrice
            }}만원</div>
            <div v-else class="product-price">$ {{ deal.dealPrice | formatPrice }} 만원</div>
            <a v-if="isLogin" @click="registBookmark(userInfo.userId)">
              <i v-if="isBookmarking" class="fa fa-heart fa-2x" size="30"></i>
              <i v-else class="fa fa-heart-o fa-2x"></i>
            </a>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ["deal"],
  data() {
    return {
      path: "deal/noImage.jpg",
      houseInfo: null,
      dongName: "",
    }
  }, computed: {
    ...mapState("userStore", ["isLogin", "isBookmarking"]),
  }
}
</script>

<style>
#ptitle {
  font-size: 10px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#thImage {
  padding: 10px;
  padding-bottom: 0;
  width: 100%;
  max-height: 350px;
}
</style>
