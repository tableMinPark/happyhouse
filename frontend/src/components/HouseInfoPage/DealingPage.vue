<template>
  <div class="row">
    <search-result
      v-for="index in 6"
      :key="index"
      :dealKind="dealKind"
      :searchWord="searchWord"
    ></search-result>
  </div>
</template>

<script>
import SearchResult from "./SearchResult.vue";
export default {
  data() {
    return {
      dealKind: "매매",
    };
  },
  props: ["searchWord"],
  components: {
    SearchResult,
  },
};
</script>

<style></style>
