<template>
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
                    v-for="(notice, index) in importantNotices"
                    :key="`i-${index}`"
                    :important="true"
                    :notice="notice"
                  ></notice-td>
                  <!--일반 공지, 페이징은 여기서만-->
                  <notice-td
                    v-for="(notice, index) in normalNotices"
                    :key="index"
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
</template>

<script>
import NoticeTd from "@/components/NoticePage/NoticeTd.vue";
export default {
  name: "BoardInfo",
  data() {
    return {
      importantNotices: [
        { num: 1, title: "중요 게시물 1", writer: "관리자", date: "22.11.14" },
        { num: 2, title: "중요 게시물 2", writer: "관리자", date: "22.11.14" },
        { num: 3, title: "중요 게시물 3", writer: "관리자", date: "22.11.14" },
      ],
      normalNotices: [
        { num: 1, title: "중요 게시물 1", writer: "관리자", date: "22.11.14" },
        { num: 2, title: "중요 게시물 2", writer: "관리자", date: "22.11.14" },
        { num: 3, title: "중요 게시물 3", writer: "관리자", date: "22.11.14" },
        { num: 4, title: "일반 게시물 1", writer: "관리자", date: "22.11.14" },
      ],
    };
  },
  components: {
    NoticeTd,
  },
};
</script>

<style>
table th,
td {
  text-align: center;
}
</style>
