<template>
  <div class="page-header">
    <div class="row">
      <div class="col-sm-6">
        <h3>{{ name }}</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">HOME</router-link></li>
          <li class="breadcrumb-item">{{ name }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicHeader',
  props: ['name']
}
</script>

<style>

</style>