<template>
<div class="page-header-component">
  <el-popover
    placement="bottom"
    trigger="hover"
    width="200">
    <div>
      有什么问题发邮件到：<br>
      1156045952@qq.com
    </div>
    <el-link slot="reference" :underline="false"
             icon="el-icon-help"
             class="page-header-link"
             href="#">帮助</el-link>
  </el-popover>
</div>
</template>

<script>
export default {
  name: "help"
}
</script>

<style scoped>
.page-header-component{
  height: 55px;
  width: 100%;
  text-align:center;
}
.page-header-link{
  font:18px 新宋体,"Arial Black";
  color: #27aeb3;
  line-height: 55px;
}
</style>
