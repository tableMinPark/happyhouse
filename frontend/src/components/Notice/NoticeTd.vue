<template>
  <tr style="cursor: pointer" :class="{ importance: important }" @click="noticeDetail(notice.boardId)">
    <th>{{ notice.boardId }}</th>
    <td><span v-if="important">[필독] </span>{{ notice.boardTitle }}</td>
    <td>{{ notice.userName }}</td>
    <td>{{ notice.boardRegDt | formatDate }}</td>
  </tr>
</template>

<script>
export default {
  props: ["important", "notice"],
  methods: {
    noticeDetail(boardId) {
      this.$router.push({
        name: "noticeDetail",
        params: { noticeId: boardId },
      });
    },
  },
};
</script>

<style>
th,
td {
  text-align: center;
}

.importance {
  background-color: #e8f8f5;
}
</style>
