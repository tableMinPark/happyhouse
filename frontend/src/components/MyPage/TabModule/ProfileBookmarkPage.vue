<template>
  <div class="table-responsive">
    <h5 v-if="Object.values(bookmarkList).length === 0" class="text-center mt-5 mb-5" style="font-weight: bold;">
      등록된 관심매물 없습니다.</h5>
    <table v-else class="table">
      <tbody>
        <tr v-for="(bookmark, index) in bookmarkList" :key="index">
          <td>
            <router-link :to="`/houseinfo/${bookmark.dealId}`">
              <div class="task_desc_0">{{ bookmark.houseName }}</div>
            </router-link>
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
            <a @click="deleteBookmark(bookmark.dealId)">
              <feather type="trash" size="20" />
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