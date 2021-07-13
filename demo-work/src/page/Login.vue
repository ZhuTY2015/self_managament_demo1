<template>
  <div class="login-bg">
    <div class="title text-center">Demo 平台</div>
    <p class="sub-title text-center color-white padding-top">欢迎登录</p>
    <div class="login-box padding-sm">
      <Form ref="loginForm" :model="loginForm" :rules="loginRule">
        <FormItem prop="userName">
          <Input type="text" v-model="loginForm.userName" placeholder="请输入用户名">
            <Icon type="ios-people" size="30" color="#008AFF" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="请输入密码" password>
            <Icon type="ios-key" size="26" color="#008AFF" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <div class="flex justify-between align-center">
            <Input type="text" v-model="loginForm.verifyCode" placeholder="请输入验证码" style="width: 60%;" maxlength="4" @keyup.enter.native="handleSubmit('loginForm')">
              <Icon type="ios-lock" size="26" color="#008AFF" slot="prefix"></Icon>
            </Input>
            <span class="code-css" @click="createCode">{{checkCode}}</span>
          </div>
        </FormItem>
      </Form>
      <Button type="primary" class="login-btn" long @click="handleSubmit('loginForm')" :loading="btnLoading">登录</Button>
      <div class="color-blue text-right padding-top-xs">
        <Checkbox size="small" v-model="isRememberPassword">记住密码</Checkbox>
      </div>
    </div>
    <p class="copy-title">版权所有：@Right</p>
  </div>
</template>

<script>
  import {encryption} from "../util/mixin";

  export default {
    name: "Login",
    mixins:[encryption],
    data(){
      return {
        loginForm:{
          userName:'',
          password:'',
          verifyCode:'',
        },
        loginRule:{
          userName:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          password:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
          verifyCode:[{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        },
        checkCode:'',//验证码
        isRememberPassword:false,//记住密码
        btnLoading:false,//按钮loading
      }
    },
    mounted() {
      this.createCode();
      this.getBrowserUserInfo();
    },
    methods:{
      //初始化验证码
      createCode(len) {
        let code = "";
        ////所有候选组成验证码的字符，当然也可以用中文的
        let codeChars = [2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 26; i++) {
          let dx = String.fromCharCode(65 + i); //输出专A-Z  26个大写字母
          let xx = String.fromCharCode(97 + i); //输出a-z  26个小属写字母
          if (dx !== "I" && dx !== "O") {
            codeChars.push(dx);
          }
          if (xx !== "i" && xx !== "o" && xx !== "l") {
            codeChars.push(xx);
          }
        }
        //循环组成验证码的字符串
        for (let i = 0; i < 4; i++) {
          //获取随机验证码下标
          let charNum = Math.floor(Math.random() * 54);
          //组合成指定字符验证码
          code += codeChars[charNum];
        }
        this.checkCode = code;
      },
      //创建token
      createTokenCode() {
        let code = "";
        ////所有候选组成验证码的字符，当然也可以用中文的
        let codeChars = [2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 26; i++) {
          let dx = String.fromCharCode(65 + i); //输出专A-Z  26个大写字母
          let xx = String.fromCharCode(97 + i); //输出a-z  26个小属写字母
          if (dx !== "I" && dx !== "O") {
            codeChars.push(dx);
          }
          if (xx !== "i" && xx !== "o" && xx !== "l") {
            codeChars.push(xx);
          }
        }
        //循环组成验证码的字符串
        for (let i = 0; i < 20; i++) {
          //获取随机验证码下标
          let charNum = Math.floor(Math.random() * 54);
          //组合成指定字符验证码
          code += codeChars[charNum];
        }
       return code;
      },
      //点击登录按钮
      handleSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = this.loginForm;
            console.log(form);
            if (form.verifyCode.toLowerCase() != this.checkCode.toLowerCase()) {
              this.$Message.error("验证码输入错误！");
              form.verifyCode = "";
              this.createCode();
              return;
            }
            this.getLogin();
          } else {
            // this.$Message.error('请提携!');
          }
        })
      },
      //登录操作
      getLogin(){
        let obj = {
          name:this.loginForm.userName,
          password:this.getAesString(this.loginForm.password),
          isRememberPassword:this.isRememberPassword,
          token:this.createTokenCode(),
        }
        sessionStorage.setItem("userInfo",JSON.stringify(obj))
        if(this.isRememberPassword){
          localStorage.setItem("user",JSON.stringify(obj))
        }else{
          localStorage.setItem("user",'')
        }

        this.btnLoading = true;
        setTimeout(()=>{
          this.$router.push("/HomePage")
          this.btnLoading = false;
        },1500)

      },
      //获取浏览器记住密码
      getBrowserUserInfo(){
        let item = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):'';
        this.loginForm.userName  = item?item.name:'';
        this.loginForm.password  = item?this.decrypt(item.password):'';
        this.isRememberPassword  = item?item.isRememberPassword:false;
      },
    }
  }
</script>

<style scoped lang="less">
  .login-bg{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url("../../static/img/bg_login.jpg");
    background-repeat: no-repeat;
    background-size:auto 100%;
    background-position: center;
  }
  .title{
    font-size: 45px;
    padding-top: 80px;
    color: #1AE0F5;
  }
  .sub-title{
    font-size: 35px;
  }
  .login-box{
    width: 25%;
    height: 50vh;
    background: linear-gradient(to top,#022C7E,transparent);
    margin: 3% auto;
    border-radius: 10px;
    box-shadow: 0 0 10px 3px #B0BED7;
  }
  .copy-title{
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    color: #FFFFFF;
    text-align: center;
  }
  .login-box/deep/ .ivu-form-item{
    margin-bottom: 40px;
  }
  .login-box/deep/ .ivu-input{
    height: 6vh;
    border-radius: 6px;
    border:1px solid #008AFF;
    background-color: transparent;
    color: #008AFF;
    font-size: 16px;
  }
  .login-box/deep/ .ivu-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #008AFF;
  }
  .login-box/deep/ .ivu-input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #008AFF;
  }
  .login-box/deep/ .ivu-input:-ms-input-placeholder{
    color: #008AFF;
  }
  .login-box/deep/ .ivu-input::-webkit-input-placeholder{
    color: #008AFF;
  }
  .login-box/deep/ .ivu-input:-webkit-autofill {
    -webkit-text-fill-color: #008AFF ;
    color: #008AFF;
  }

  .login-box/deep/ .ivu-input-prefix,.login-box/deep/ .ivu-input-suffix{
    width: 50px !important;
    line-height: 6vh;
  }
  .login-box/deep/ .ivu-input-suffix i{
    font-size: 25px;
    color: #999999;
    font-weight: bold;
  }
  .login-box/deep/ .ivu-input-with-prefix{
    padding-left: 55px;
  }
  .login-box/deep/ .ivu-input-wrapper input{
    background: transparent ;
  }
  .login-box/deep/ .login-btn.ivu-btn.ivu-btn-primary{
    height: 5vh !important;
    border: 1px solid #FFFFFF;
    margin-top: 5vh;
  }
  input{
    font-size: 16px !important;
    color: #008AFF;
  }
  .code-css{
    display: inline-block;
    height: 6vh;
    line-height: 6vh;
    width: 37%;
    margin-left: 3%;
    background-color: #d3d3d3;
    border-radius: 6px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 7px;
    cursor: pointer;
    position: relative;
  }
  .code-css:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 25%;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    border-right: 1px solid #666;
    border-bottom-right-radius: 100%;
    border-top-left-radius: 50%;
    left: 0;
    top: 50%;
  }

</style>
