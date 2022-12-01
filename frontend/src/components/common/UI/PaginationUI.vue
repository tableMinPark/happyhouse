<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li v-if="prev" class="page-item">
        <a class="page-link" @click="paginationChanged(startPageIndex - 1)">Previous</a>
      </li>

      <li v-for="index in endPageIndex - startPageIndex + 1" :key="index" class="page-item">
        <a class="page-link" @click="paginationChanged(startPageIndex - 1 + index)">{{ startPageIndex - 1 + index }}</a>
      </li>

      <li v-if="next" class="page-item">
        <a class="page-link" @click="paginationChanged(endPageIndex + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: [
    "listRowCount",
    "pageLinkCount",
    "currentPageIndex",
    "totalListItemCount",
  ],
  computed: {
    pageCount: function () {
      return Math.ceil(this.totalListItemCount / this.listRowCount);
    },

    startPageIndex: function () {
      if (this.currentPageIndex % this.pageLinkCount == 0) {
        return this.currentPageIndex - this.pageLinkCount + 1;
      } else {
        return (
          Math.floor(this.currentPageIndex / this.pageLinkCount) *
          this.pageLinkCount +
          1
        );
      }
    },

    endPageIndex: function () {
      let ret = 0;
      if (this.currentPageIndex % this.pageLinkCount == 0) {
        ret = this.currentPageIndex;
      } else {
        ret =
          Math.floor(this.currentPageIndex / this.pageLinkCount) *
          this.pageLinkCount +
          this.pageLinkCount;
      }
      return ret > this.pageCount ? this.pageCount : ret;
    },

    prev: function () {
      if (this.currentPageIndex <= this.pageLinkCount) {
        return false;
      } else {
        return true;
      }
    },

    next: function () {
      if (
        Math.floor(this.pageCount / this.pageLinkCount) * this.pageLinkCount <
        this.currentPageIndex
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    paginationChanged(pageIndex) {
      this.$emit("call-parent-move-page", pageIndex);
    },
  },
};
</script>

<style>
.pagination>li>a {
  color: #41b65c;
}
</style>
