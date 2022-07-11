import Vue from 'vue';
import router from 'vue-router';
import Index from '../views/Index';
import Login from '../views/Login';
import Register from '../views/Register';
import NotFound from "../views/NotFound";
import SearchPage from '../views/Search'
import Recommend from '../views/Recommend'
import Follow from '../views/Follow'
import Details from "../views/Details";
//导入子模块
//import Search from '../components/indexMain/Search';
import MyFollow from "../components/indexMain/MyFollow";
import Space from "../views/Space";
import Write from "../views/Write";
import WriteHome from "../views/writeChild/Home"
import WriteEdit from "../views/writeChild/Edit"
import WriteManage from "../views/writeChild/Manage"
import WriteData from "../views/writeChild/Data"
import UserInfo from "../views/spaceChild/UserInfo";
import fansFollow from "../views/spaceChild/fans/Follow";
import Fans from "../views/spaceChild/fans/Fans";
import Reply from "../views/spaceChild/message/Reply";
import At from "../views/spaceChild/message/At";
import Love from "../views/spaceChild/message/Love";
import System from "../views/spaceChild/message/System";
import SpaceIndex from "../views/spaceChild/Index";
import Dynamic from "../views/spaceChild/Dynamic";
Vue.use(router);

export default new router({
  mode:'history',
  routes:[
    {
      //主页
      path:"/index",
      component:Index,
      //写入子模块
      children:[
        /*
        {
          //关键字搜索
          path:'/search/:type/:keyword',
          name:'search',
          component:Search,
          props:true
        },*/
        {
          //我的关注
          path:'/myFollow/:userId',
          name:'myFollow',
          component:MyFollow
        }
      ]
    },
    {
      //查询
      path:'/search/:type/:keyword',
      name:'search',
      component:SearchPage
    },
    {
      //推荐
      path:'/recommend',
      name:'recommend',
      component:Recommend
    },
    {
      //关注
      path:'/follow',
      name:'follow',
      component:Follow
    },
    {
      //文章
      path:'/details/:id',
      name:'details',
      component:Details
    },
    {
      //注册
      path:"/register",
      name:'register',
      component:Register
    },
    {
      //登录
      path:"/login",
      component:Login
    },
    {
      //查看别人空间
      path:"/space/:userId",
      name:'space',
      component:Space,
      children:[
        {
          path:"/space/:userId/index",
          name:'spaceIndex',
          component: SpaceIndex
        },
        {
          path:"/space/:userId/info",
          name:'info',
          component: UserInfo
        },
        {
          path:"/space/:userId/dynamic",
          name:'dynamic',
          component:Dynamic
        },
        {
          path:"/space/:userId/fans",
          name:'fans',
          component: Fans
        },
        {
          path:"/space/:userId/follow",
          name:'fansFollow',
          component: fansFollow
        },
        {
          path:"/space/:userId/reply",
          name:'reply',
          component: Reply
        },
        {
          path:"/space/:userId/at",
          name:'at',
          component: At
        },
        {
          path:"/space/:userId/love",
          name:'love',
          component: Love
        },{
          path:"/space/:userId/system",
          name:'system',
          component: System
        },

      ]
    },
    {
      path:"/write",
      name:'write',
      component:Write,
      children:[
        {
          path:"/write/home",
          name:'home',
          component:WriteHome,
        },
        {
          path:"/write/edit",
          name:'edit',
          component:WriteEdit,
        },
        {
          path:"/write/manage",
          name:'manage',
          component:WriteManage,
        },
        {
          path:"/write/data",
          name:'data',
          component:WriteData,
        }
      ]
    },
    {
      //回到首页
      path:"/goHome",
      redirect:'main'
    },
    {
      //起始页
      path:'',
      redirect:'index'
    },
    {
      //其他情况
      path:'*',
      component:NotFound
    }
  ]
});
