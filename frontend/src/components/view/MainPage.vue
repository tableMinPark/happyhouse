<template>
  <!-- Container-fluid starts-->
  <div class="container-fluid">
    <div class="row starter-main">
      <div class="col-sm-12 p-0 m-0">
        <div class="card-header p-0 m-0">
          <img class="p-0 m-0" src="../../assets/image/bg_main.jpg" style="width: 100%; height: 100vh" />
          <div class="conainer header-img-inner">
            <div class="row">
              <div class="col-12 pb-2">
                <h1 style="font-weight: bold; color: white" class="text-center">Happy House</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex m-5">
                <input type="text" v-model="keyword" class="form-control" placeholder="키워드" />
                <button type="button" @click="search" class="btn btn-primary ms-2"><i class="fa fa-search fa-2x"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body"></div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';/

export default {
  data() {
    return {
      keyword: "",
    }
  },
  methods: {
    search() {
      // console.log(this.keyword)
      this.$router.push({ name: "deal", params: { searchWord: this.keyword } })
      this.keyword = ""
    },
  },
}
</script>

<style>
.header-img-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 45vh;
  padding-left: 30%;
  padding-right: 30%;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
