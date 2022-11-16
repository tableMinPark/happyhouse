<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
    <div class="product-box">
        <div class="product-img"><img class="img-fluid" :src="this.$hostname + '/assets/images/ecommerce/01.jpg'" alt=""></div>                        
        <div class="product-details">
        <router-link to="/houseinfo">
            <h4><span class="badge bg-primary me-2 text-light">월세</span>삼정그린코아</h4>
        </router-link>
        <p>부산시 강서구 녹산동 1627-5</p>
        <div class="product-price">$1,999,999</div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      houseInfo: null
    }
  },
}
</script>

<style>

</style>