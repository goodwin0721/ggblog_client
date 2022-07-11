<template>
<div>
  <el-card class="data">
    <span>文章数据</span>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">总阅读量</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">总动态数</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">粉丝</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">点赞</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">评论</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-list">
          <p class="data-list-title">收藏</p>
          <p class="data-list-value">1</p>
        </div>
      </el-col>
    </el-row>
  </el-card>

</div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
.data{
  text-align: left;
  font-size: 25px;
  margin-left: 50px;
  width: 800px;
}
.data-list{
  text-align: center;
  background-color: #c6eadf;
  border-radius: 15px;
}
.data-list-title{
  text-align: center;
  font-size: 20px;
  color: #786f6f;
}
.data-list-value{
  font-size: 20px;
  color: #0f42dc;
}
</style>
