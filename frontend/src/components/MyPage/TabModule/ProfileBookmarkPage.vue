<template>
  <div class="table-responsive"> 
    <table class="table">
      <tbody>
        <tr v-for="(bookmark, index) in bookmarkList" :key="index" >
          <td>
            <router-link :to="`/houseinfo/${bookmark.dealId}`"><div class="task_desc_0">{{ bookmark.houseName}}</div></router-link>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.houseGugunName }} {{ bookmark.houseDongName }}</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.dealArea }} 평</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.dealPrice }}</div>
          </td>
          <td v-if="isMyPage">
            <a @click="bookmarkDelete(bookmark.bookmarkId)">
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
    ...mapState("myPageStore", ["isMyPage", "bookmarkList"]),
  },
  methods: {
    ...mapActions("myPageStore", ["getBookmarkList", "deleteBookmark"]),
    async bookmarkDelete(bookmarkId) {
      await this.deleteBookmark(bookmarkId);
    }
  },
  async created() {
      await this.getBookmarkList();
      console.log(this.bookmarkList)
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