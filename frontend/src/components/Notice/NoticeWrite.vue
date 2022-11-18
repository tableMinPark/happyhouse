<template>
  <div
    class="modal fade"
    id="insertModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">공지사항 등록</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="titleInsert" class="form-label">제목</label>
            <input v-model="title" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="contentInsert" class="form-label">내용</label>
          </div>
          <!-- CKEditor -->
          <div id="noticeEditorInsert"></div>
          <div class="form-check"></div>
          <input
            v-model="important"
            class="form-check-input"
            type="checkbox"
            id="important"
          />
          <label class="form-check-label ms-2" for="important">
            중요공지
          </label>
          <button
            @click="noticeInsert"
            type="button"
            class="btn btn-sm btn-primary float-end"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";
import { writeArticle } from "@/api/notice";
import { mapState } from "vuex";
// import userStore from "@/store/modules/userStore";
// import http from "@/common/axios.js";
Vue.use(CKEditor).use(VueAlertify);
export default {
  data() {
    return {
      title: "",
      CKEditor: null,
      important: false,
    };
  },
  methods: {
    initUI() {
      this.title = "";
      this.CKEditor.setData("");
      this.important = false;
      // document.querySelector("#inputFileUploadInsert").value;
    },

    noticeInsert() {
      let params = {
        userId: this.userInfo.userId,
        boardTitle: this.title,
        boardContent: this.CKEditor.getData(),
        important: this.important,
      };
      // console.log(params);
      writeArticle(
        params,
        ({ data }) => {
          console.log(data);
          this.closeModal();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    closeModal() {
      console.log(
        "title : ",
        this.title,
        "content : ",
        this.CKEditor.getData(),
        "important : ",
        this.important
      );
      this.title = "";
      this.CKEditor.setData("");
      this.important = false;
      this.$emit("call-parent");
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(
        document.querySelector("#noticeEditorInsert")
      );
    } catch (error) {
      console.error(error);
    }

    //bootstrap event 처리자 등록
    // show.bs.modal <= 해당 모달 창이 show될 때 호출
    let $this = this;
    this.$el.addEventListener("show.bs.modal", function () {
      // 현 시점의 this 는 event cjflwk , vue component가 아니다.
      $this.initUI();
    });
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
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
