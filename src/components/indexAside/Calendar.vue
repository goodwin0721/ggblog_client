<template>
  <div class="test" style="overflow: auto;">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
.test /deep/ .el-calendar-table .el-calendar-day{
  width: 100px;
  height: 40px;
}
</style>
