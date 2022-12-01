<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="conainer p-2">
          <div class="row justify-content-between mt-3">
            <div class="col-8 ps-5">
              <h3 style="font-weight: bold;">{{ title }}</h3>
            </div>
            <div class="col-4 text-end">
              <small> 작성자 : {{ writer }} | 작성 일시 : {{ date | formatDate }}</small>
            </div>
          </div>

        </div>
        <div v-html="content" class="col-12 pmt-5 ps-5 mb-5">
        </div>
      </div>
    </div>
    <div>
      <div class="text-end mt-0">
        <button v-if="userInfo.code == 300" @click="showUpdateModal" type="button"
          class="btn btn-square btn-outline-primary btn-sm">수정</button>
        <button @click="$router.push('/notice/list')" type="button"
          class="btn btn-square btn-outline-primary btn-sm">목록</button>
        <button v-if="userInfo.code == 300" :class="{ deleteNotice: false }" @click="deleteNotice" type="button"
          class="btn btn-square btn-outline-primary btn-sm">삭제</button>
      </div>
      <notice-update :noticeId="noticeId" :title="title" :content="content" :important="important"
        @call-parent-update="closeUpdate"></notice-update>
    </div>

  </div>
</template>

<script>
import NoticeUpdate from "@/components/Notice/NoticeUpdate.vue"
import { Modal } from "bootstrap"
import { getArticle, deleteArticle } from "@/api/notice"
import Vue from "vue"
import alertify from "vue-alertify"
import { mapState } from "vuex"
import store from "@/store";

Vue.use(alertify)
export default {
  data() {
    return {
      title: "",
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
    getDetail() {
      getArticle(
        this.noticeId,
        ({ data }) => {
          this.title = data.dto.boardTitle
          this.writer = data.dto.userName
          this.content = data.dto.boardContent
          this.date = data.dto.boardRegDt
          this.important = data.dto.important
        },
        (error) => {
          console.error(error)
        }
      )
    },
    closeUpdate() {
      this.updateModal.hide()
      this.getDetail()
      store.dispatch("commonStore/alertMessage", {
        alertTitle: "공지사항이 수정되었습니다!",
        alertMessage: "",
      });
    },

    deleteNotice() {
      this.$alertify.confirm(
        "공지를 삭제하시겠습니까?",
        () => {
          deleteArticle(
            this.noticeId,
            () => {
              store.dispatch("commonStore/alertMessage", {
                alertTitle: "공지사항 삭제 성공!",
                alertMessage: "",
              });
              this.$router.push("/notice/list")
            },
            (error) => {
              console.error(error)
            }
          )
        },
        () => {
          store.dispatch("commonStore/alertMessage", {
            alertTitle: "공지사항 삭제 실패!",
            alertMessage: "잠시후 다시시도 해주세요.",
          });
        }
      ).setHeader('공지사항 삭제')
    },
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  mounted() {
    this.updateModal = new Modal(document.querySelector("#updateModal"))
    this.noticeId = this.$route.params.noticeId
    //query
    this.getDetail()
  },
}
</script>

<style>
.deleteNotice {
  visibility: hidden;
}
</style>
