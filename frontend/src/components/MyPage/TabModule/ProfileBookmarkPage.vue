<template>
  <div class="table-responsive"> 
    <table class="table">
      <tbody>
        <tr v-for="(bookmark, index) in bookmarkList" :key="index" >
          <td>
            <router-link :to="`/houseinfo/${bookmark.deal.dealId}`"><div class="task_desc_0">{{ bookmark.house.houseName}}</div></router-link>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.house.sidoName }} {{ bookmark.house.gugunName }} {{ bookmark.house.dongName }}</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.deal.dealArea }} 평</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.deal.dealPrice }}</div>
          </td>
          <td v-if="isMyPage">
            <a @click="deleteBookmark(bookmark.bookmarkId)">
              <feather type="trash" size="20"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("myPageStore", ["bookmarkList"]),
  },
  methods: {
    ...mapActions("myPageStore", ["getBookmarkList", "deleteBookmark"]),
  },
  async created() {
      await this.getBookmarkList();
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
td div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
a {
  cursor: pointer;
}
</style>