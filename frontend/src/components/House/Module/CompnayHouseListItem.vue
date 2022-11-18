<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
      <div class="product-box">
        <div class="product-details">
          <router-link :to="`/houseinfo/${deal.dealId}`">
            <h4><span class="badge bg-primary me-2 text-light">월세</span>삼정그린코아</h4>
          </router-link>
          <p>부산시 강서구 녹산동 1627-5</p>
          <div class="product-price">$1,999,999</div>
        </div>

        <!-- <router-link :to="`/houseinfomodify/${deal.dealId}`"> -->
        <router-link :to="{ name: 'houseinfomodify', params: { deal: deal } }">
          <div type="button" class="btn btn-sm btn-primary float-end">수정</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deal"],
  data() {
    return {
      houseInfo: null,
    }
  },
}
</script>

<style></style>
