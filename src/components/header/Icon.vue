<template>
<div class="page-header-component">
  <el-link icon="el-icon-goblet-square-full"
           :underline="false"
           class="page-header-link"
           href="/index">GG</el-link>
</div>
</template>

<script>
export default {
  name: "Icon"
}
</script>

<style scoped>
.page-header-component{
  height:55px;
  width: 100%;
  text-align: center;
}

.page-header-link{
  font:40px "Times New Roman";
  color: #27aeb3;
  line-height: 55px;
}
</style>
