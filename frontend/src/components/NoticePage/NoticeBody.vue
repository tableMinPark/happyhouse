<template>
  <div>
    <div class="row">
      <!--검색영역-->
      <div class="col-sm-12">
        <div class="form-builder-2-header mb-2 justify-content-end">
          <!--검색창 , 버튼-->
          <form class="form-inline">
            <div class="me-1 mb-1">
              <select class="form-select" v-model="searchType">
                <option value="T" selected>제목</option>
                <option value="TW">제목 + 작성자</option>
              </select>
            </div>
            <div class="me-1 mb-1">
              <input class="form-control " type="text" placeholder="Search" v-model="searchWord"/>
            </div>
            <button class="btn btn-primary text-center" @click.prevent="search">
              <feather type="search" size="15"/>
            </button>
          </form>
        </div>
      </div>
      <!--main-->
      <div class="col-lg-12 col-xl-12 lg-mt">
        <router-view :searchWord="searchWord"></router-view>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-block row">
            <div class="col-sm-12 col-lg-12 col-xl-12">
              <div class="table-responsive">
                <table class="table">
                  <colgroup>
                    <col span="1" style="width: 5%" />
                    <col span="1" style="width: 65%" />
                    <col span="1" style="width: 15%" />
                    <col span="1" style="width: 15%" />
                  </colgroup>
                  <thead class="table-primary">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">제목</th>
                      <th scope="col">작성자</th>
                      <th scope="col">일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!--중요공지-->
                    <notice-td
                      v-for="(notice) in importantNotices"
                      :key="notice.num"
                      :important="true"
                      :notice="notice"
                    ></notice-td>
                    <!--일반 공지, 페이징은 여기서만-->
                    <notice-td
                      v-for="(notice) in normalNotices"
                      :key="notice.num"
                      :important="false"
                      :notice="notice"
                    ></notice-td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeTd from "@/components/NoticePage/NoticeTd.vue";

export default {
  name: "BoardInfo",
  data() {
    return {      
      searchType: 'T',
      searchWord: '',
      importantNotices: [
        { num: 1, title: "중요 게시물 1", writer: "관리자", date: "22.11.14" },
        { num: 2, title: "중요 게시물 2", writer: "관리자", date: "22.11.14" },
        { num: 3, title: "중요 게시물 3", writer: "관리자", date: "22.11.14" },
      ],
      normalNotices: [
        { num: 4, title: "중요 게시물 1", writer: "관리자", date: "22.11.14" },
        { num: 5, title: "중요 게시물 2", writer: "관리자", date: "22.11.14" },
        { num: 6, title: "중요 게시물 3", writer: "관리자", date: "22.11.14" },
        { num: 7, title: "일반 게시물 1", writer: "관리자", date: "22.11.14" },
      ],
    };
  },
  components: {
    NoticeTd,
  },
  methods: {
    search() {
      console.log("call search! " + this.searchType + " " + this.searchWord);
    }
  }
};
</script>

<style>
table th,
td {
  text-align: center;
}
table {
  table-layout: fixed;
}
td {
  white-space:nowrap; 
  text-overflow:ellipsis; 
  overflow:hidden;
}
#searchBtn {
  cursor: pointer;
}
</style>
