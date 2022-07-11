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
        <div class="main-content">
          <el-backtop target=".main">up</el-backtop>
          <div class="article-content">
            <h1>{{ article.title }}</h1>
            <div class="info">
              <i class="el-icon-user name">{{ article.author }}</i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-date">{{showTime(article.creationTime)}}</i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-view"> {{ article.view }}</i>
              <el-divider direction="vertical"></el-divider>
              <el-link :underline="false" href="#comment-box"><i class="el-icon-chat-line-square">{{ article.comment }}</i>
              </el-link>
              <el-divider direction="vertical"></el-divider>
              <!-- <span v-if="isStar">
                <el-link :underline="false" @click="starOff()"><i class="el-icon-star-on">已收藏{{ article.star }}</i></el-link>
              </span>-->
              <span>
                <el-link :underline="false"><i class="el-icon-star-off">收藏{{ article.star }}</i></el-link>
              </span>
            </div>
            <el-divider></el-divider>
            <div style="min-height: 300px">
              <p v-html="textReplace()"></p>

              <div v-if="article.pictureList.length > 0">
                <el-carousel class="picture-carousel" type="card" height="250px" :autoplay="false" >
                  <el-carousel-item v-for="(item,index) in article.pictureList" :key="index">
                    <el-image
                      style="width: 300px; height: 250px"
                      :src="path(item)"
                      fit="scale-down" @click="showDialog(item)">
                    </el-image>
                  </el-carousel-item>
                </el-carousel>
                <el-dialog :visible.sync="dialogVisible" width="40%">
                  <img width="100%" height="80%" :src="path(dialogImageUrl)" alt="图片">
                </el-dialog>
              </div>
            </div>
            <div id="arc_toolbar_report">
               <el-link :underline="false" @click="loveArticle()" style="font-size: 30px;">
                   👍{{ article.love }}
               </el-link>
            </div>
            <el-divider></el-divider>
          </div>
          <div class="comment-box" id="comment-box">
            <el-row :gutter="20">
              <el-col :span="20">
                <div>
                  <el-input
                    class="comment-txt"
                    v-model="commentArea"
                    :rows="3"
                    maxlength="1000"
                    placeholder="发一条友善的评论"
                    show-word-limit
                    type="textarea">
                  </el-input>
                </div>
              </el-col>
              <el-col :span="4">
                <div>
                  <el-button class="btn-comment-submit" type="primary" @click="commentSubmit()">发表评论</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 评论板块>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->
          <div class="comment-list-box">
            <ul class="comment-list"
                v-infinite-scroll="load"
                :infinite-scroll-disabled="disabled">
              <li class="comment-line-box" v-for="(comment_item,index) in commentLists" :comment_id="index">
                <div class="comment-content">
                  <el-link :underline="false" class="name" :href="'/space/' + comment_item.userId + '/index'">
                    {{comment_item.username}}
                  </el-link><br>
                  <span class="comment" v-html="commentReplace(comment_item.comment)"></span>
                </div>
                <div class="info">
                  <span class="comment-data">{{showTime(comment_item.creationTime)}}</span>
                  <span class="comment-like">
                    <el-link :underline="false" @click="loveComment(comment_item)">👍{{comment_item.love}}</el-link>
                  </span>
                  <span class="comment-replay">
                    <el-button class="btn-comment-replay"
                               plain round size="mini"
                               type="primary"
                               @click="commentId = comment_item.id; replyComment = comment_item;
                               replyId = comment_item.userId; replyTo = comment_item.username">
                      回复
                    </el-button>
                  </span>
                </div>

                <!-- 回复消息板块 -->
                <div class="info" v-if="comment_item.reply !== 0">
                  <div v-if="comment_item.replyLists.length === 0">
                    共{{comment_item.reply}}条回复
                    <el-button class="info" style="color: #00a1d6"  size="mini" type="text" @click="loadNewReplyPage(comment_item,1)">
                       展开>>
                    </el-button>
                  </div>
                  <!-- 评论下的回复列表>>>>>>>> -->
                  <div v-else>
                    <ul class="comment-list">
                      <li class="comment-reply-box" v-for="(reply_item,index) in comment_item.replyLists" :reply_index="index">
                        <div class="comment-content">
                          <el-link :underline="false" class="name" :href="'/space/' + reply_item.userId + '/index'">{{reply_item.username}}</el-link>
                          <span>&nbsp;回复&nbsp;</span>
                            <span>
                            <el-link :underline="false" :href="'/space/' + reply_item.replyId + '/index'">@{{reply_item.replyName}}:&nbsp;</el-link>
                          </span>
                          <span class="comment" v-html="commentReplace(reply_item.comment)"></span>
                        </div>
                        <div class="info">
                          <span class="comment-data">{{showTime(reply_item.creationTime)}}</span>
                          <span class="comment-like">
                            <el-link :underline="false" @click="loveReply(reply_item)">👍{{reply_item.love}}</el-link>
                          </span>
                          <span class="comment-replay">
                          <el-button class="btn-comment-replay"
                                     plain round size="mini" type="primary"
                                     @click="commentId = comment_item.id;replyComment = comment_item;
                                     replyId = reply_item.userId; replyTo = reply_item.username">
                            回复
                          </el-button>
                        </span>
                        </div>
                      </li>
                    </ul>
                    <!-- 分页 -->
                    <el-pagination
                      @current-change="handleCurrentChange(comment_item,$event)"
                      :current-page="1"
                      :page-size="3"
                      :pager-count="5"
                      layout="total,  prev, pager, next, jumper"
                      :total="comment_item.reply">
                    </el-pagination>
                  </div>
                  <!-- <<<<<<<<<<<评论下的回复列表 -->
                </div>
                <!-- 展开回复框 -->
                <div v-if="commentId === comment_item.id" class="comment-box">
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <div>
                        <el-input
                          class="comment-txt"
                          v-model="replyArea"
                          :rows="3"
                          maxlength="1000"
                          :placeholder="'回复' + replyTo"
                          show-word-limit
                          type="textarea">
                        </el-input>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div>
                        <el-button class="btn-comment-submit" type="primary" @click="reply()">回复评论</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <el-divider></el-divider>
              </li>
              <!-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<评论板块 -->

            </ul>
            <div style="text-align: center">
              <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
              <p v-if="noMore">没有更多了</p>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pageHeader from '../components/PageHeader'
import bgm from '../components/indexAside/BGM'

export default {
  name: "Details",
  components: {
    pageHeader,
    bgm
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hasMore:true,
      loading: false,
      // hasMoreReply:true,
      // loadingReply:true,
      userId:localStorage.getItem('userId'),
      username:localStorage.getItem('username'),
      articleId:this.$route.params.id,
      article:{
        author: '', //作者
        title: '',  //标题
        text: '',   //正文
        creationTime: '',
        updateTime:'',
        pictureList: [],
        type:'',
        view: 0,    //查看人数
        star: 0,    //收藏人数
        love: 0,    //点赞人数
        comment: 0  //评论人数
      },
      commentLists:[],
      // commentLists:[{
      //   id:'',
      //   userId:'',
      //   username:'',
      //   articleId:'',
      //   comment:'',
      //   love:'',
      //   reply:'',
      //   creationTime:''
      // }],
      lastCommentId : 0,
      loadList:[
        {
          id:'',
          userId:'',
          username:'',
          articleId:'',
          comment:'',
          love:'',
          reply:'',
          creationTime:''
        }
      ],
      /*
      replyLists:[
        // {
        //   id:'',
        //   userId:'',
        //   username:'',
        //   articleId:'',
        //   comment:'',
        //   love:'',
        //   creationTime:'',
        //   replyId:'',
        //   replyName:'',
        //   commentId:''
        // }
      ],
      newReplyLists:[
        {
          id:'',
          userId:'',
          username:'',
          articleId:'',
          comment:'',
          love:'',
          creationTime:'',
          replyId:'',
          replyName:'',
          commentId:''
        }
      ],*/
      // getReply4CommentId:0,
      // lastReplyId:0,
      // isStar: false,    //是否已收藏
      // isLike: false,    //是否点赞
      commentId:'',     //对ID为commentId下的评论进行回复
      replyId:'',       //对commentId下,用户ID为replyId的评论进行回复
      replyTo:'',       //对谁进行回复
      replyComment:'',  //在这条评论下回复
      commentArea: '',  //评论输入框

      // replyDrawer:false,//是否展开回复drawer
      // listenerId:'0',   //回复评论接收者Id
      // listener:'回复评论接收者', //回复评论接收者
      // replyCommentId:'0',     //所要回复的评论的id
      replyArea:'',     //回复的内容
      pageSize:3,       //每页回复的数据量
    }
  },
  mounted() {
    this.articleInit();
    this.commentLoad();
  },
  computed: {
    noMore () {
      return this.hasMore === false;
    },
    disabled () {
      return this.loading || this.noMore
    },
  },
  methods: {
    showDialog(url){
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    articleInit(){
      this.axios.get("/api/dynamic/article/" + this.$route.params.id).then(res=>{
        if (res){
          if(res.data != null){
            // console.log(res.data)
            this.article = res.data;
            // console.log(this.article.pictureList)
          }else{
            this.$message.warning("没有找到该动态");
          }
        }
      })
    },
    commentLoad(){
      // console.log(this.lastCommentId)
      this.axios.get("/api/comment/get/" + this.$route.params.id + "/" + this.lastCommentId).then(res=>{
        if(res){
          let list = this.commentLists;
          this.loadList = res.data.list;
          if(this.loadList.length === 0){
            this.hasMore = false;
          }
          for (let i = 0; i < this.loadList.length; i++) {
            if (i === this.loadList.length -1){
              this.lastCommentId = this.loadList[i].id;
            }
            if(this.loadList[i].reply !== 0){
              this.loadList[i].replyLists = [];
            }
            //获得该评论第一页回复数据
            /*
            if(this.loadList[i].reply !== 0){
              let replyUrl = "/api/reply/get/" + this.loadList[i].id + "/1/" + this.pageSize;
              // console.log(replyUrl)
              this.axios.get(replyUrl).then(r=>{
                if(r){
                  if(r.data){
                    this.loadList[i].replyLists = r.data.list;
                    // console.log( r.data.list)
                  }
                }
              })
            }*/
            list.push(this.loadList[i]);
          }
          this.commentLists = list;
          // console.log(list)
        }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.commentLoad();
        this.loading = false
      }, 1000)
    },
    loveComment(comment){
      this.axios.post("/api/comment/love?commentId=" + comment.id).then(res=>{
          if (res){
              if(res.data === true){
                comment.love++;
                this.$forceUpdate();
              }
          }
      })
    },
    /*
   getReply(id){
     this.getReply4CommentId = id;
     this.lastReplyId = 0;
     // this.commentLists = [];
     // this.newReplyLists = [];
     this.hasMoreReply = true;
     this.loadingReply = true;
     this.replyLoad();
   },

   replyLoad(){
     let url = "/api/reply/get/" + this.getReply4CommentId + "/" + this.lastReplyId;
     console.log(url)
     this.axios.get(url).then(res=>{
       if(res){
         let list = this.replyLists;
         this.newReplyLists = res.data.list;
         console.log(this.newReplyLists)
         if(this.newReplyLists.length === 0){
           this.hasMoreReply = false;
         }
         for (let i = 0; i < this.newReplyLists.length; i++) {
           if (i === this.newReplyLists.length -1){
             this.lastReplyId = this.newReplyLists[i].id;
           }
           list.push(this.newReplyLists[i]);
         }
         this.replyLists = list;
       }
     })
   },
   */
    textReplace() {
      return this.article.text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    },
    path(path){
      return "http://localhost:8080/ggblog/" + path;
    },
    commentReplace(comment) {
      return comment.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    },
    loveArticle(){
      this.axios.post("/api/dynamic/article/love?id=" + this.articleId).then(res=>{
        if(res){
          if(res.data === true){
            this.article.love++;
          }
        }
      })
    },
    /*
    starOn() {
      this.isStar = true;
      this.star = this.star + 1;
    },
    starOff() {
      this.isStar = false;
      this.star = this.star - 1;
    },
    likeOn() {
      this.isLike = true;
      this.like = this.like + 1;
    },
    likeOff() {
      this.isLike = false;
      this.like = this.like - 1;
    },*/
    commentSubmit() {
      if (this.commentArea === ''){
        return
      }
      this.axios.post("/api/comment/comment",{
         "userId": this.userId,
         "username": this.username,
         "articleId": this.articleId,
         "comment": this.commentArea
      }).then(res=>{
       if(res){
         if(res.data === true){
           this.$message.success("回复成功")
           this.commentArea = '';
           this.commentLoad();
         }
       }
      }).catch(e=>{
        this.$message.error("回复失败" + e)
      })
    },

    /*openReplyDrawer(listenerId,listenerName,commentId){
      this.listener = listenerName;
      this.listenerId = listenerId;
      this.replyCommentId = commentId;
      this.replyDrawer = true;//显示回复draw
    },*/
    reply(){
      // console.log("reply")
      if(this.replyArea.trim() === '')
        return;
      let url = "/api/reply/reply";
      let data = {
        "userId": this.userId,
        "username": this.username,
        "articleId": this.articleId,
        "comment": this.replyArea,
        "replyId": this.replyId,
        "commentId": this.commentId
      };
      // console.log(data)
      this.axios.post(url,data).then(res=>{
          if(res){
            if(res.data === true){
              this.$message.success("回复成功")
              this.replyArea = '';
              this.loadNewReplyPage(this.replyComment,1);
              this.$forceUpdate();
              // this.loadNewReplyPage(this.commentId,1);
            }
          }
      })
    },
    handleCurrentChange(comment,val) {
      // this.seeCommentId = id;
      // this.seeCommentPage = val;
      // this.pageChangeFlag = id + '/' + val;
      this.loadNewReplyPage(comment,val);
    },
    loadNewReplyPage(comment,page){
      let url = "/api/reply/get/" + comment.id + "/" + page + "/" + this.pageSize;
      // console.log(url)
      this.axios.get(url).then(res=>{
        if(res){
          // console.log(list)
          comment.replyLists = res.data.list;
          this.$forceUpdate();
          /*for (let i = 0; i < this.commentLists.length; i++) {
            // console.log(this.commentLists[i].id)
            if(this.commentLists[i].id === id){
              this.commentLists[i].replyLists = list;
              this.$forceUpdate()
              // console.log(this.commentLists[i].replyLists)
            }
          }*/
        }
      })
    },
    loveReply(reply){
      let url = "/api/reply/love?replyId=" + reply.id;
      this.axios.post(url).then(res=>{
        if(res){
          if(res.data === true){
            reply.love++;
            this.$forceUpdate();
          }
        }
      })
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
.header {
  background-color: lightgoldenrodyellow;
  color: #333;
  text-align: center;
  line-height: 5px;
  width: 100%;
  height: 50px;
  padding: 2px;
}

.main {
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

.aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  position: absolute;
  display: block;
  top: 70px;
  bottom: 0;
  left: 8px;
}

.main-content {
  margin: 8px 200px 8px 50px;
  padding: 30px 100px;
  text-align: left;
  background-color: #ffffff;
  box-shadow: 0 0 20px #b6a931;
}


.picture-carousel{
  height: 280px;
  color: #475669;
  opacity: 0.75;
  margin: 10px 0 20px 0;
  background-color: #484a52;
}
.picture-carousel:nth-child(2n) {
}

.picture-carousel:nth-child(2n+1) {
}

/*.recommend-card {
  text-align: left;
  font-size: larger;
}*/

.comment-list-box {
  text-align: left;
}

.comment-list {
  list-style: none;
}

.comment {
  position: relative;
  z-index: 2;
  line-height: 20px;
  padding: 2px 0;
  font-size: 14px;
  text-shadow: none;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}

.info {
  font-size: 14px;
  color: #7D7A65;
  padding: 8px 0;
}
#arc_toolbar_report{
  height: 30px;
  color: #7D7A65;
  padding: 10px;
}
/*.report-like{
  font-size: 30px;
  padding-left: 10px;
}
.report-star{
  font-size: 30px;
  padding-left: 10px;
}*/
.comment-box{
  padding:20px 10px;
}
.comment-content {
  line-height: 20px;
  font-size: 15px;
}
.comment-txt{
  font-size: 12px;
  display: inline-block;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  width: 100%;
  height: 80px;
  transition: 0s;
  padding: 5px 10px;
  line-height: normal;
  outline: none;
}
.name {
  font: bold 16px "Arial Black";
}

.comment-reply-box {
  padding-left: 30px;
}

.comment-data {
  padding-left: 0;
}

.comment-like {
  padding-left: 15px;
}

.comment-replay {
  padding-left: 15px;
}

.btn-comment-replay {
  padding: 2px 4px;
}

.btn-comment-submit {
  width: 90px;
  height: 80px;
  position: absolute;
  top: 0;
  padding: 4px 15px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  min-width: 60px;
  vertical-align: top;
  cursor: pointer;
  background-color: #00a1d6;
  border: 1px solid #00a1d6;
  transition: 0.1s;
  user-select: none;
  outline: none;
}

</style>
