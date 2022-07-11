<template>
<div id="indexMain">
  <h1>项目介绍</h1>
  <p>
    本项目ggblog是个人项目，实现了前后端分离，前端采用了vue + elementUI实现，后端使用了SSM框架，数据库使用MySQL进行数据存储。
    以下展示项目实现了的功能：
  </p>
  <h1>已实现功能</h1>
  <h2>1.用户板块</h2>
  <ol>
    <li><a href="#user_register">用户注册</a></li>
    <li><a href="#user_login">用户登录</a></li>
    <li><a href="#user_logout">用户注销</a></li>
    <li><a href="#user_mag_edit">修改个人信息</a></li>
  </ol>

  <h2>2.动态相关</h2>
  <ol>
    <li><a href="#dynamic_edit">发表动态</a></li>
    <li><a href="#dynamic_read">查看动态</a></li>
    <li><a href="#dynamic_search">搜索动态</a></li>
    <li><a href="#dynamic_love">点赞动态</a></li>
    <li><a href="#dynamic_comment">评论动态</a></li>
  </ol>

  <h2>3.评论相关</h2>
  <ol>
    <li><a href="#comment">评论动态</a></li>
    <li><a href="#reply">回复评论</a></li>
    <li><a href="#comment_love">点赞评论</a></li>
    <li><a href="#reply_details">查看评论和回复</a></li>
    <li><a href="#msg_tip">消息提醒</a></li>

  </ol>

  <h2>4.粉丝模块</h2>
  <ol>
    <li><a href="#follow">关注用户</a></li>
    <li><a href="#my_follow">查看关注</a></li>
    <li><a href="#my_fans">查看粉丝</a></li>
  </ol>


  <h2>5.其他</h2>
  <ol>
    <li><a href="#component">使用组件开发</a></li>
    <li><a href="#upload">文件上传</a></li>
  </ol>


  <h2>1.用户板块</h2>
  <h3 id="user_register">1.1用户注册</h3>
  输入用户名，通过异步请求检查用户名，发现用户名重复时，将进行提示
  <img src="../assets/img4Introduction/register&exist.png"/>
  用户名未被注册，则可以进行正常注册
  <img src="../assets/img4Introduction/register.png"/>
  注册成功
  <img src="../assets/img4Introduction/register&success.png"/>
  <el-divider></el-divider>

  <h3 id="user_login">1.2用户登录</h3>
  正确输入密码，点击登录
  <img src="../assets/img4Introduction/login.png"/>
  <el-divider></el-divider>

  <h3 id="user_logout">1.3用户注销</h3>
  登录成功后，可以通过点击头像下的“退出登录”进行用户注销
  <img src="../assets/img4Introduction/avatar_hover.png"/>
  也可以点击“个人中心”进入个人中心，进行用户信息修改
  <el-divider></el-divider>

  <h3 id="user_mag_edit">1.4修改个人信息</h3>
  进入个人中心
  <img src="../assets/img4Introduction/user_index.png"/>
  修改个人信息
  <img src="../assets/img4Introduction/user_msg.png"/>
  <img src="../assets/img4Introduction/user_msg_edit.png"/>
  <img src="../assets/img4Introduction/user_index2.png"/>
  <el-divider></el-divider>

  <h2>2.动态相关</h2>
  <h3 id="dynamic_edit">2.1发表动态</h3>
  点击“投稿”进行动态投稿,编辑动态信息，可以设置动态标题，编辑动态内容，上传图片，进行动态分类
  <img src="../assets/img4Introduction/dynamic_edit.png"/>
  <img src="../assets/img4Introduction/dynamic_edit2.png"/>
  <el-divider></el-divider>

  <h3 id="dynamic_read">2.2查看动态</h3>
  在“广场”查看到本站所有动态
  <img src="../assets/img4Introduction/square.png"/>
  在“关注”可以查看自己关注列表下的动态内容
  <img src="../assets/img4Introduction/dynamic_from_follow.png"/>
  可以在个人中心的“投稿信息”，查看自己已发布的动态信息
  <img src="../assets/img4Introduction/my_dynamic.png"/>
  进入动态，查看具体内容，其中图片使用走马灯的形式进行展示
  <img src="../assets/img4Introduction/dynamic_detail2.png"/>
  <el-divider></el-divider>

  <h3 id="dynamic_search">2.3搜索动态</h3>
  在本项目中，可以通过异步请求，根据用户输入，提示存在的动态的标题；也可以进行模糊查询
  <img src="../assets/img4Introduction/search_by_kw.png"/>
  <img src="../assets/img4Introduction/search_by_kw2.png"/>
  也可以根据动态类型进行搜索
  <img src="../assets/img4Introduction/search_by_type.png"/>
  <el-divider></el-divider>

  <h3 id="dynamic_love">2.4点赞动态</h3>
  进入动态后，可以进行点赞动态
  <img src="../assets/img4Introduction/dynamic_detail.png"/>
  <el-divider></el-divider>

  <h3 id="dynamic_comment">2.5评论动态</h3>
  <img src="../assets/img4Introduction/comment.png"/>
  <img src="../assets/img4Introduction/comment_submit.png"/>
  <el-divider></el-divider>

  <h2>3.评论相关</h2>
  <h3 id="comment">3.1评论动态</h3>
  如上述<a href="#dynamic_comment" style="color: red">评论动态</a>
  <el-divider></el-divider>

  <h3 id="reply">3.2回复评论</h3>
  点击评论下的“回复”按钮进行回复
  <img src="../assets/img4Introduction/reply_edit.png"/>
  <el-divider></el-divider>

  <h3 id="comment_love">3.3点赞评论</h3>
  <img src="../assets/img4Introduction/comment_love.png"/>
  <el-divider></el-divider>

  <h3 id="reply_details">3.4查看评论和回复</h3>
  可以展开评论下的回复，查看详细回复
  <img src="../assets/img4Introduction/reply_details.png"/>
  <el-divider></el-divider>

  <h3 id="msg_tip">3.5消息提醒</h3>
  收到新的回复、评论或点赞时，在“消息”中进行提示，可以进入个人中心的“消息管理”模块中查看新消息
  <img src="../assets/img4Introduction/msg_tip.png"/>
  <img src="../assets/img4Introduction/msg_new.png"/>
  <img src="../assets/img4Introduction/msg_new2.png"/>
  <el-divider></el-divider>

  <h1>4.粉丝模块</h1>
  <h3 id="follow">4.1关注用户</h3>
  进入其他用户的用户首页，可以进行用户关注
  <img src="../assets/img4Introduction/follow_click.png"/>
  <el-divider></el-divider>

  <h3 id="my_follow">4.2查看关注</h3>
  在个人中心的“粉丝系统”下可以查看用户的关注列表
  <img src="../assets/img4Introduction/follow.png"/>
  <el-divider></el-divider>

  <h3 id="my_fans">4.3查看粉丝</h3>
  在个人中心的“粉丝系统”下可以查看用户的粉丝列表
  <img src="../assets/img4Introduction/fans.png"/>
  <el-divider></el-divider>

  <h1>5.其他</h1>
  <h3 id="component">5.1使用组件开发</h3>
  本项目的前端，采用组件化的思想开发的，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性低等问题。
  <img src="../assets/img4Introduction/component.png"/>
  <img src="../assets/img4Introduction/component2.png"/>
  <el-divider></el-divider>

  <h3 id="upload">5.2文件上传</h3>
  本项目中主要是<a href="#dynamic_edit" style="color: #00a1d6">动态中图片</a>和<a href="#user_mag_edit" style="color: #00a1d6">用户头像</a>的上传。
  <el-divider></el-divider>












<!--
  view:{{view}}<br>
  <div v-if="view === 'search'">
    <search></search>
  </div>
  <div v-else-if="view === 'myFollow'">
    <my-follow></my-follow>
  </div>
  <div v-else>
    全世界信息
  </div>
  -->
</div>
</template>

<script>
import search from './indexMain/Search';
import myFollow from "./indexMain/MyFollow"
export default {
  name: "IndexMain",
  /*props:{
    view:{
      type:String,
      default:'all'
    }
  },*/
/*  components:{
    search,
    myFollow
  },
  methods:{
    changeView(data){
      this.view = data;
    }
  },*/
 /* created() {
    eventBus.$on('mapview',res=>{
        console.log(res);
        this.view = res;
      }
    )
  },
  mounted() {
    eventBus.$on('mapview',res=>{
      console.log(res);
      this.view = res;
      }
    )
  }*/
}
</script>

<style scoped>
#indexMain{
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
  line-height: 50px;
  padding: 0 200px;
}
#indexMain a{
  text-decoration:none;
}
#indexMain ol,ul{
  margin: 0;
}
#indexMain li{
  line-height: 30px;
  padding: 0;
  margin: 0;
}
#indexMain img{
  max-width: 100%;
}
</style>
