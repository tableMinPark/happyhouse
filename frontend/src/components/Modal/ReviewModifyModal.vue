<template>
   <div class="modal" tabindex="-1" id="reviewModifyModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">글 수정</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="mb-3">
                  <!-- v-model 을 store 와 직접 연결하기 보다 computed-get-set 을 사용(strict mode 에서는 오류 발생) -->
                  <!-- <input v-model="$store.state.board.title" type="text" class="form-control" placeholder="제목"> -->
                  <input v-model="storeTitle" type="text" class="form-control" placeholder="제목" />
               </div>
               <div class="mb-3">
                  <div id="divEditorUpdate"></div>
               </div>
               <!-- 기존 파일 내용 보여줌  -->
               <!-- 새로운 첨부파일은 data-fileList 로 -->
               <div v-if="$store.state.board.fileList.length > 0" class="mb-3">
                  첨부파일 :
                  <span
                     ><div v-for="(file, index) in $store.state.board.fileList" class="fileName" :key="index">{{ file.fileName }}</div></span
                  >
               </div>
               <div class="form-check mb-3">
                  <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadUpdate" />
                  <label class="form-check-label" for="chkFileUploadUpdate">파일 추가</label>
               </div>
               <div class="mb-3" v-show="attachFile" id="imgFileUploadUpdateWrapper">
                  <input @change="changeFile" type="file" id="inputFileUploadUpdate" multiple />
                  <div id="imgFileUploadUpdateThumbnail" class="thumbnail-wrapper">
                     <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->
                     <img v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index" />
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button @click="boardUpdate" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">수정</button>
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

Vue.use(CKEditor).use(VueAlertify);

import http from "@/common/axios.js";

export default {
   name: "UpdateModal",
   // props: ["board"],
   // data 는 CKEditor, attachFile, fileList UI 관련 3개만
   data() {
      return {
         CKEditor: "",
         attachFile: false,
         fileList: [], // store 의 fileList 와 구분됨. 새로 첨부되는 파일을 위한.
      };
   },
   // v-model -title
   computed: {
      storeTitle: {
         get() {
            return this.$store.state.board.title;
         },
         set(title) {
            this.$store.commit("SET_BOARD_TITLE", title);
         },
      },
   },
   methods: {
      // modal 초기화
      initUI() {
         this.CKEditor.setData(this.$store.state.board.content);
         this.attachFile = false;
         this.fileList = [];
         document.querySelector("#inputFileUploadUpdate").value = "";
      },
      changeFile(fileEvent) {
         this.fileList = []; // thumbnail 초기화

         const fileArray = Array.from(fileEvent.target.files);
         fileArray.forEach((file) => {
            this.fileList.push(URL.createObjectURL(file)); // push : array 에 항목 추가
         });
      },
      // 굳이 actions 에 있을 필요 없다. backend async 작업이지만, 그 결과로 store 를 변경하는 내용이 없다.
      async boardUpdate() {
         // post form data
         let formData = new FormData();
         formData.append("boardId", this.$store.state.board.boardId); // update 에 추가
         formData.append("title", this.$store.state.board.title);
         formData.append("content", this.CKEditor.getData()); // store X !!!!

         // file upload
         let attachFiles = document.querySelector("#inputFileUploadUpdate").files;

         if (attachFiles.length > 0) {
            const fileArray = Array.from(attachFiles);
            fileArray.forEach((file) => formData.append("file", file));
         }

         let options = {
            headers: { "Content-Type": "multipart/form-data" },
         };

         // not put, REST but FileUpload
         try {
            let { data } = await http.post("/boards/" + this.$store.state.board.boardId, formData, options);

            console.log("UpdateModalVue: data : ");
            console.log(data);
            if (data.result == "login") {
               this.doLogout();
            } else {
               this.$alertify.success("글이 수정되었습니다.");
               this.closeModal();
            }
         } catch (error) {
            console.log("UpdateModalVue: error ");
            console.log(error);
         }
      },
      closeModal() {
         this.$emit("call-parent-update"); // no parameter
      },
      // logout 처리 별도 method
      doLogout() {
         this.$store.commit("SET_LOGIN", { isLogin: false, userName: "", userProfileImageUrl: "" });
         this.$router.push("/login");
      },
   },
   // modal.show() 이전에 이미 mounted() 호출됨
   async mounted() {
      try {
         this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorUpdate"));
      } catch (error) {
         console.error(error);
      }

      // bootstrap modal show event hook
      // UpdateModal 이 보일 때 초기화
      let $this = this;
      this.$el.addEventListener("show.bs.modal", function () {
         $this.initUI();
      });
   },
   // watch 사용 X
   // props 사용 X
   // watch: {
   //   board : function(){
   //     // props --> data
   //     this.boardId = this.board.boardId;
   //     this.title = this.board.title;
   //     this.CKEditor.setData( this.board.content );
   //     // 아래의 내용을 추가하지 않음
   //     // 기존 파일 내용은 props - board 를 이용
   //     // fileList 는 신규 파일에 적용
   //     //this.fileList = this.board.fileList;

   //     // 첨부 파일 관련 초기화
   //     // 수정 또는 수정 전 첨부 파일을 선택하면 그대로 남아 있다.
   //     this.attachFile = false;
   //     this.fileList = [];
   //   }
   // }
};
</script>

<style scoped>
.modal >>> .ck-editor__editable {
   min-height: 300px !important;
}

.modal >>> .thumbnail-wrapper {
   margin-top: 5px;
}

.modal >>> .thumbnail-wrapper img {
   width: 100px !important;
   margin-right: 5px;
   max-width: 100%;
}
</style>
