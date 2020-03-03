<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" v-model="form.username" placeholder="请输入账号" />
          </div>
          <div class="input">
            <input type="password" v-model="form.password" placeholder="请输入密码" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" @click="loginBtn" class="btn">登录</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录/注册</div>
            <div class="reg" @click="register">
              立即注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a>
        <span>|</span>
        <a
          href="https://coding.imooc.com/class/343.html"
          target="_blank"
        >微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyRight">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "jack",
        password: "jack"
      },
      userId: ""
    };
  },
  methods: {
    loginBtn() {
      this.axios.post("/user/login", this.form).then(res => {
        this.$cookie.set("userId", res.id, { expires: "Session" });
        //to-do 保存用户名，保存用户信息
        this.$store.dispatch("saveUserName", res.username);
        //  query 类似于get方式！拼接地址
        // this.$router.push({
        //   path: "/index",
        //   query: {
        //     from: "login"
        //   }
        // });
        // params 类似于post 不拼接地址，但是需要使用name,和vue-router里面的name一样
        this.$router.push({
          name: "index",
          params: {
            from: "login"
          }
        });
      });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "admin",
          password: "123456",
          email: "admin@22.com"
        })
        .then(res => {
          console.log(res);
          alert("注册成功");
        });
    }
  }
};
</script>

<style lang='scss' scope>
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      position: relative;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #fff;
        position: absolute;
        bottom: 29px;
        right: 0px;
        h3 {
          line-height: 23px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          line-height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding-left: 18px;
            outline: none;
            box-sizing: border-box;
            font-size: 14px;
          }
        }
        .btn {
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    border-top: none;
    .footer-link {
      a {
        color: #999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .coryRight {
      margin-top: 13px;
    }
  }
}
</style>