<template>
  <div>
    {{ noticeId }}번 공지
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeId: '',
    };
  },
  components: {
  },
  mounted () {
    this.noticeId = this.$route.params.noticeId;
 }
};
</script>

<style></style>
