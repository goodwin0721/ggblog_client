<template>
<div class="text-edit-main">
  <el-backtop target=".text-edit-main"></el-backtop>
  <el-input v-model="title" class="text-edit-title" placeholder="请输入标题（建议30字以内）" maxlength="40" show-word-limit></el-input>
  <el-input type="textarea"
            v-model="content"
            placeholder="请输入正文（8000字以内）"
            maxlength="8000"
            :autosize="{ minRows: 15, maxRows: 50}"
            show-word-limit>
  </el-input>
  <div>
    <el-upload
      class="upload-picture text-edit-upload"
      action=""
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="uploadPicture"
      multiple
      :limit="9"
      :on-exceed="handleExceed"
      list-type="picture-card"
      :auto-upload="false"
      :file-list="fileList">
      <i class="el-icon-upload"><br></i>
      <div slot="tip" class="el-upload__tip">最多可以上传9张图片，只能上传jpg/png文件，且不超过1MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
  <div>
    <p>请选择专栏分类</p>
    <el-radio-group v-model="radio">
      <el-radio-button label="生活"></el-radio-button>
      <el-radio-button label="游戏"></el-radio-button>
      <el-radio-button label="影视"></el-radio-button>
      <el-radio-button label="音乐"></el-radio-button>
      <el-radio-button label="知识"></el-radio-button>
      <el-radio-button label="美食"></el-radio-button>
      <el-radio-button label="运动"></el-radio-button>
      <el-radio-button label="科技"></el-radio-button>
    </el-radio-group>
    <p class="text-edit-info">当前选择分类：{{radio}}</p>
    <p class="el-icon-warning-outline text-edit-info">非必选，若不选择分类，则默认进入生活分区</p>
  </div>
  <el-button type="primary" round @click="deliver">发表文章</el-button>
  <el-button round @click="log">存草稿</el-button>
</div>
</template>

<script>
export default {
  name: "TextEdit",
  data(){
    return {
      title:'',
      content:'',
      radio:"生活",
      fileList:[],
      scrList:[],
      dialogImageUrl: '',
      uploadUrl:'/api/dynamic/upload/picture',
      dialogVisible: false
    }
  },
  methods: {
    //上传文件之前的钩子
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt1M = file.size / 1024 < 1024;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return (isJPG || isPNG) && isLt1M;
    },
    //上传图片
    uploadPicture(file,fileList){
      // console.log(file)
      let fd = new FormData()
      fd.append('file', file.raw) //传给后台接收的名字 file
      this.axios.post("/api/file/picture/upload", fd,{
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(res=>{
        if(res.data !== "null"){
          this.scrList.push(res.data);
          console.log("上传图片到：" + res.data);
          file.name = res.data;
          // console.log(file)
        }
      })
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      let param = new URLSearchParams();
      param.append("path",file.name)
      this.axios.post("/api/file/picture/remove", param,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res=>{
        if (res){
          if(res.data === true) {
            this.fileList = fileList;
            let index = this.scrList.indexOf(file.name);
            this.scrList.splice(index,1);
          }
        }
      })
    },
    //文件上传成功时的钩子
    handleSuccess(response, file, fileList){
      console.log(file.name);
      console.log(fileList)
      this.fileList = fileList;
      // console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.name);
      console.log(file.url);
      this.dialogVisible = true;
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //删除图片前的钩子函数
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //发表文章
    deliver(){
      if(this.verify()){
        this.axios.post("/api/dynamic/article/write",{
          "userId":localStorage.getItem("userId"),
          "title":this.title,
          "text":this.content,
          "pictureUrl":this.scrList,
          "type":this.radio
        }).then(res=>{
          if (res){
            if (res.data === true){
              setTimeout(()=>{
                this.$message.success("成功发表文章")
              }, 1000 );
              this.cleanForm();
            }else{
              this.$message.warning("发表动态失败")
            }
          }
        })
      }
    },
    //验证是否符合发表文章条件
    verify(){
      if(this.title.trim().length===0){
        this.$message.warning("标题不能为空");
        return false;
      }
      if(this.content.trim().length===0){
        this.$message.warning("完成文章正文再发表吧");
        return false;
      }
      return true;
    },
    //清空
    cleanForm(){
      this.title = "";
        this.content = "";
        this.scrList = [];
        this.radio = "生活";
        this.fileList = [];
    },
    log(){
      this.$message.info("还没完工")
      // console.log(this.fileList);
      console.log(this.scrList)
    }
  }
}
</script>

<style scoped>
.text-edit-main{
  text-align: left;
  padding-bottom: 100px;
}
.text-edit-title{
  margin: 10px 0;
}
.text-edit-info{
  margin: 10px 0;
  padding: 0;
  font-size: 12px;
  color: #8d8c87;
}
.text-edit-upload{
  margin: 10px 0;
}
</style>
