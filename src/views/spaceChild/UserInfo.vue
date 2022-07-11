<template>
<div class="userInfo-box">
  <el-descriptions :title="title" :column="1" size="medium" >

    <el-descriptions-item label="头像">
      <el-avatar :size="146">
        <el-upload
          class="avatar-uploader"
          style="margin-top: -1px;margin-left: -1px"
          action=""
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-change="uploadPicture"
          :on-exceed="handleExceed"
          list-type="picture-card"
          :auto-upload="false"
          :file-list="fileList"
          :limit="1"
          :disabled="disabled">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-avatar>
    </el-descriptions-item>
    <el-descriptions-item label="GID">{{user.id}}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{user.username}}</el-descriptions-item>
    <!--
    <el-descriptions-item label="用户名">
      <el-input type="text" v-model="user.username" size="mini" :disabled="disabled"></el-input>
    </el-descriptions-item>
    -->
    <el-descriptions-item label="手机号">
      <el-input type="text" v-model="user.telephone" size="mini" :disabled="disabled"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="性别" >
      <el-radio-group v-model="user.gender">
        <el-radio :label="1" :disabled="disabled">男</el-radio>
        <el-radio :label="2" :disabled="disabled">女</el-radio>
      </el-radio-group>
    </el-descriptions-item>
    <el-descriptions-item label="出生日期">
      <el-date-picker type="date" :disabled="disabled"
                      style="width:170px;"
                      placeholder="选择日期" v-model="user.birthdate"
                      size="mini" format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-descriptions-item>
    <el-descriptions-item label="个人签名">
      <el-input type="textarea" maxlength="50" :disabled="disabled"
                show-word-limit v-model="user.signature"
                 autosize size="mini" style="width: 600px">
      </el-input>
    </el-descriptions-item>
    <template slot="extra" v-if="disabled ===false">
      <el-button type="primary" size="small" @click="submit" :disabled="hasChange === false">保存</el-button>
    </template>
  </el-descriptions>
</div>
</template>

<script>
export default {
  name: "UserInfo",
  data(){
    return {
      loginUserId:localStorage.getItem("userId"),
      user:{
        id:"",
        username:"",
        gender:"1",
        telephone:"",
        signature:"",
        birthdate:'',
        avatar:''
      },
      fileList:[],
      avatarSrc:'',
      hasChange:false
    }
  },
  mounted() {
    this.userInit();
  },
  computed:{
    disabled(){
      return this.$route.params.userId !== this.loginUserId;
    },
    title(){
      if(this.$route.params.userId === this.loginUserId)
        return '我的信息'
      else return 'TA的信息'
    }
  },
  methods:{
    userInit(){
      this.axios.get("/api/user/uid/" + this.$route.params.userId).then(res=>{
        if(res){
          this.user = res.data;
          // console.log(this.user.avatar !== null && this.user.avatar !== '')
          if(this.user.avatar !== null && this.user.avatar !== ''){
            let file = {
              name:this.user.avatar,
              url:"http://localhost:8080/ggblog/" + this.user.avatar
            }
            this.fileList.push(file);
            this.avatarSrc = this.user.avatar;
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    },
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
    uploadPicture(file){
      // console.log(file)
      let fd = new FormData()
      fd.append('file', file.raw) //传给后台接收的名字 file
      this.axios.post("/api/file/avatar/upload", fd,{
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(res=>{
        if(res.data !== "null"){
          this.avatarSrc = res.data;
          file.name = res.data;
          this.hasChange = true;
          // console.log(this.avatarSrc)
        }
      })
    },
    //文件列表移除文件时的钩子
    handleRemove(file) {
      // console.log(file.name)
      let param = new URLSearchParams();
      param.append("path",file.name)
      this.axios.post("/api/file/picture/remove", param,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        if (res){
          if(res.data === true) {
            this.fileList = [];
            this.avatarSrc = '';
            this.hasChange = true;
          }
        }
      })
    },
    handleExceed(file){

    },
    submit(){
      let data = {
        "id":this.user.id,
        "username":this.user.username,
        "gender":this.user.gender,
        "telephone":this.user.telephone,
        "signature":this.user.signature,
        "birthdate":this.user.birthdate,
        "avatar":this.avatarSrc
      }
      // console.log(data)
      this.axios.post("/api/user/update", data).then(res=>{
        if(res){
          if(res.data === true)
            localStorage.setItem("username",this.user.username);
            localStorage.setItem("avatar",this.avatarSrc);
            this.$forceUpdate();
            this.$message.success("修改成功");
            this.hasChange = false;
        }
      }).catch(e=> {
        console.log(e)
      });
    }
  }
}
</script>

<style scoped>
.userInfo-box{
  margin: 10px 20px;
  padding: 20px 100px;
  background-color: #ffffff;
}
</style>

