<template>
  <div>
    {{ bd }}번 공지 {{ i }}
    <notice-body></notice-body>
  </div>
</template>

<script>
import NoticeBody from "@/components/NoticePage/NoticeBody.vue";
export default {
  data() {
    return {
      bd: this.$route.params.num,
      i: "",
    };
  },
  components: {
    NoticeBody,
  },
  mounted() {
    this.i = this.$route.params.num;
  },
};
</script>

<style></style>
