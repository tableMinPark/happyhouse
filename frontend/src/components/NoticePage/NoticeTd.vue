<template>
  <tr style="cursor: pointer" :class="{ importance: important }">
    <th scope="row">1</th>
    <td><span v-if="important">[필독] </span>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
</template>

<script>
export default {
  props: ["important", "notice"],
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
