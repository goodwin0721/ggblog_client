<template>
  <div>
    <el-container>
      <el-header class="space-header">
        <page-header></page-header>
      </el-header>
      <el-aside class="space-aside">
        <el-menu :default-active="activeIndex"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item index="0" style="padding: 0;width: 98%">
            <router-link class="el-icon-s-home navigation-list"
                         :to="{name:'spaceIndex',params:visitUserId}"
                         :key="$route.fullPath">
              用户首页
            </router-link>
          </el-menu-item>
          <el-menu-item index="1" style="padding: 0;width: 98%" v-if="this.$route.params.userId === userId">
            <router-link class="el-icon-s-custom navigation-list"
                         :to="{name:'info',params:visitUserId}"
                         :key="$route.fullPath">
              账号信息
            </router-link>
          </el-menu-item>

          <el-submenu index="2" style="padding: 0;width: 98%">
            <template slot="title">
              <span class="el-icon-connection navigation-list">粉丝系统</span>
            </template>
            <el-menu-item index="2-1" style="padding:0;">
              <router-link class="sub-navigation-list" :to="{name:'fansFollow',params:visitUserId}"
                           :key="$route.fullPath">
                关注
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-2" style="padding:0;">
                <router-link class="sub-navigation-list" :to="{name:'fans',params:visitUserId}"
                             :key="$route.fullPath">
                  粉丝
                </router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" style="padding: 0;width: 98%">
            <router-link class="el-icon-s-management navigation-list"
                         :to="{name:'dynamic',params:visitUserId}"
                         :key="$route.fullPath">
              投稿信息
            </router-link>
          </el-menu-item>
          <el-submenu index="4" style="padding: 0;width: 98%"
                      v-if="this.$route.params.userId === userId">
            <template slot="title">
              <span class="el-icon-chat-dot-square navigation-list">消息管理</span>
            </template>
            <el-menu-item index="4-1" style="padding:0;">
              <router-link class="sub-navigation-list" :to="{name:'reply',params:userId}"
                           :key="$route.fullPath">
                回复我的
              </router-link>
            </el-menu-item>
            <el-menu-item index="4-2" style="padding:0;">
              <router-link class="sub-navigation-list" :to="{name:'at',params:userId}"
                           :key="$route.fullPath">
                @我的
              </router-link>
            </el-menu-item>
            <el-menu-item index="4-3" style="padding:0;">
              <router-link class="sub-navigation-list" :to="{name:'love',params:userId}"
                           :key="$route.fullPath">
                收到的赞
              </router-link>
            </el-menu-item>
            <el-menu-item index="4-4" style="padding:0;">
              <router-link class="sub-navigation-list" :to="{name:'system',params:userId}"
                           :key="$route.fullPath">
                系统通知
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="space-main">
        <el-backtop target=".space-main">up</el-backtop>
        <router-view></router-view>
      </el-main>

    </el-container>

  </div>

</template>

<script>
import pageHeader from '../components/PageHeader'
import userInfo from './spaceChild/UserInfo'
export default {
  name: "Search",
  components: {
    pageHeader,
    userInfo
  },
  data(){
    return{
      userId:localStorage.getItem('userId'),//登录账号id
      visitUserId:this.getVisitUserId,//空间所属账号id
      activeIndex:'1',
    }
  },

  computed:{
    getVisitUserId(){
      return this.$route.params.userId;
    }
  },
  methods:{
    visit(){
      this.$router.push('/space/'+ this.visitUserId + '/info');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style scoped>
.space-header {
  background-color: lightgoldenrodyellow;
  color: #333;
  text-align: center;
  line-height: 5px;
  width: 100%;
  height: 50px;
  padding: 2px;
}

.space-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
  position: absolute;
  right: 8px;
  left: 310px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.space-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  position: absolute;
  display: block;
  top: 70px;
  bottom: 0;
  left: 8px;
}
.navigation-list{
  color: #1c1a1a;
  text-decoration: none;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.navigation-list:hover,.sub-navigation-list:hover{
  color: #0a1a7d;
}
.navigation-list:active,.sub-navigation-list:active{
  color: #31cec8;
}
.sub-navigation-list{
  color: #1c1a1a;
  text-decoration: none;
  width: 100%;
  text-align: center;
  display: block;
}
</style>
