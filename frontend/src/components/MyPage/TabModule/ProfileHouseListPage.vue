<template>
  <div class="container-fluid product-wrapper">
    <div class="product-grid">
      <div class="feature-products mb-2 text-end">
        <router-link to="/houseinfo/register" class="btn btn-primary text-center">등록</router-link>
      </div>
      <div class="feature-products">
        <div class="row">
          <!--검색영역-->
          <div class="col-sm-12">
            <div class="form-builder-2-header justify-content-between">
              <!--toggle button-->
              <ul class="nav nav-primary mb-1">
                <li class="nav-item" @click="selectAll">
                  <a class="nav-link" :class="{ active: selectedAll }">전체</a>
                </li>
                <li class="nav-item" @click="selectCharter">
                  <a class="nav-link" :class="{ active: selectedCharter }">전세</a>
                </li>
                <li class="nav-item" @click="selectRent">
                  <a class="nav-link" :class="{ active: selectedRent }">월세</a>
                </li>
                <li class="nav-item" @click="selectDealing">
                  <a class="nav-link" :class="{ active: selectedDealing }">매매</a>
                </li>
              </ul>
              <!--검색창 , 버튼-->
              <form class="form-inline">
                <div class="me-1 mb-1">
                  <input class="form-control" type="text" placeholder="Search" v-model="searchWord" />
                </div>
                <button class="btn btn-primary text-center" @click.prevent="search">
                  <feather type="search" size="15" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="product-wrapper-grid">
        <div class="row">
          <compnay-house-list-item v-for="(deal, index) in dealList" :key="index" :deal="deal"
            @call-parent-delete="getList"></compnay-house-list-item>
        </div>
        <div class="row">
          <simple-pagination :offset="offset" :limit="limit" :itemNum="dealList.length" @call-parent-prev="prev"
            @call-parent-next="next"></simple-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

import CompnayHouseListItem from "@/components/House/Module/CompnayHouseListItem.vue"
import { getMyDealList } from "@/api/deal"
import SimplePagination from "@/components/common/UI/SimplePagination.vue"

export default {
  components: {
    CompnayHouseListItem,
    SimplePagination,
  },
  data() {
    return {
      dealList: [],
      selected: "0",
      selectedAll: true,
      selectedCharter: false,
      selectedRent: false,
      selectedDealing: false,
      searchWord: "",

      offset: 0,
      limit: 8,
    }
  },
  methods: {
    selectAll() {
      this.selected = "0"
      this.searchWord = ""
      this.offset = 0
      this.selectedAll = true
      this.selectedCharter = false
      this.selectedRent = false
      this.selectedDealing = false
      this.getList()
    },
    selectCharter() {
      this.selected = "100"
      this.searchWord = ""
      this.offset = 0
      this.selectedAll = false
      this.selectedCharter = true
      this.selectedRent = false
      this.selectedDealing = false
      this.getList()
    },
    selectRent() {
      this.selected = "200"
      this.searchWord = ""
      this.offset = 0
      this.selectedAll = false
      this.selectedCharter = false
      this.selectedRent = true
      this.selectedDealing = false
      this.getList()
    },
    selectDealing() {
      this.selected = "300"
      this.searchWord = ""
      this.offset = 0
      this.selectedAll = false
      this.selectedCharter = false
      this.selectedRent = false
      this.selectedDealing = true
      this.getList()
    },
    search() {
      this.getList()
      this.offset = 0
    },
    getList() {
      let param = {
        userId: this.userInfo.userId,
        searchType: this.selected,
        searchWord: this.searchWord,
        offset: this.offset,
        limit: this.limit,
      }
      getMyDealList(
        param,
        ({ data }) => {
          this.dealList = data.myList.joinList
        },
        (error) => {
          console.error(error)
        }
      )
    },
    prev() {
      this.offset -= this.limit
      if (this.offset < 0) this.offset = 0
      this.getList()
    },
    next() {
      this.offset += this.limit
      this.getList()
    },
  },

  computed: {
    ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mounted() {
    this.getList()
  },
}
</script>

<style>

</style>
