<template>
  <div>
    <el-popover
      placement="bottom-end"
      title="标题"
      trigger="hover"
      width="200">
      <div>这里写内容</div>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
      </div>
      <el-button slot="reference" type="text" icon="el-icon-house" style="font-size: 20px;font-family: '新宋体',serif">
        首页
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "GoIndex"
}
</script>

<style scoped>
</style>
