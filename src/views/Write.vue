<template>
  <div>
    <el-container>
      <el-header class="write-header">
        <el-row :gutter="20">
          <el-col :span="2"><icon></icon></el-col>
          <el-col :span="3"><span class="font-write-header">创作中心</span></el-col>
          <el-col :offset="12" :span="6"><avatar style="text-align: right"></avatar></el-col>
        </el-row>
      </el-header>
      <el-aside class="write-aside">
        <el-menu default-active="" class="navigation">
          <el-menu-item index="1" style="padding: 0;width: 99.7%">
           <router-link class="el-icon-s-home navigation-list" :to="'/write/home'">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2" style="padding: 0;width: 99.7%">
            <router-link class="el-icon-edit navigation-list" :to="'/write/edit'">投稿</router-link>
          </el-menu-item>
          <el-menu-item index="3" style="padding: 0;width: 99.7%">
            <router-link class="el-icon-document navigation-list" :to="'/write/manage'">稿件管理</router-link>
          </el-menu-item>
          <el-menu-item index="4" style="padding: 0;width: 99.7%">
            <router-link class="el-icon-s-data navigation-list" :to="'/write/data'">数据中心</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="write-main">
        <div class="main-content">
          <el-backtop target=".write-main">up</el-backtop>
          <router-view></router-view>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import icon from "../components/header/Icon";
import avatar from '../components/header/Avatar'
export default {
  name: "Write",
  components:{icon,avatar},
  methods:{
    home(){
      this.$router.push("/write/home");
    },
    data(){
      this.$router.push("/write/data");
    },
    edit(){
      this.$router.push("/write/edit");
    },
    manage(){
      this.$router.push("/write/manage");
    }
  }
}
</script>

<style scoped>
.write-header {
  background-color: #f6f6df;
  color: #333;
  text-align: center;
  width: 100%;
  height: 50px;
  padding: 2px;
}
.font-write-header{
  line-height: 54px;
  text-align: left;
  font-size: 30px;
}
.write-main{
  background-color: #edf0f3;
  color: #333;
  text-align: center;
  position: absolute;
  right: 8px;
  left: 310px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.write-aside {
  background-color: #f5f5f6;
  color: #333;
  text-align: center;
  position: absolute;
  display: block;
  top: 70px;
  bottom: 0;
  left: 8px;
}
.navigation{
  width: 98%;
  margin: 2px;
}
.navigation-list{
  color: #1c1a1a;
  text-decoration: none;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
