<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
      <div class="product-box">
        <div class="product-img">
          <img class="img-fluid" :src="imgPath" alt="" />
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deal"],
  data() {
    return {
      path: "http://localhost:8080/upload/",
      houseInfo: null,
      dongName: "",
    }
  },
  computed: {
    imgPath: function () {
      if (this.deal.fileUrl == null) return this.path + "deal/" + "noImage.png"
      return this.path + this.deal.fileUrl
    },
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
