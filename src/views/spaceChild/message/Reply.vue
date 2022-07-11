<template>
<div class="message-reply">
  <h2>回复我的</h2>
  <div v-if="newReplyList.length > 0">
    <span>新的</span>
    <ul class="reply-list">
      <li v-for="reply in newReplyList" class="reply-item">
        <el-card>
          <el-row :gutter="10">
            <el-col :span="16">
              <div>
                <el-link :underline="false" :href="'/space/' + reply.userId + '/index'" class="link-reply">
                  <span class="reply-text name">{{reply.username}}</span>
                </el-link>
                <span v-if="reply.type==='回复'" class="reply-text">回复了我的评论</span>
                <span v-else-if="reply.type==='评论'"  class="reply-text">评论了我的动态</span>
              </div>
              <p class="comment-text">{{reply.comment}}</p>
              <div>
                <span class="info">{{reply.creationTime}}</span>
                <el-button round size="mini" style="padding: 2px 4px;" @click="commentId = reply.id">回复</el-button>
                <div v-if="commentId === reply.id" class="comment-box">
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
              </div>
            </el-col>
            <el-col :span="8">
              <el-link :href="'/details/' + reply.articleId" :underline="false">
                <span class="name">【跳转源动态点击这里】</span>
              </el-link>
              <div v-if="reply.type==='回复'">
                <el-divider></el-divider>
                <p class="comment-text">这里是我的评论，没获取</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </li>
    </ul>
    <el-divider></el-divider>
  </div>
  <div>
    <span>累计</span>
    <ul class="reply-list">
      <li v-for="reply in replyList" :key="reply.commentId" class="reply-item">
        <el-card>
          <el-row :gutter="10">
            <el-col :span="16">
              <div>
                <el-link :underline="false" :href="'/space/' + reply.userId + '/index'" class="link-reply">
                  <span class="reply-text name">{{reply.username}}</span>
                </el-link>
                <span v-if="reply.type==='reply'" class="reply-text">回复了我的评论</span>
                <span v-else-if="reply.type==='comment'"  class="reply-text">评论了我的动态</span>
              </div>
              <p class="comment-text">{{reply.reply}}</p>
              <div>
                <span class="info">{{reply.time}}</span>
                <el-button round size="mini" style="padding: 2px 4px;" @click="commentId = reply.commentId ; commentType = reply.type">回复</el-button>
                <div v-if="commentId === reply.commentId && commentType === reply.type" class="comment-box">
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
              </div>
            </el-col>
            <el-col :span="8">
              <el-link :href="'/details/' + reply.dynamicId" :underline="false">
                <span class="name">{{reply.dynamicTitle}}</span>
              </el-link>
              <div v-if="reply.type==='reply'">
                <el-divider></el-divider>
                <p class="comment-text">{{reply.sourceComment}}</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
  <el-divider></el-divider>
</div>
</template>

<script>
export default {
  name: "Reply",
  data(){
    return{
      userId:localStorage.getItem('userId'),
      commentId:'',
      commentType:'',
      commentArea:'',
      replyList:[{
        commentId:'10002',
        userId:'10002',
        username:'路人甲',
        reply:'白日依山尽，黄河入海流',
        type:'reply',
        sourceComment:'源评论',
        dynamicId:'123',
        dynamicTitle:'标题',
        time:'2022-2-22 22:22'
      },
        {
          commentId:'10003',
          userId:'10003',
          username:'路人乙',
          reply:'床前明月光，疑是地上霜',
          type:'comment',
          sourceComment:'源评论',
          dynamicId:'123',
          dynamicTitle:'静夜思',
          time:'2022-2-22 22:22'
        }],
      newReplyList:[]
    }
  },
  mounted() {
    this.loadNewReply();
  },
  methods:{
    commentSubmit(){
      this.$message.success('回复:' + this.commentId + ',内容:' + this.commentArea)
    },
    loadNewReply(){
      this.axios.get("/api/reply/message/new/" + this.userId).then(res=>{
        if (res){}
          if (res.data){
            this.newReplyList = res.data;
          }
      })
    }
  }
}
</script>

<style scoped>
.message-reply{
  background-color: #ffffff;
  text-align: left;
  padding: 10px 20px;
}
.reply-list{
  list-style: none;
  padding:  0;
  margin: 10px 0;
}
.reply-item{
  margin: 10px 0;
  font-size: 22px;
  line-height: 24px;
}
.comment-text{
  font-size: 16px;
  line-height: 18px;
}
.reply-text{
  font-size: 16px;
  line-height: 18px;
}
.name{
  font: bold 16px "Arial Black";
  color: #0e0d0d;
  line-height:18px;
}
.name:hover{
  color: #0869fa;
}
.link-reply{
  padding: 0;
  height: 28px;
  margin: 0;
}
.info {
  font-size: 14px;
  color: #7D7A65;
  padding: 8px 0;
}
</style>
