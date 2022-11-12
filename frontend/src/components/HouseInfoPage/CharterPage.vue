<template>
  <div>
    전세
    <div>{{ searchWord }}</div>
  </div>
</template>

<script>
export default {
  props: ["searchWord"],
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
