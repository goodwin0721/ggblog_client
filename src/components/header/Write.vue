<template>
  <div class="page-header-component">
<!--    <el-popover
      placement="bottom-end"
      trigger="hover"
      width="200">
      <div>这里写内容</div>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
      </div>
      <el-button slot="reference" icon="el-icon-edit" round
                 class="btn-page-header-write">
        投稿
      </el-button>
    </el-popover>-->
    <el-button slot="reference" icon="el-icon-edit" round
               class="btn-page-header-write" @click="write()">
      投稿
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Write",
  methods:{
    write(){
      this.$router.push('/write/home')
      /*
      let routeData = this.$router.resolve({
          path:"/write/home"
        }
      );
      window.open(routeData.href, '_blank');
      */
    }
  }
}
</script>

<style scoped>
.page-header-component{
  height: 55px;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align:center;
}
.btn-page-header-write{
  height: 100%;
  padding:0 15px;
  font: bold 25px  SimSun;
  background-color: coral;
  color: #E9EEF3;
}
</style>
