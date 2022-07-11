<template>
  <div>
    <el-container>
      <el-header>
        <page-header></page-header>
      </el-header>
      <el-main>
        <div>
          <el-form ref="loginForm" :model="form" :rules="rules" class="login-box" label-width="80px" status-icon>
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" placeholder="请输入账号" type="text"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>

          <el-dialog
            :visible.sync="dialogVisible"
            title="温馨提示"
            width="30%">
            <span>密码不正确</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pageHeader from '../components/PageHeader'

export default {
  name: "Login",
  components: {
    pageHeader
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      user:{
        id:0,
        username:null,
        avatar:null
      },
      dialogVisible: false,
      //表单验证，需要在 el-form-item 元素中增加prop属性
      rules: {
        username: [
          {required: true, message: "账号不可为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "密码不可为空", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      //为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      let userdata = {
        "username":this.form.username,
        "password":this.form.password
      };
      this.axios({
        method:"post",
        url:"/api/user/login",
        data:userdata
      }).then(respond=>{
        if(respond){
          this.user = respond.data;
          let _user = this.user;
          if(_user.id != null && _user.id !== ""){
            // 登录成功
            // console.log(respond);
            // console.log(respond.data)
            localStorage.setItem("username", this.user.username);
            localStorage.setItem("userId", this.user.id);
            localStorage.setItem("avatar",this.user.avatar);
            localStorage.setItem("loginInfo", 'true');
            //使用vue-router路由到指定界面，该方式称为编程式导航
            this.$router.push('/recommend');
          }
          else{
            this.dialogVisible = true;
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 100px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
