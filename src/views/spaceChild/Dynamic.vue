<template>
<div class="space-dynamic">
  <el-backtop target=".space-dynamic">up</el-backtop>
  <div class="dynamic-list">
    <ul class="ul-dynamic-list"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in lists" :key="index" class="li-dynamic">
        <el-card shadow="hover" class="dynamic-box">
          <div class="dynamic-title" slot="header">
            <el-row :gutter="10">
              <el-col :span="22">
                <el-link class="article-title" :underline="false" target="_blank" rel="opener"
                         :href="'/details/' + item.id">
                  <span>{{item.title}}</span>
                </el-link>
              </el-col>
              <el-col :span="2" style="text-align: right" v-if="isOwner">
                <el-popover
                  width="30"
                  placement="bottom-end"
                  trigger="click">
                  <div style="text-align: center; margin: 0">
                    <el-button type="primary" size="mini">置顶</el-button>
                    <el-button type="text" size="mini" @click="deleteAction(item)">删除</el-button>
                  </div>
                  <el-button slot="reference" type="text"><i class="el-icon-more"></i></el-button>
                </el-popover>
              </el-col>
            </el-row>
          </div>
          <div class="dynamic-body">
            <el-row :gutter="10">
              <el-col :span="18">
                <div>
                  <p class="article-content">{{item.shortText}}</p>
                  <p class="info article-content" style="text-align: left">{{showTime(item.creationTime)}}</p>
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
      </li>
    </ul>
    <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
    <el-divider v-if="noMore">
    </el-divider>
  </div>
</div>
</template>

<script>
export default {
  name: "Dynamic",
  data() {
    return {
      loading: false,
      lists: [],
      uid : this.$route.params.userId,
      page : 1,
      pageSum:0
    }
  },
  computed: {
    noMore() {
      return this.page > this.pageSum;
    },
    disabled() {
      return this.loading || this.noMore
    },
    isOwner(){
      return this.$route.params.userId === localStorage.getItem("userId");
    }
  },
  mounted() {
    this.loadDynamic(this.uid,this.page);
  },
  methods: {
    loadDynamic(uid,page){
      let list = [];
      let url = "/api/dynamic/article/list/" + uid + "/" + page
      this.axios.get(url).then(res=>{
        if(res){
          if(res.data.list !== null){
            list = res.data.list;
            let temp = this.lists;
            for (let i = 0; i < list.length; i++) {
              temp.push(list[i]);
            }
            this.lists = temp;
            this.$forceUpdate();
          }
          this.pageSum = res.data.pageCount;
          this.page = this.page + 1;
        }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.loadDynamic(this.uid,this.page);
        this.loading = false
      }, 1000)
    },
    deleteAction(dynamic){
      this.$confirm('是否删除此动态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDynamic(dynamic);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteDynamic(dynamic){
      this.axios.post("/api/dynamic/article/delete?articleId="+dynamic.id).then(res=>{
        if(res){
          if(res.data === true){
            for (let i = 0; i < this.lists.length; i++) {
              if(this.lists[i] === dynamic){
                this.lists.splice(i,1);
              }
            }
            this.$message.success("删除成功");
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
.space-dynamic{
  background-color: #4c4c4c;
  margin: 10px;
  box-shadow: 0 0 20px #b6a931;
}

.info {
  font-size: 14px;
  color: #7D7A65;
  padding: 8px 0;
  text-align: left;
  line-height: 18px;
}
.dynamic-list{
  width: 90%;

  padding: 10px 5%;
}
.ul-dynamic-list{
  min-height: 480px;
  padding: 0;
  list-style: none;
}
.dynamic-title{
  height: 30px;
  text-align: left;
  font-size: 16px;
}
.dynamic-body{
  color: #7D7A65;
  font-size: 16px;
}
.article-title{
  font-size: 25px;
  height: 30px;
  line-height: 30px;
}
.li-dynamic{
  padding-top: 10px;
}
.article-content{
  text-align: left;
  line-height: 18px;
}
</style>
