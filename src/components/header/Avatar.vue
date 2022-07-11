<!--头像组件-->
<template>
  <div class="page-header-component">
    <el-popover
      placement="bottom"
      trigger="hover"
      width="200">
      <div v-if="isLogin === 'true'">
        <router-link class="link-avatar username-avatar" :to="'/space/'+user.id + '/index'"
                     :key="$route.fullPath">{{user.username}}</router-link>
        <router-link class="link-avatar" :to="'/space/'+user.id + '/follow'">关注:{{user.follow}}</router-link>
        <router-link class="link-avatar" :to="'/space/'+user.id + '/fans'">粉丝:{{user.fans}}</router-link>
        <router-link class="link-avatar" :to="'/space/'+user.id + '/dynamic'">动态:{{user.dynamic}}</router-link>
        <router-link class="link-avatar el-icon-user" :to="'/space/'+user.id + '/index'">个人中心</router-link>
        <router-link class="link-avatar el-icon-setting" :to="'/write'">投稿管理</router-link>
        <el-divider></el-divider>
        <el-link class="link-avatar " :underline="false" icon="el-icon-right" @click="logout()">退出登录</el-link>
        <!--
        <el-link class="link-avatar username-avatar" :underline="false" :href="'/space/'+userId + '/index'">{{username}}</el-link>
        <el-link class="link-avatar" :underline="false" :href="'/space/'+userId + '/follow'">关注:{{follow}}</el-link>
        <el-link class="link-avatar" :underline="false" :href="'/space/'+userId + '/fans'">粉丝:{{fans}}</el-link>
        <el-link class="link-avatar" :underline="false" :href="'/space/'+userId + '/dynamic'">动态:{{dynamic}}</el-link>
        <el-link class="link-avatar" :underline="false" icon="el-icon-user" :href="'/space/'+userId + '/index'">个人中心</el-link>
        <el-link class="link-avatar" :underline="false" icon="el-icon-setting" :href="'/write'">投稿管理</el-link>
        <el-divider></el-divider>
        <el-link class="link-avatar" :underline="false" icon="el-icon-right" @click="logout()">退出登录</el-link>
        -->
      </div>
      <div v-else class="login-tip-box">
        <p>登录后你可以发表文章！还可以写评论</p>
        <el-button class="btn-login" type="primary" size="mini" @click="login()">立即登录</el-button>
        <el-link class="link-register" type="primary" :underline="false" @click="toRegister()">
          首次使用？点我注册
        </el-link>
      </div>
      <el-button slot="reference" circle class="btn-page-header-avatar" @click="goSpace()">
        <!--头像-->
        <el-avatar shape="circle" :src="showAvatar(user.avatar)" class="img-page-header-avatar">
        </el-avatar>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  data(){
    return{
      user:{
        id:"",
        username:"",
        avatar:'',
        fans:0,
        follow:0,
        dynamic:0
      },
      isLogin:localStorage.getItem("loginInfo")
    }
  },
  mounted() {
    this.userInit();
  },
  methods:{
    userInit(){
      let userId = localStorage.getItem("userId");
      if(userId != null){
        this.axios.get("/api/user/uid/" + userId).then(res=>{
          this.user = res.data;
        });
      }
    },
    login(){
      //window.location.href = "/login";
      //使用vue-router路由到指定界面，该方式称为编程式导航
      this.$router.push('/login');
    },
    toRegister(){
      this.$router.push('/register');
      /*let url =  this.$router.resolve({
        name:'register'
      });
      window.open(url.href,'_blank');*/
    },
    logout(){
      this.user.username="";
      this.user.userId="";
      this.user.avatar="../../static/img/user-icon.png";
      this.user.fans=0;
      this.user.follow=0;
      this.user.dynamic=0;
      this.isLogin = false;
      localStorage.clear();
    },
    goSpace(){
      this.$router.push('/space/' + localStorage.getItem("userId") + '/index');
      /*
      let routeData = this.$router.resolve({
          name: "spaceIndex",
          params:{
            userId:this.user.userId
          }
        }
      );
      window.open(routeData.href, '_blank');
      */
    },
    showAvatar(src){
      if(src === null ||src.trim() === ''){
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
.page-header-component{
  height: 55px;
  width: 100%;
  text-align:center;
}
.btn-page-header-avatar{
  height: 55px;
  width: 55px;
  text-align: center;
  margin: 0;
  padding: 0;
}
.img-page-header-avatar{
  height: 52px;
  width: 52px;
  background-color: #E9EEF3;
}
.link-avatar{
  font-family: Serif,serif;
  color: #0e0d0d;
  text-decoration: none;
  padding: 6px 20px;
  font-size: 18px;
  display: block;
  text-align: left;
}
.link-avatar:hover{
  color: #1414e2;
}
.link-avatar:hover{
  text-decoration: none;
}
.username-avatar{
  text-align: center;
  font-size: 24px;
  color: black;
}
.login-tip-box{
  font-family: Serif;
  font-size: 18px;
}
.btn-login{
  width: 100%;
  font-family: Serif;
  font-size: 18px;
}
.link-register{
  font-size: 18px;
}
</style>
