<template>
  <div>
    <el-container>
      <el-header id="header">
        <page-header></page-header>
      </el-header>
      <el-main id="main">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-box">
          <h3 class="login-title">账号注册</h3>
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerForm.username" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-dialog
          :visible.sync="dialogVisible"
          title="温馨提示"
          width="30%">
          <span>注册成功</span>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pageHeader from '../components/PageHeader'
import axios from "axios";
export default {
  name: "Register",
  components:{
    pageHeader
  },
  data() {
    let validateUsername= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        axios.get("/api/user/register/isExistUsername/" + this.registerForm.username).then(res=>{
          if(res){
            if(res.data === true){
              callback(new Error('账号已存在'));
            }
            callback();
          }
        }).catch(e=>{
          console.log(e)
        });
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPassword !== '') {
          this.$refs.registerForm.validateField('checkPassword');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username:'',
        password: '',
        checkPassword: ''
      },
      dialogVisible: false,
      rules: {
        username:[
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //输入验证成功，进行注册
          this.axios.post("/api/user/register",{
            "username":this.registerForm.username,
            "password":this.registerForm.password
          }).then(res=>{
            if(res.data === true){
              this.dialogVisible=true;
              this.sleep(2000).then(() => {
                this.$router.push("/login");
              })
            }
          }).catch(e=>{
            console.log(e)
          });
        } else {
          console.log('注册输入有误!!');
          return false;
        }
      });
    },
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.register-box {
  border: 1px solid #DCDFE6;
  width: 400px;
  margin: 30px auto;
  padding: 15px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
</style>
