<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
      <div class="product-box">
        <div class="product-details">
          <router-link :to="`/houseinfo/${deal.dealId}`">
            <h4>
              <span class="badge bg-primary me-2 text-light">{{ dealKind }}</span
              >{{ deal.houseName }}
            </h4>
          </router-link>
          <p>{{ houseAddress }}</p>
          <div class="product-price">$ {{ deal.dealPrice }}</div>
        </div>
        <router-link :to="{ name: 'houseModify', params: { deal: deal } }">
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
  computed: {
    dealKind: function () {
      if (this.deal.code == "100") return "전세"
      if (this.deal.code == "200") return "월세"
      return "매매"
    },
    houseAddress: function () {
      if (this.deal.houseDongName == "undefined") return this.deal.houseSidoName + " " + this.deal.houseGugunName + " " + this.deal.houseJibun
      return this.deal.houseSidoName + " " + this.deal.houseGugunName + " " + this.deal.houseDongName + " " + this.deal.houseJibun
    },
  },
}
</script>

<style></style>
