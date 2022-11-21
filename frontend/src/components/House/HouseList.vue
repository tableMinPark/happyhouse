<template>
  <div>
    <div class="container-fluid">
      <basic-header name="매물"></basic-header>
    </div>
    <div class="container-fluid product-wrapper">
      <div class="product-grid">
        <div class="feature-products">
          <div class="row">
            <!--검색영역-->
            <div class="col-sm-12">
              <div class="form-builder-2-header justify-content-between">
                <!--toggle button-->
                <ul class="nav nav-primary mb-1">
                  <li class="nav-item" @click="selectAll">
                    <a class="nav-link" :class="{ active: selectedAll }"
                      >전체</a
                    >
                  </li>
                  <li class="nav-item" @click="selectCharter">
                    <a class="nav-link" :class="{ active: selectedCharter }"
                      >전세</a
                    >
                  </li>
                  <li class="nav-item" @click="selectRent">
                    <a class="nav-link" :class="{ active: selectedRent }"
                      >월세</a
                    >
                  </li>
                  <li class="nav-item" @click="selectDealing">
                    <a class="nav-link" :class="{ active: selectedDealing }"
                      >매매</a
                    >
                  </li>
                </ul>
                <!--검색창 , 버튼-->
                <form class="form-inline">
                  <div class="me-1 mb-1">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Search"
                      v-model="searchWord"
                    />
                  </div>
                  <button
                    class="btn btn-primary text-center"
                    @click.prevent="search"
                  >
                    <feather type="search" size="15" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="product-wrapper-grid">
          <div class="row">
            <house-list-item
              v-for="(deal, index) in dealList"
              :key="index"
              :deal="deal"
            ></house-list-item>
          </div>
        </div>
        <PaginationUI
          :listRowCount="listRowCount"
          :pageLinkCount="pageLinkCount"
          :currentPageIndex="currentPageIndex"
          :totalListItemCount="totalListItemCount"
          @call-parent-move-page="movePage"
        ></PaginationUI>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";
import HouseListItem from "@/components/House/Module/HouseListItem.vue";
import PaginationUI from "@/components/common/UI/PaginationUI.vue";
import { dealList } from "@/api/deal.js";
export default {
  components: {
    HouseListItem,
    BasicHeader,
    PaginationUI,
  },
  data() {
    return {
      limit: 8,
      offset: 0,

      //pagination
      totalListItemCount: 0,
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,

      dealList: [],

      selected: 0, // All - Charter - Rend - Dealing
      selectedAll: true,
      selectedCharter: false,
      selectedRent: false,
      selectedDealing: false,
      searchWord: "",
    };
  },
  methods: {
    selectAll() {
      console.log("call All");
      this.searchWord = "";
      this.selectedAll = true;
      this.selectedCharter = false;
      this.selectedRent = false;
      this.selectedDealing = false;
      this.selected = "0";
      this.offset = 0;
      this.currentPageIndex = 1;
      this.getList();
    },
    selectCharter() {
      console.log("call charter");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = true;
      this.selectedRent = false;
      this.selectedDealing = false;
      this.selected = "100";
      this.offset = 0;
      this.currentPageIndex = 1;
      this.getList();
    },
    selectRent() {
      console.log("call rent");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = false;
      this.selectedRent = true;
      this.selectedDealing = false;
      this.selected = "200";
      this.offset = 0;
      this.currentPageIndex = 1;
      this.getList();
    },
    selectDealing() {
      console.log("call dealing");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = false;
      this.selectedRent = false;
      this.selectedDealing = true;
      this.selected = "300";
      this.offset = 0;
      this.currentPageIndex = 1;
      this.getList();
    },
    movePage(pageIndex) {
      this.offset = (pageIndex - 1) * this.listRowCount;
      this.currentPageIndex = pageIndex;
      this.getList();
    },
    search() {
      console.log("search " + this.searchWord);
      this.offset = 0;
      this.currentPageIndex = 1;
      this.getList();
    },
    getList() {
      let param = {
        searchType: this.selected,
        searchWord: this.searchWord,
        limit: this.limit,
        offset: this.offset,
      };
      dealList(
        param,
        ({ data }) => {
          this.dealList = data.joinList;
          this.totalListItemCount = data.count;
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style></style>
