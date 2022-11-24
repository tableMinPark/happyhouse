<template>
  <div :id="`menu-${deal.dealId}`" class="col-xl-3 col-sm-6 xl-4" @click.prevent="openMenu">
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
        <div style="float: right">
          <p v-if="!deal.dealComplete">거래중</p>
          <p v-else>거래종료</p>
        </div>
      </div>
    </div>
    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @blur="closeMenu" :style="{ top: top, left: left }">
      <li>거래 완료</li>
      <li @click="Modify">수정</li>
      <li @click="Delete(deal.dealId)">삭제</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"
import { dealDelete } from "@/api/deal"
import VueAlertify from "vue-alertify"

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
    // console.log(this.deal)
    this.element = document.getElementById(`menu-${this.deal.dealId}`)
  },
  methods: {
    Modify() {
      this.$router.push({ name: "houseModify", params: { deal: this.deal } })
    },
    Delete(dealId) {
      this.$alertify.confirm(
        "삭제하시겠습니까?",
        () => {
          dealDelete(
            dealId,
            ({ data }) => {
              console.log(data)
              this.$alertify.success("삭제 완료")
              this.$emit("call-parent-delete")
            },
            (error) => {
              console.error(error)
              this.$alertify.error("서버에 문제가 생겼습니다.")
            }
          )
        },
        () => this.$alertify.error("취소되었습니다.")
      )
    },
    setMenu: function (top, left) {
      // console.log(top, left)
      // console.log(this.element)
      let elementTop = this.element.getBoundingClientRect().top
      let elementLeft = this.element.getBoundingClientRect().left
      // console.log(elementTop, elementLeft)
      // let largestHeight = window.innerHeight - this.$refs.right.offsetHeight - 25
      // let largestWidth = window.innerWidth - this.$refs.right.offsetWidth - 25
      // console.log(top, largestHeight)
      // console.log(left, largestWidth)
      // if (top > largestHeight) top = largestHeight

      // if (left > largestWidth) left = largestWidth
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

<style>
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
