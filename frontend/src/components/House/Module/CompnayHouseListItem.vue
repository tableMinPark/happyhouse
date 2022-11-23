<template>
  <div class="col-xl-3 col-sm-6 xl-4">
    <div class="card">
      <div class="product-box">
        <div class="product-details">
          <router-link :to="`/houseinfo/${deal.dealId}`">
            <h4>
              <span class="badge bg-primary me-2 text-light">{{
                dealKind
              }}</span
              >{{ deal.houseName }}
            </h4>
          </router-link>
          <p>{{ houseAddress }}</p>
          <div class="product-price">$ {{ deal.dealPrice }}</div>
        </div>
        <router-link
          :to="{ name: 'houseModify', params: { deal: deal } }"
          v-if="!deal.dealComplete"
        >
          <div type="button" class="btn btn-sm btn-primary float-end">수정</div>
        </router-link>
        <div
          type="button"
          class="btn btn-sm btn-primary float-end"
          @click="Delete(deal.dealId)"
        >
          삭제
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { dealDelete } from "@/api/deal";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);
export default {
  props: ["deal"],
  data() {
    return {
      houseInfo: null,
    };
  },
  methods: {
    Delete(dealId) {
      this.$alertify.confirm(
        "삭제하시겠습니까?",
        () => {
          dealDelete(
            dealId,
            ({ data }) => {
              console.log(data);
              this.$alertify.success("삭제 완료");
              this.$emit("call-parent-delete");
            },
            (error) => {
              console.error(error);
              this.$alertify.error("서버에 문제가 생겼습니다.");
            }
          );
        },
        () => this.$alertify.error("취소되었습니다.")
      );
    },
  },
  computed: {
    dealKind: function () {
      if (this.deal.code == "100") return "전세";
      if (this.deal.code == "200") return "월세";
      return "매매";
    },
    houseAddress: function () {
      if (this.deal.houseDongName == "undefined")
        return (
          this.deal.houseSidoName +
          " " +
          this.deal.houseGugunName +
          " " +
          this.deal.houseJibun
        );
      return (
        this.deal.houseSidoName +
        " " +
        this.deal.houseGugunName +
        " " +
        this.deal.houseDongName +
        " " +
        this.deal.houseJibun
      );
    },
  },
};
</script>

<style></style>
