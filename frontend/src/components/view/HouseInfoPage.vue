<template>
  <div>
    <div class="container-fluid">
      <basic-header name="매물 조회"></basic-header>
    </div>
    <div class="container-fluid">
      <div class="row">
        <!--검색영역-->
        <div class="col-sm-12">
          <div class="form-builder-2-header">
            <!--toggle button-->
            <div>
              <ul class="nav nav-primary" id="pills-tab" role="tablist">
                <li class="nav-item" @click="selectCharter">
                  <router-link
                    class="nav-link"
                    :class="{ active: selectedCharter }"
                    :to="{ name: 'charter' }"
                    >전세</router-link
                  >
                </li>
                <li class="nav-item" @click="selectRent">
                  <router-link
                    class="nav-link"
                    :class="{ active: selectedRent }"
                    :to="{ name: 'rent' }"
                    >월세</router-link
                  >
                </li>
                <li class="nav-item" @click="selectDealing">
                  <router-link
                    class="nav-link"
                    :class="{ active: selectedDealing }"
                    :to="{ name: 'dealing' }"
                    >매매</router-link
                  >
                </li>
              </ul>
            </div>
            <!--검색창 , 버튼-->
            <div>
              <nav class="navbar navbar-expand-md p-0">
                <form class="form-inline">
                  <div class="me-2">
                    <input
                      class="form-control btn-square"
                      type="text"
                      placeholder="Search"
                      v-model="beforeSearchWord"
                    />
                  </div>
                  <button
                    class="btn btn-primary copy-btn"
                    @click.prevent="search"
                  >
                    <i class="icofont icofont-search"></i>
                  </button>
                </form>
              </nav>
            </div>
          </div>
        </div>
        <!--main-->
        <div class="col-lg-6 col-xl-6 lg-mt">
          <router-view :searchWord="searchWord"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";

export default {
  data() {
    return {
      selectedCharter: true,
      selectedRent: false,
      selectedDealing: false,
      beforeSearchWord: "",
      searchWord: "",
    };
  },
  components: {
    BasicHeader,
  },
  methods: {
    selectCharter() {
      console.log("call charter");
      this.beforeSearchWord = "";
      this.searchWord = "";
      this.selectedCharter = true;
      this.selectedRent = false;
      this.selectedDealing = false;
    },
    selectRent() {
      console.log("call rent");
      this.beforeSearchWord = "";
      this.searchWord = "";
      this.selectedCharter = false;
      this.selectedRent = true;
      this.selectedDealing = false;
    },
    selectDealing() {
      console.log("call dealing");
      this.beforeSearchWord = "";
      this.searchWord = "";
      this.selectedCharter = false;
      this.selectedRent = false;
      this.selectedDealing = true;
    },
    search() {
      this.searchWord = this.beforeSearchWord;
    },
  },
};
</script>

<style></style>
