<template>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header pb-0">
        <h5>Vertical Scroll</h5>
      </div>
      <div class="card-body">
        <div
          class="vertical-scroll scroll-demo ps-container ps-theme-default ps-active-y"
        >
          <h4>{{ dealKind }}</h4>
          <p v-if="searchWord != ''">검색어 : {{ searchWord }}</p>

          <!--scroll bar-->
          <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px">
            <div
              class="ps-scrollbar-x"
              tabindex="0"
              style="left: 0px; width: 0px"
            ></div>
          </div>
          <div
            class="ps-scrollbar-y-rail"
            style="top: 0px; height: 298px; right: 3px"
          >
            <div
              class="ps-scrollbar-y"
              tabindex="0"
              style="top: 0px; height: 95px"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchList: [],
    };
  },
  props: ["dealKind", "searchWord"],
  watch: {
    searchWord(newSearchWord) {
      if (newSearchWord != "") {
        console.log("전세 검색" + newSearchWord);
      }
    },
  },
};
</script>

<style></style>
