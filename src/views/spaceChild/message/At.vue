<template>
  <div class="message-reply">
    <h2>@我的</h2>
    <div v-if="newReplyList.length > 0">
      <span>新的</span>
      <ul class="reply-list">
        <li v-for="reply in newReplyList" :key="reply.commentId" class="reply-item">
          <el-card>
            <el-row :gutter="10">
              <el-col :span="16">
                <div>
                  <el-link :underline="false" :href="'/space/' + reply.userId + '/index'" class="link-reply">
                    <span class="reply-text name">{{reply.username}}</span>
                  </el-link>
                  <span v-if="reply.type==='dynamic'" class="reply-text">在动态中@了我</span>
                  <span v-else-if="reply.type==='comment'"  class="reply-text">在评论中@了我</span>
                </div>
                <p class="comment-text">{{reply.reply}}</p>
                <div>
                  <span class="info">{{reply.time}}</span>
                  <el-button round size="mini" style="padding: 2px 4px;" @click="commentId = reply.commentId">回复</el-button>
                  <div v-if="commentId === reply.commentId" class="comment-box">
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
                  <span v-if="reply.type==='dynamic'" class="reply-text">在动态中@了我</span>
                  <span v-else-if="reply.type==='comment'"  class="reply-text">在评论中@了我</span>
                </div>
                <p class="comment-text">{{reply.reply}}</p>
                <div>
                  <span class="info">{{reply.time}}</span>
                  <el-button round size="mini" style="padding: 2px 4px;" @click="commentId = reply.commentId">回复</el-button>
                  <div v-if="commentId === reply.commentId" class="comment-box">
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
  name: "At",
  data(){
    return{
      userId:localStorage.getItem('userId'),
      commentId:'',
      commentArea:'',
      replyList:[{
        commentId:'1211111111111111111111113',
        userId:'12223',
        username:'哈哈',
        reply:'111111',
        type:'dynamic',
        sourceComment:'源评论',
        dynamicId:'123',
        dynamicTitle:'安抚',
        time:'2022-2-22 22:22'
      },
        {
          commentId:'122222222222222234',
          userId:'12312313',
          username:'s是否f',
          reply:'22222222222222',
          type:'comment',
          sourceComment:'源评论',
          dynamicId:'123',
          dynamicTitle:'安抚',
          time:'2022-2-22 22:22'
        }],
      newReplyList:[
        {
          commentId:'12333333333333333333323',
          userId:'122223',
          username:'哈哈哈',
          reply:'3333333333',
          type:'dynamic',
          sourceComment:'源评论',
          dynamicId:'123',
          dynamicTitle:'安抚',
          time:'2022-2-22 22:22'
        },
        {
          commentId:'1114444444444444123',
          userId:'123',
          username:'s少时诵诗书所所所f',
          reply:'1111111111111111111',
          type:'comment',
          sourceComment:'源评论',
          dynamicId:'123',
          dynamicTitle:'安抚',
          time:'2022-2-22 22:22'
        }
      ]
    }
  },
  methods:{
    commentSubmit(){
      this.$message.success('回复:' + this.commentId + ',内容:' + this.commentArea)
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
