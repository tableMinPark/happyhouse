<template>
  <div>
    <div class="container-fluid">
      <basic-header name="공지사항"></basic-header>
    </div>
    <div class="container-fluid">
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
                        v-for="index in 3"
                        :key="index"
                        :important="true"
                      ></notice-td>
                      <!--일반 공지, 페이징은 여기서만-->
                      <notice-td
                        v-for="index in 5"
                        :key="index"
                        :important="false"
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
  </div>
</template>

<script>
import BasicHeader from "@/components/common/BasicHeader.vue";
import NoticeTd from "@/components/NoticePage/NoticeTd.vue";

export default {
  name: "BoardInfo",
  data() {
    return {
      importantNotices: [],
      normalNotices: [],
    };
  },
  components: {
    BasicHeader,
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
