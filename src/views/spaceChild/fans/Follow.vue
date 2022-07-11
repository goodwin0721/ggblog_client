<template>
  <div class="follow-model">
    <div v-if="this.$route.params.userId === userId">
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的关注" name="follow">
          <ul class="ul-follow-list">
            <li v-for="follow in followList" :key="follow.id">
              <div>
                <el-row :gutter="10" class="row-follow-list">
                  <el-col :span="3">
                    <el-link :underline="false" :href="'/space/'+follow.id + '/index'" target="_blank" rel="opener">
                      <el-avatar class="follow-avatar" :size="60" :src="showAvatar(follow.avatar)"></el-avatar>
                    </el-link>
                  </el-col>
                  <el-col :span="17">
                    <el-link :underline="false"  :href="'/space/'+follow.id + '/index'" target="_blank" rel="opener">
                      <span class="follow-username">{{follow.username}}</span>
                    </el-link>
                    <p class="follow-signature">{{follow.signature}}</p>
                  </el-col>
                  <el-col :span="4" class="btn-follow-box">
                    <el-button class="btn-follow" type="info">已订阅</el-button>
                  </el-col>
                </el-row>
              </div>
              <hr>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="最近关注" name="recently">
          最近关注
        </el-tab-pane>
        <el-tab-pane label="经常访问" name="often"  :disabled="true">
          经常访问
        </el-tab-pane>
      </el-tabs>

    </div>
    <div v-else>
      <el-tabs v-model="activeName">
        <el-tab-pane label="TA的关注" name="follow">
          <ul class="ul-follow-list">
            <li v-for="follow in followList" :key="follow.id">
              <div>
                <el-row :gutter="10" class="row-follow-list">
                  <el-col :span="3">
                    <el-link :underline="false" target="_blank" rel="opener" :href="'/space/'+follow.userId + '/index'">
                      <el-avatar class="follow-avatar" :size="60" :src="showAvatar(follow.avatar)"></el-avatar>
                    </el-link>
                  </el-col>
                  <el-col :span="17">
                    <el-link :underline="false" target="_blank" rel="opener" :href="'/space/'+follow.id + '/index'">
                      <span class="follow-username">{{follow.username}}</span>
                    </el-link>
                    <p class="follow-signature">{{follow.signature}}</p>
                  </el-col>
                  <el-col :span="4" class="btn-follow-box">
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
  name: "Follow",
  data() {
    return {
      userId:localStorage.getItem('userId'),
      activeName: 'follow',
      followList:[]
    };
  },
  mounted() {
    this.getFollowList();
  },
  watch:{
    '$route':{
      handler(){
        this.getFollowList();
      }
    }
  },
  methods: {
    getFollowList(){
      this.axios.get("/api/fans/followList/" + this.$route.params.userId).then(res=>{
        if (res){
          this.followList = res.data;
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
.follow-model{
  margin: 10px 100px;
  padding: 20px;
  background-color: #ffffff;
  min-height: 90%;
}
.ul-follow-list{
  list-style: none;
  padding: 0;
}
.ul-follow-list li{
  text-align: left;
  text-decoration: none;
  margin:  10px;
}
.row-follow-list{
  height: 105px;
  padding: 10px ;
  margin: 0;
}
.follow-avatar{
  margin: 10px;
}
.follow-username{
  color: #fa7bf7;
  font-size: 25px;
}
.follow-signature{
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: #797975;
}
.btn-follow-box{
  text-align: right;

}
</style>
