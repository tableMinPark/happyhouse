<template>
  <div class="container-fluid product-wrapper">
    <div class="product-grid">
      <div class="feature-products mb-2 text-end">
        <router-link
          to="/houseinfo/register"
          class="btn btn-primary text-center"
          >등록</router-link
        >
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
                  <a class="nav-link" :class="{ active: selectedCharter }"
                    >전세</a
                  >
                </li>
                <li class="nav-item" @click="selectRent">
                  <a class="nav-link" :class="{ active: selectedRent }">월세</a>
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
          <compnay-house-list-item
            v-for="(deal, index) in dealList"
            :key="index"
            :deal="deal"
            @call-parent-delete="getList"
          ></compnay-house-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CompnayHouseListItem from "@/components/House/Module/CompnayHouseListItem.vue";
import { getMyDealList } from "@/api/deal";

export default {
  components: {
    CompnayHouseListItem,
  },
  data() {
    return {
      dealList: [],
      selected: "All", // All - Charter - Rend - Dealing
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
    },
    selectCharter() {
      console.log("call charter");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = true;
      this.selectedRent = false;
      this.selectedDealing = false;
    },
    selectRent() {
      console.log("call rent");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = false;
      this.selectedRent = true;
      this.selectedDealing = false;
    },
    selectDealing() {
      console.log("call dealing");
      this.searchWord = "";
      this.selectedAll = false;
      this.selectedCharter = false;
      this.selectedRent = false;
      this.selectedDealing = true;
    },
    search() {
      console.log("search " + this.searchWord);
      this.searchWord = "";
    },
    houseInfoRegister() {
      console.log("houseInfoRegister ");
      this.searchWord = "";
    },
    getList() {
      getMyDealList(
        this.userInfo.userId,
        ({ data }) => {
          console.log(data);
          this.dealList = data.myList.joinList;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
  computed: {
    ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mounted() {
    console.log(this.userInfo);
    this.getList();
  },
};
</script>

<style></style>
