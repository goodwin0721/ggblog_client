<template>
<div class="space-index">
  <el-backtop target=".space-index"></el-backtop>
  <div class="user-msg">
    <el-descriptions title="用户信息" :column="1" size="medium">
      <el-descriptions-item label="头像">
        <el-avatar :src="avatarSrc(user.avatar)" :size="80">
        </el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="GID">{{user.id}}</el-descriptions-item>
      <el-descriptions-item label="用户名">
        {{user.username}}
      </el-descriptions-item>
      <el-descriptions-item label="性别" >
        <span v-if="user.gender === 1">男</span>
        <span v-if="user.gender === 2">女</span>
      </el-descriptions-item>
      <el-descriptions-item label="出生日期">
        {{user.birthdate}}
      </el-descriptions-item>
      <el-descriptions-item label="联系方式">
        {{user.telephone}}
      </el-descriptions-item>
      <el-descriptions-item label="个人签名">
        {{user.signature}}
      </el-descriptions-item>
      <template slot="extra" v-if="visitUserId !== userId">
        <div v-if="isFollow === true">
          <el-button type="info" size="small" @click="unfollow">已关注</el-button>
        </div>
        <div v-else>
          <el-button type="primary" size="small" @click="follow">关注</el-button>
        </div>
      </template>
    </el-descriptions>
  </div>
  <div class="user-dynamic">
    <h3>最近投稿</h3>
    <el-card>
      <el-link :href="'/details/' + dynamic.dynamicId" :underline="false">
        <span class="title-dynamic-index">{{dynamic.dynamicTitle}}</span>
      </el-link>
      <p class="content-text">{{dynamic.content}}</p>
      <p class="info">{{dynamic.creationTime}}</p>
    </el-card>

  </div>
</div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      user:{
        avatar:'',
        id:"",
        username:"",
        gender:'',
        telephone:"",
        signature:"",
        birthdate:'',
      },
      userId:localStorage.getItem("userId"),
      visitUserId:this.$route.params.userId,
      isFollow:"",
      dynamic:{
        dynamicId:'111',
        dynamicTitle:'123',
        content:'1111111111111',
        creationTime:'2022-2-2 22:22'
      }
    }
  },
  mounted() {
    // window.vue=this;
    this.setIsFollow();
    this.userInit(this.$route.params.userId);
    this.dynamicInit();
    // console.log(new Date().getTime());
  },
  watch: {
    '$route'(newUrl, oldUrl) {
      // console.log(newUrl)
      // console.log(oldUrl)
      // console.log(this.$route.params.userId)
      // console.log(newUrl.params.userId)
      this.visitUserId =this.$route.params.userId;
      // this.userInit(this.$route.params.userId);
      this.userInit();
      this.dynamicInit();
      this.setIsFollow();
    }
  },
  methods:{
    userInit(){
      // console.log("user init")
      this.axios.get("/api/user/uid/" + this.$route.params.userId).then(res=>{
        if(res){
          this.user = res.data;
          // console.log(this.user)
        }
      }).catch(e=>{
        console.log(e)
      }).finally(()=>{

      })
    },
    dynamicInit(){

    },
    setIsFollow(){
      this.axios.post("/api/fans/isFollow",{
        "userId":this.userId,
        "followId":this.visitUserId
      }).then(res=>{
        if(res){
          this.isFollow = res.data;
        }
      })
    },
    follow(){
      this.axios.post("/api/fans/follow",{
        "userId":this.userId,
        "followId":this.visitUserId
      }).then(res=>{
        if(res){
          if(res.data === true){
            this.isFollow = true;
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    unfollow(){
      this.axios.post("/api/fans/unfollow",{
        "userId":this.userId,
        "followId":this.visitUserId
      }).then(res=>{
        if(res){
          if(res.data === true){
            this.isFollow = false;
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    avatarSrc(src){
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
.space-index{
  margin: 0px 20px;
  padding: 0px 100px;
  /*background-color: rgba(255, 255, 255, 0.3);*/
  text-align: left;
}
.user-msg{
  background-color: #ffffff;
  /*background-color: rgba(231, 115, 115, 0.3);*/
  padding: 10px 20px;
}
.user-dynamic{
  background-color: #ffffff;
  padding: 10px 20px 50px 20px;
  margin: 10px 0;
  font-size: 16px;
}
.title-dynamic-index{
  font-size: 25px;
  height: 30px;
  line-height: 28px;
  margin: 0;
}
.info{
  font-size: 14px;
  color: #7D7A65;
  padding: 8px 0;
  line-height: 16px;
}
.content-text{
  text-align: left;
  line-height: 18px;
  margin: 0;
}
</style>
