<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-builder-2-header mb-2 justify-content-end">
          <form class="form-inline">
            <div class="me-1 mb-1">
              <select class="form-select" v-model="searchType">
                <option value="T" selected>제목</option>
                <option value="TW">제목 + 작성자</option>
              </select>
            </div>
            <div class="me-1 mb-1">
              <input class="form-control" type="text" placeholder="Search" v-model="searchWord" />
            </div>
            <button class="btn btn-primary text-center" @click.prevent="search">
              <feather type="search" size="15" />
            </button>
          </form>
        </div>
      </div>
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
                    <col span="1" style="width: 10%" />
                    <col span="1" style="width: 60%" />
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
                    <notice-td v-for="(notice, index) in importantNotices" :key="`i-${index}`" :important="true"
                      :notice="notice"></notice-td>
                    <notice-td v-for="(notice, index) in normalNotices" :key="index" :important="false"
                      :notice="notice"></notice-td>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-sm-12 col-lg-12 col-xl-12 text-end">
              <button v-if="isAdmin" class="btn btn-square btn-outline-primary btn-sm mt-3 me-3" type="button"
                data-bs-original-title="" title="" @click="showInsertModal">
                글쓰기
              </button>
            </div>

            <div class="col-sm-12 col-lg-12 col-xl-12">
              <div style="margin: 10px">
                <PaginationUI :listRowCount="listRowCount" :pageLinkCount="pageLinkCount"
                  :currentPageIndex="currentPageIndex" :totalListItemCount="totalListItemCount"
                  @call-parent-move-page="movePage"></PaginationUI>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notice-write @call-parent="closeAfterInsert"></notice-write>
  </div>
</template>

<script>
import NoticeTd from "@/components/Notice/NoticeTd.vue"
import NoticeWrite from "@/components/Notice/NoticeWrite.vue"
import PaginationUI from "@/components/common/UI/PaginationUI.vue"
import { listArticle, listImportant } from "@/api/notice"
import { Modal } from "bootstrap"
import { mapState } from "vuex"

export default {
  name: "BoardInfo",
  data() {
    return {
      limit: 10,
      offset: 0,
      searchType: "T",
      searchWord: "",

      totalListItemCount: 0,
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,

      importantNotices: [],
      normalNotices: [],

      noticeModal: null,
    }
  },
  components: {
    NoticeTd,
    PaginationUI,
    NoticeWrite,
  },
  methods: {
    search() {
      this.callList();
    },
    callList() {
      let params = {
        limit: this.limit,
        offset: this.offset,
        searchType: this.searchType,
        searchWord: this.searchWord,
      }
      listArticle(
        params,
        ({ data }) => {
          this.normalNotices = data.list
          this.totalListItemCount = data.count
        },
        (error) => {
          console.error(error)
        }
      )
    },
    callImportant() {
      listImportant(
        ({ data }) => {
          this.importantNotices = data.list
        },
        (error) => {
          console.error(error)
        }
      )
    },
    movePage(pageIndex) {
      this.offset = (pageIndex - 1) * this.listRowCount
      this.currentPageIndex = pageIndex
      this.callList()
    },
    showInsertModal() {
      this.noticeModal.show()
    },
    closeAfterInsert() {
      this.noticeModal.hide()
      this.callList()
    },
  },
  computed: {
    ...mapState("userStore", ["isAdmin"]),
  },
  created() {
    this.callImportant()
    this.callList()
  },

  mounted() {
    this.noticeModal = new Modal(document.querySelector("#insertModal"))
  },
}
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

#searchBtn {
  cursor: pointer;
}

.writeNotice {
  visibility: hidden;
}
</style>
