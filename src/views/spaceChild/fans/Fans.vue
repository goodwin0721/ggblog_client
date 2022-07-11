<template>
<div class="fans-model">
  <div v-if="this.$route.params.userId === userId">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的粉丝" name="fans">
        <ul class="ul-fans-list">
          <li v-for="fans in fansList" :key="fans.id">
            <div>
              <el-row :gutter="10" class="row-fans-list">
                <el-col :span="3">
                  <el-link :underline="false" :href="'/space/'+fans.id + '/index'" target="_blank" rel="opener">
                    <el-avatar class="fans-avatar" :size="60" :src="showAvatar(fans.avatar)"></el-avatar>
                  </el-link>
                </el-col>
                <el-col :span="17">
                  <el-link :underline="false"  :href="'/space/'+fans.id + '/index'" target="_blank" rel="opener">
                    <span class="fans-username">{{fans.username}}</span>
                  </el-link>
                  <p class="fans-signature">{{fans.signature}}</p>
                </el-col>
                <el-col :span="4" class="btn-follow-box">
                  <!-- 进空间点关注吧，不想写了 -->
                  <!-- <el-button class="btn-follow" type="primary">订阅</el-button>-->
                </el-col>
              </el-row>
            </div>
            <hr>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="新的粉丝" name="new">
        最近新增粉丝
      </el-tab-pane>
    </el-tabs>

  </div>
  <div v-else>
    <el-tabs v-model="activeName">
      <el-tab-pane label="TA的粉丝" name="fans">
        <ul class="ul-fans-list">
          <li v-for="fans in fansList" :key="fans.id">
            <div>
              <el-row :gutter="10" class="row-fans-list">
                <el-col :span="3">
                  <el-link :underline="false" target="_blank" rel="opener" :href="'/space/'+fans.id + '/index'">
                    <el-avatar class="fans-avatar" :size="60" :src="fans.avatar"></el-avatar>
                  </el-link>
                </el-col>
                <el-col :span="17">
                  <el-link :underline="false" target="_blank" rel="opener" :href="'/space/'+fans.id + '/index'">
                    <span class="fans-username">{{fans.username}}</span>
                  </el-link>
                  <p class="fans-signature">{{fans.signature}}</p>
                </el-col>
                <el-col :span="4" class="btn-follow-box">
                  <!-- 进空间点关注吧，不想写了 -->
                  <!-- <el-button class="btn-follow" type="primary">订阅</el-button>-->
                </el-col>
              </el-row>
            </div>
            <hr>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>

export default {
  name: "Fans",
  data() {
    return {
      userId:localStorage.getItem('userId'),
      activeName: 'fans',
      fansList:[]
    };
  },
  mounted() {
    this.getFansList();
  },
  watch:{
    '$route':{
      handler(){
        this.getFansList();
      }
    }
  },
  methods: {
    getFansList(){
      let id = this.$route.params.userId;
      this.axios.get("/api/fans/fansList/" + id).then(res=>{
        if(res){
          this.fansList = res.data;
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    showAvatar(src){
      if(src === null || src.trim() === ''){
        src = '../../static/img/user-icon.png';
      }
      else{
        src = "http://localhost:8080/ggblog/" + src;
      }
      return src;
    }
  }
}
</script>

<style scoped>
.fans-model{
  margin: 10px 100px;
  padding: 20px;
  background-color: #ffffff;
  min-height: 90%;
}
.ul-fans-list{
  list-style: none;
  padding: 0;
}
.ul-fans-list li{
  text-align: left;
  text-decoration: none;
  margin:  10px;
}
.row-fans-list{
  height: 105px;
  padding: 10px ;
  margin: 0;
}
.fans-avatar{
  margin: 10px;
}
.fans-username{
  color: #fa7bf7;
  font-size: 25px;
}
.fans-signature{
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: #797975;
}
.btn-follow-box{
  text-align: right;

}
</style>
