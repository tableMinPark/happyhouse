<template>
  <!--file upload-->
  <div class="dropzone digits dz-clickable" id="multiFileUpload" @dragover="onDragover" @drop="onDrop" @click="onClick">
    <div class="m-0 dz-message needsclick">
      <i class="icon-cloud-up"></i>
      <h6 class="mb-0">Drop files here or click to upload.</h6>
    </div>
    <input type="file" style="visibility: hidden" ref="fileInput" class="file-upload-input" @change="onFileChange" multiple />

    <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
      <!-- vue 방식으로 첨부파일 이미지  thumnail을 넣는 방법-->
      <img v-for="(file, index) in fileList" :key="index" :src="file" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    changeFile(files) {
      //파일 미리보기
      //첨부할 파일 목록
      this.fileList = []

      const fileArray = Array.from(files)
      fileArray.forEach((file) => {
        this.fileList.push(URL.createObjectURL(file))
      })
    },
    onClick() {
      this.$refs.fileInput.click()
    },

    onDragover(event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop(event) {
      // 기본 액션을 막음 (링크 열기같은 것들)
      event.preventDefault()
      this.isDragged = false
      const files = event.dataTransfer.files
      //   this.addFiles(files)
      //   console.log(files)
      this.changeFile(files)
      this.$emit("call-parent-upload-img", files)
    },
    onFileChange(event) {
      const files = event.target.files
      //   this.addFiles(files)
      //   console.log(files)
      this.changeFile(files)
      this.$emit("call-parent-upload-img", files)
    },
  },
}
</script>

<style></style>
