<template>
  <div class="dropzone digits dz-clickable" id="multiFileUpload" @dragover="onDragover" @drop="onDrop" @click="onClick">
    <div class="m-0 dz-message needsclick">
      <i class="icon-cloud-up"></i>
      <h6 class="mb-0">Drop files here or click to upload.</h6>
    </div>
    <input type="file" style="visibility: hidden" ref="fileInput" class="file-upload-input" @change="onFileChange"
      multiple />

    <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
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
      event.preventDefault()
    },
    onDrop(event) {
      event.preventDefault()
      this.isDragged = false
      const files = event.dataTransfer.files
      this.changeFile(files)
      this.$emit("call-parent-upload-img", files)
    },
    onFileChange(event) {
      const files = event.target.files
      this.changeFile(files)
      this.$emit("call-parent-upload-img", files)
    },
  },
}
</script>

<style>

</style>
