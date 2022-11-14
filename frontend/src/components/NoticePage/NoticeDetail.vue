<template>
  <div>
    <div class="card">
      <div class="card-header pb-0">
        <h5>{{ noticeId }}번 공지</h5>
        <div style="float: right">
          <small> 작성자 : {{ writer }} | 작성 일시 : 2022-11-15</small>
        </div>
      </div>

      <div class="card-body">
        {{ content }}
      </div>
    </div>

    <button
      @click="$router.push('/notice')"
      type="button"
      class="btn btn-sm btn-primary float-end"
    >
      목록
    </button>
    <button
      :class="{ deleteNotice: false }"
      @click="$router.push('/notice')"
      type="button"
      class="btn btn-sm btn-primary float-end"
    >
      삭제
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeId: "",
      writer: "",
      content: "",
      date: "",
      important: "",
    };
  },
  components: {},
  mounted() {
    this.noticeId = this.$route.params.noticeId;
    //query
    this.writer = this.noticeId + "번 관리자";
    this.content = this.noticeId + "번 관리자가 작성한 글입니다.";
  },
};
</script>

<style>
.deleteNotice {
  visibility: hidden;
}
</style>
