<template>
  <div class="page-header-component">
      <el-popover
        placement="bottom"
        trigger="hover"
        width="120">
        <div>
          <el-badge :value="reply" :max="99" class="item badge-message" :hidden="reply === 0">
            <el-button size="small" @click="toReply()" style="width: 100px;margin-left: 15px">回复</el-button>
          </el-badge>
          <el-badge :value="at" :max="99" class="item badge-message" :hidden="at === 0">
            <el-button size="small" @click="toAt()" style="width: 100px;margin-left: 15px">@我</el-button>
          </el-badge>
          <el-badge :value="love" :max="99" class="item badge-message" :hidden="love === 0">
            <el-button size="small" @click="toLove()" style="width: 100px;margin-left: 15px">点赞</el-button>
          </el-badge>
          <el-badge :value="system" :max="99" class="item badge-message" :hidden="system === 0">
            <el-button size="small" @click="toSystem()" style="width: 100px;margin-left: 15px">通知</el-button>
          </el-badge>
        </div>

        <el-link slot="reference" :underline="false"
                 icon="el-icon-chat-dot-square"
                 class="page-header-link"
                 @click="toReply">
          <el-badge :value="reply + love + at + system" :max="99" :hidden="reply + love + at + system === 0">
            消息
          </el-badge>
        </el-link>
      </el-popover>
  </div>
</template>

<script>
export default {
  name: "Message",
  data(){
    return{
      userId : localStorage.getItem('userId'),
      reply:0,
      love:0,
      at:0,
      system:0
    }
  },
  mounted(){
    this.initReply();
  },
  methods:{
    initReply(){
      this.axios.get("/api/reply/message/new/count/" + this.userId).then(r=>{
        if (r){
          if(r.data != null){
            this.reply = r.data;
          }
        }
      })
    },
    toReply(){
      this.reply = 0;
      this.$router.push('/space/' + this.userId + '/reply');
    },
    toAt(){
      this.at = 0;
      this.$router.push('/space/' + this.userId  + '/at');
    },
    toLove(){
      this.love = 0;
      this.$router.push('/space/' + this.userId  + '/love');
    },
    toSystem(){
      this.system = 0;
      this.$router.push('/space/' + this.userId  + '/system');
    }
  }
}
</script>

<style scoped>
.badge-message{
  margin: 10px 10px;
}
.page-header-component{
  height: 55px;
  width: 100%;
  text-align:center;
}
.page-header-link{
  font:18px 新宋体,"Arial Black";
  color: #27aeb3;
  line-height: 25px;
  margin-top: 15px;
}
</style>
