<template>
  <div :id="`menu-${deal.dealId}`" class="col-xl-3 col-sm-6 xl-4" @contextmenu.prevent="openMenu">
    <div class="card">
      <div class="product-box">
        <div class="product-details">
          <router-link :to="`/houseinfo/${deal.dealId}`">
            <h4 class="name">
              <span class="badge bg-primary me-2 text-light">{{ deal | formatDeal }}</span>{{ deal.houseName }}
            </h4>
          </router-link>
          <p class="name">{{ deal | formatAddress }}</p>
          <div v-if="deal.code === '100'" class="product-price">$ {{ deal.dealDeposit | formatPrice }} 만원</div>
          <div v-else-if="deal.code === '200'" class="product-price">$ {{ deal.dealDeposit | formatPrice }} / {{
              deal.dealPrice | formatPrice
          }}만원</div>
          <div v-else class="product-price">$ {{ deal.dealPrice | formatPrice }} 만원</div>
        </div>
        <div style="float: right">
          <h6 v-if="!deal.dealComplete"><span class="badge bg-secondary me-2 text-light">거래중</span></h6>
          <h6 v-else><span class="badge bg-danger me-2 text-light">거래종료</span></h6>
        </div>
      </div>
    </div>
    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @blur="closeMenu"
      :style="{ top: top, left: left }">
      <li @click="finish(deal.dealId)">거래 완료</li>
      <li @click="Modify">수정</li>
      <li @click="Delete(deal.dealId)">삭제</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"
import { dealDelete, dealChange } from "@/api/deal"
import VueAlertify from "vue-alertify"
import store from "@/store"

Vue.use(VueAlertify)
export default {
  props: ["deal"],
  components: {},
  data() {
    return {
      houseInfo: null,
      viewMenu: false,
      top: "0px",
      left: "0px",
      element: null,
    }
  },
  async mounted() {
    this.element = document.getElementById(`menu-${this.deal.dealId}`)
  },
  methods: {
    finish(dealId) {
      this.$alertify.confirm(
        "거래완료로 등록하시겠습니까?",
        () => {
          dealChange(
            dealId,
            () => {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `변경 성공!!`,
                alertMessage: "",
              });
              this.$router.go();
            },
            (error) => {
              console.error(error)
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `변경 실패!`,
                alertMessage: "잠시후 다시시도 해주세요.",
              });
            }
          )
        },
      ).setHeader('매물 거래완료 등록')
    },
    Modify() {
      this.$router.push({ name: "houseModify", params: { deal: this.deal } })
    },
    Delete(dealId) {
      this.$alertify.confirm(
        "삭제하시겠습니까?",
        () => {
          dealDelete(
            dealId,
            () => {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `삭제 성공!!`,
                alertMessage: "",
              });
              this.$router.go();
            },
            (error) => {
              console.error(error)
              store.dispatch("commonStore/alertMessage", {
                alertTitle: `삭제 실패!`,
                alertMessage: "잠시후 다시시도 해주세요.",
              });
            }
          )
        },
      ).setHeader('매물 삭제')
    },
    setMenu: function (top, left) {
      let elementTop = this.element.getBoundingClientRect().top
      let elementLeft = this.element.getBoundingClientRect().left

      top = top - elementTop
      left = left - elementLeft
      console.log(top, left)
      this.top = top + "px"
      this.left = left + "px"
    },

    closeMenu: function () {
      this.viewMenu = false
    },

    openMenu: function (e) {
      this.viewMenu = true
      this.$nextTick(
        function () {
          this.$refs.right.focus()
          this.setMenu(e.y, e.x)
        }.bind(this)
      )
    },
  }
}
</script>

<style>
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h1 {
  font-size: 3em;
}

.center {
  text-align: center;
}

#right-click-menu {
  background: #fafafa;
  border: 1px solid #bdbdbd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 250px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 5px 35px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1e88e5;
  color: #fafafa;
}
</style>
