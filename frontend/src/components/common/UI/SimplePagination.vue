<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li v-if="offset > 0" class="page-item">
        <a class="page-link" @click="goPrev">Previous</a>
      </li>

      <li v-if="limit == itemNum" class="page-item">
        <a class="page-link" @click="goNext">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["offset", "limit", "itemNum"],
  methods: {
    goPrev() {
      this.$emit("call-parent-prev")
    },
    goNext() {
      this.$emit("call-parent-next")
    },
  },
}
</script>

<style>
.pagination>li>a {
  color: #41b65c;
}
</style>
