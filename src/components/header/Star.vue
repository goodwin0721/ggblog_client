<template>
  <div class="page-header-component">
    <el-popover
      placement="bottom"
      trigger="hover"
      width="200">
      <div>

      </div>

      <el-link slot="reference" :underline="false"
               icon="el-icon-star-on"
               class="page-header-link"
               @click="toStar()">
        收藏
      </el-link>
    </el-popover>
  </div>
</template>

<script>

export default {
  name: "Star",
  data(){
    return{
      userId:localStorage.getItem('userId')
    }
  },
  methods:{
    toStar(){
      this.$router.push('/star/' + this.userId)
    }
  }
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
