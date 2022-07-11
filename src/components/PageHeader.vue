<template>
  <div id="pageHeader">
    <el-row :gutter="20">
      <el-col :span="2">
        <icon></icon>
      </el-col>
      <el-col :offset="0" :span="4">
        <div class="page-header-component">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-link :underline="false"
                       class="page-header-link"
                       href="/index">
                首页
              </el-link>
            </el-col>
            <el-col :span="8">
              <el-link :underline="false" @click="toRecommend()"
                       class="page-header-link">
                广场
              </el-link>
            </el-col>
            <el-col :span="8">
              <el-link :underline="false" @click="toFollow()"
                       class="page-header-link">
                关注
              </el-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :offset="1" :span="8" >
  <!--  <search @mainView="view"></search>-->
        <div class="page-header-component">
          <search></search>
        </div>

      </el-col>
      <el-col :offset="1" :span="8">
        <div>
          <el-row :gutter="20">
            <el-col :span="4"><avatar></avatar></el-col>
            <el-col :span="4"><message></message></el-col>
            <el-col :span="4"><star></star></el-col>
            <el-col :span="4"><help></help></el-col>
            <el-col :offset="1"  :span="7"><write></write></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import icon from "./header/Icon";
import search from "./header/Search";

import avatar from "./header/Avatar";
import star from "./header/Star";
import message from "./header/Message";
import write from "./header/Write";
import help from "./header/Help";

export default {
  name: "PageHeader",
  components:{icon,search,avatar,star,message,help,write},
  methods:{
    toRecommend(){
      this.$router.push('/recommend');
    },
    toFollow(){
      this.$router.push('/follow');
    }
    /*view(data){
      // console.log(data);
      this.$emit('getView',data);
    },
    myFollow(userId){
      this.view("myFollow");
      this.$router.push(
        {
          name: 'myFollow',
          params: {
            userId:userId
          }
        });
    }*/
  }
}
</script>

<style>
.page-header-component{
  height: 55px;
  width: 100%;
  text-align:center;
}
.page-header-link{
  font:28px  '新宋体',"Arial Black";
  color: #d57909;
  line-height: 55px;
}
</style>
