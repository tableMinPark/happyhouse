<template>
  <div>
    매매
    <div>{{ searchWord }}</div>
  </div>
</template>

<script>
export default {
  props: ["searchWord"],
  watch: {
    searchWord(newSearchWord) {
      if (newSearchWord != "") {
        console.log("매매 검색" + newSearchWord);
      }
    },
  },
};
</script>

<style></style>
