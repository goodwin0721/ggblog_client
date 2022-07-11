<template>
<div class="edit-main">
  <el-tabs v-model="activeName">
<!--  <el-tabs v-model="activeName" @tab-click="handleClick">-->
    <el-tab-pane label="专栏投稿" name="text">
      <el-tabs v-model="textEdit" class="edit-main-content">
        <el-tab-pane label="专栏投稿" name="newText">
          <text-edit></text-edit>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="draft">还没有草稿</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="视频投稿" name="video">未完成</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import textEdit from './TextEdit'
export default {
  name: "Edit",
  data(){
    return{
      activeName:"text",
      textEdit:"newText"
    }
  },
  components:{
    textEdit
  },
  methods: {
   /* handleClick(tab, event) {
      console.log(tab, event);
    }*/
  }
}
</script>

<style scoped>
.edit-main{
  margin: 10px 50px;
  padding:10px 10px;
  background-color: #fafafa;
  box-shadow: 0px 0px 20px #efeab6;
}
.edit-main-content{
  padding: 10px 80px;
}
</style>
