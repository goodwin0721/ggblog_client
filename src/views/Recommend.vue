<template>
  <div>
    <el-container>
      <el-header class="header">
        <page-header></page-header>
      </el-header>
      <el-aside class="aside">
        <bgm></bgm>
      </el-aside>
      <el-main class="main">
        <el-backtop target=".main">up</el-backtop>
        <div style="margin-top: 20px;text-align: left;margin-left: 20px">
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="生活"></el-radio-button>
            <el-radio-button label="游戏"></el-radio-button>
            <el-radio-button label="影视"></el-radio-button>
            <el-radio-button label="音乐"></el-radio-button>
            <el-radio-button label="知识"></el-radio-button>
            <el-radio-button label="美食"></el-radio-button>
            <el-radio-button label="运动"></el-radio-button>
            <el-radio-button label="科技"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="article-list">
          <ul class="ul-article-list"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              :infinite-scroll-distance="10"
              infinite-scroll-immediate="false">
            <li v-for="(item,index) in dynamicList" :key="index">
              <el-card shadow="hover" class="recommend-card">
                <div class="card-header" slot="header">
                  <router-link class="article-title link"  target="_blank" rel="opener"
                               :to="'/details/' + item.id">
                    <span>{{item.title}}</span>
                  </router-link>
                  <br>
                  <router-link target="_blank" rel="opener"
                               :to="'/space/' + item.userId + '/index'"
                               class="link article-author">
                    <span><i class="el-icon-user-solid">{{item.username}}</i></span>
                  </router-link>
                </div>
                <div class="card-body">
                  <el-row :gutter="10">
                    <el-col :span="18">
                      <div>
                        <p>{{item.shortText}}</p>
                        <span class="info">{{showTime(item.creationTime)}}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="info">
                        <i class="el-icon-goblet-square-full">
                          &nbsp;{{item.love}}
                        </i>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-view">&nbsp;{{item.view}}</i>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-chat-dot-square">&nbsp;{{item.comment}}</i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <br>
            </li>
          </ul>
        </div>
        <div style="width: 85%;padding: 10px;">
          <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
          <el-divider v-if="noMore">我是有底线的</el-divider>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pageHeader from '../components/PageHeader'
import bgm from  '../components/indexAside/BGM'
export default {
  name: "Recommend",
  components:{
    pageHeader,
    bgm
  },
  data() {
    return {
      loading: false,
      type:'全部',
      finish: true,
      nextPageLoadNum:1,      //下一次加载的页序
      pageCount:0,        //页总数
      dynamicList: []
    }
  },
  computed: {
    noMore() {
      return this.nextPageLoadNum > this.pageCount;
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.dynamicInit();
  },
  watch:{
    'type'(){
        this.loading = false;
        this.finish = true;
        this.nextPageLoadNum = 1;
        this.dynamicInit();
    }
  },
  methods: {
    dynamicInit(){
      let url = "/api/dynamic/article/type/" + this.type + "/" + this.nextPageLoadNum;
      this.axios.get(url).then(res=>{
        if(res){
          if(res.data !== null){
            let _data = res.data;
            this.dynamicList = _data.list;
            this.pageCount = _data.pageCount;
            this.nextPageLoadNum = this.nextPageLoadNum + 1;
            // console.log(_data)
          } else {
            this.$message.info("没有相关内容")
          }
        }
      }).catch(e=>{
        console.log(e)})
    },
    load () {
      this.loading = true
      let url = "/api/dynamic/article/type/" + this.type + "/" + this.nextPageLoadNum;
      let next = this.nextPageLoadNum + 1;
      // console.log("next" + next)
      let newItem = [];
      let temp = this.dynamicList;
      setTimeout(() => {
        if(this.finish){
          this.finish = false;
          this.axios.get(url).then(res=>{
            // console.log(url)
            if(res){
              if(res.data !== null){
                let _data = res.data;
                newItem = _data.list;
                this.nextPageLoadNum = next;
                for (let i = 0; i < newItem.length; i++) {
                  temp.push(newItem[i]);
                }
                this.dynamicList = temp;
                // console.log(this.nextPageLoadNum + "############")
              } else {
                this.$message.info("没有相关内容")
              }
            }
          }).catch(e=>{
            console.log(e)})
        }
        // this.loading = false
      }, 1000)
      this.finish = true;
      this.loading = false
    },
    showTime(time){
      let now = new Date();
      let pass = new Date(time);
      let sub = now - pass;
      //一天内
      if(sub < 24 * 60 * 60 * 1000){
        if(now.getDay() === pass.getDay()){
          if(now.getHours() - pass.getHours() <= 12){
            //60分钟内
            if(now.getMinutes() - pass.getMinutes() < 60){
              let subMin = now.getMinutes() - pass.getMinutes();
              if(subMin === 0)
                return "刚刚"
              let temp = subMin > 0 ? subMin : subMin + 60
              return temp + "分钟前"
            } else{
              return now.getHours() - pass.getHours() + "小时前"
            }
          } else{
            //12小时前
            return "今天 " +  pass.getHours() + ":" +pass.getMinutes() + ":" + pass.getSeconds();
          }
        } else {
          return "昨天 " +  pass.getHours() + ":" +pass.getMinutes() + ":" + pass.getSeconds();
        }
      }
      else return time;
    }
  }

}
</script>
<style scoped>
.header{
  background-color:lightgoldenrodyellow;
  color: #333;
  text-align: center;
  line-height: 5px;
  width: 100%;
  height: 50px;
  padding:2px;
}

.main{
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  position: absolute;
  right: 8px;
  left: 310px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.aside{
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  position: absolute;
  display: block;
  top: 70px;
  bottom: 0;
  left: 8px;
}
.recommend-card{
  text-align: left;
  font-size: larger;
}
.info {
  font-size: 14px;
  color: #7D7A65;
  padding: 8px 0;
}
.article-list{
  width: 85%;
  padding: 10px;
}
.ul-article-list{
  padding: 10px;
  min-height: 400px;
  list-style: none;
}
.card-header{
  height: 50px;
  font-size: 16px;
}
.card-body{
  color: #7D7A65;
  font-size: 16px;
}
.article-title{
  font-size: 25px;
  height: 30px;
  line-height: 30px;
}
.article-author{
  padding-left: 25px;
  padding-top: 5px;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
}
.link{
  text-decoration: none;
  color: #453f3f;
}
.link:hover{
  color: #15d7c7;
}
</style>
