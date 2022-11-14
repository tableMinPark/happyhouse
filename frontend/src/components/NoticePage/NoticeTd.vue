<template>
  <tr
    style="cursor: pointer"
    :class="{ importance: important }"
    @click="noticeDetail(notice.num)"
  >
    <th scope="row">{{ notice.num }}</th>
    <td><span v-if="important">[필독] </span>{{ notice.title }}</td>
    <td>{{ notice.writer }}</td>
    <td>{{ notice.date }}</td>
  </tr>
</template>

<script>
export default {
  props: ["important", "notice"],
  methods: {
    noticeDetail(noticeId) {
      this.$router.push({ name: "noticeDetail", params: { noticeId: noticeId } });
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
