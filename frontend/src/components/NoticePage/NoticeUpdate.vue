<template>
  <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">공지사항 등록</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="titleInsert" class="form-label">제목</label>
            <input v-model="retitle" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="contentInsert" class="form-label">내용</label>
          </div>
          <!-- CKEditor -->
          <div id="noticeEditorUpdate"></div>
          <div class="form-check"></div>
          <input v-model="reimportant" class="form-check-input" type="checkbox" id="important" />
          <label class="form-check-label ms-2" for="important"> 중요공지 </label>
          <button @click="noticeUpdate" type="button" class="btn btn-sm btn-primary float-end">수정</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import CKEditor from "@ckeditor/ckeditor5-vue2"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import VueAlertify from "vue-alertify"
// import http from "@/common/axios.js";
Vue.use(CKEditor).use(VueAlertify)
export default {
  data() {
    return {
      retitle: "",
      CKEditor: null,
      reimportant: false,
    }
  },
  props: ["noticeId", "title", "content", "important"],
  methods: {
    initUI() {
      this.retitle = this.title
      this.CKEditor.setData(this.content)
      this.reimportant = this.important
    },

    noticeUpdate() {
      // let formData = new FormData();
      // formData.append("title", this.title);
      // formData.append("content", this.CKEditor.getData());

      // let attachFiles = document.querySelector("#inputFileUploadInsert").files;
      // if (attachFiles.length > 0) {
      //   const fileArray = Array.from(attachFiles);
      //   fileArray.forEach((file) => formData.append("file", file));
      // }

      // let options = {
      //   headers: { "Content-Type": "multiple/form-data" },
      // };

      // try {
      //   let response = await http.post("/boards", formData, options);
      //   let { data } = response;
      //   console.log(data);
      //   //interceptor session check fail
      //   if (data.result == "login") {
      //     this.$router.push("/login");
      //   } else {
      //     //등록 성공
      //     this.$alertify.success("글이 등록되었습니다.");
      //     this.closeModal();
      //   }

      // } catch (error) {
      //   this.$alertify.error("문제가 발생했습니다.");
      //   console.error(error);
      // }
      this.closeModal()
    },
    closeModal() {
      console.log("title : ", this.title, "content : ", this.CKEditor.getData(), "important : ", this.important)
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#noticeEditorUpdate"))
    } catch (error) {
      console.error(error)
    }

    //bootstrap event 처리자 등록
    // show.bs.modal <= 해당 모달 창이 show될 때 호출
    let $this = this
    this.$el.addEventListener("show.bs.modal", function () {
      // 현 시점의 this 는 event cjflwk , vue component가 아니다.
      $this.initUI()
    })
  },
}
</script>

<style>
.ck-editor__editable[role="textbox"] {
  /* editing area */
  min-height: 200px;
}

.thumbnail-wrapper {
  margin-top: 5px;
}

.thumbnail-wrapper img {
  width: 100px !important;
  margin-top: 5px;
  max-width: 100%;
}
</style>
