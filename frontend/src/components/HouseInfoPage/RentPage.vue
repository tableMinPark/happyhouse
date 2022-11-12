<template>
  <div>
    월세
    <div>{{ searchWord }}</div>
  </div>
</template>

<script>
export default {
  props: ["searchWord"],
  watch: {
    searchWord(newSearchWord) {
      if (newSearchWord != "") {
        console.log("월세 검색" + newSearchWord);
      }
    },
  },
};
</script>

<style></style>
