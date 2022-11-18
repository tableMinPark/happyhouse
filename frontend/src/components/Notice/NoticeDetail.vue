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
    <div style="float: right">
      <button @click="showUpdateModal" type="button" class="btn btn-square btn-outline-primary btn-sm">수정</button>
      <button @click="$router.push('/notice')" type="button" class="btn btn-square btn-outline-primary btn-sm">목록</button>
      <button :class="{ deleteNotice: false }" @click="$router.push('/notice')" type="button" class="btn btn-square btn-outline-primary btn-sm">삭제</button>
    </div>
    <notice-update :noticeId="noticeId" :title="title" :content="content" :important="important"></notice-update>
  </div>
</template>

<script>
import NoticeUpdate from "@/components/Notice/NoticeUpdate.vue"
import { Modal } from "bootstrap"
export default {
  data() {
    return {
      title: "123",
      noticeId: "",
      writer: "",
      content: "",
      date: "",
      important: "",

      updateModal: null,
    }
  },
  components: {
    NoticeUpdate,
  },
  methods: {
    showUpdateModal() {
      this.updateModal.show()
    },
  },
  mounted() {
    this.updateModal = new Modal(document.querySelector("#updateModal"))
    this.noticeId = this.$route.params.noticeId
    //query
    this.writer = this.noticeId + "번 관리자"
    this.content = this.noticeId + "번 관리자가 작성한 글입니다."
  },
}
</script>

<style>
.deleteNotice {
  visibility: hidden;
}
</style>
