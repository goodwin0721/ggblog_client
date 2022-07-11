<template>
  <div>
    <br>
    <el-card>
      <bgm></bgm>
    </el-card>
    <br>
    <el-card>
      <span style="color: coral;font-size: 15px"> >>广告栏<<</span>
      <el-card>假装我是个广告</el-card>
    </el-card>
    <br>
    <el-card>
      <links></links>
    </el-card>
    <br>
    <el-card>
      <calendar class="el-card"></calendar>
    </el-card>
  </div>
</template>

<script>
import bgm from "./indexAside/BGM";
import links from "./indexAside/Links";
import calendar from "./indexAside/Calendar";
export default {
  name: "IndexAside",
  components:{bgm,links,calendar}
}
</script>

<style scoped>

</style>
