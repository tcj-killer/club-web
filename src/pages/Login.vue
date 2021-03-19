<template>
  <!-- 登陆界面 -->
  <div class="login-page">
    <!-- 静态信息部分 -->
    <div class="main">
      <div class="mainRight">
        <h2>欢迎登录</h2>
        <h3>大连“旗战”球迷协会管理网站</h3>
        <!-- 表单部分 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入内容" v-model="ruleForm.username">
              <template slot="prepend">
                <img src="../assets/yonghu-2.png" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              show-password
            >
              <template slot="prepend">
                <img src="../assets/mima-2.png" />
              </template>
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <br />
          <a href="#" @click="wangji()">忘记密码，寻求帮助？</a>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    // 用户名校验方法
    var validateUser = (rule, value, callback) => {
      const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      const username = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      if (!value) {
        return callback(new Error("请输入用户名/手机号/邮箱"));
      }
      setTimeout(() => {
        if (!email.test(value) && !phone.test(value) && !username.test(value)) {
          return callback(new Error("您输入的用户名/手机号/邮箱有误"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      userType: "01",
      roles: "",
      ruleForm: {
        username: "abc",
        password: "123456",
      },
      // 校验
      rules: {
        username: [
          {
            required: true,
            validator: validateUser,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            pattern: /^[0-9A-Za-z]{8,16}$/,
            message: "用户名或密码错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    submitForm(ruleForm) {
      this.$router.push("/usermanages");
      this.$http({
        url: this.$http.adornUrl("/login"),
        method: "post",
        data: this.$http.adornData({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        }),
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$router.push("/usermanages");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取登陆人信息
    loginPerson() {
      let personParms = {};
      this.$axios
        .get("prod-api/common/getLoginInfo", personParms)
        .then((res) => {
          if (200 == res.data.code) {
            localStorage.setItem("userName", res.data.user.userName);
            this.roles = res.data.roles[0];
            console.log(this.roles);
            if (this.roles != "app" && this.roles != "admin") {
              this.$router.push("/OrderManages");
            } else {
              this.ruleForm.username = "";
              this.ruleForm.password = "";
              this.$message({
                showClose: true,
                message: "请用pc端用户登录",
                type: "error",
              });
            }
          }
        });
    },
    //忘记密码
    wangji() {
      this.$message({
        showClose: true,
        message: "请联系管理员",
        type: "error",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.login-page {
  background-image: url(../assets/bj.jpg);
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  .logo {
    position: absolute;
    left: 40px;
    top: 30px;
    color: white;
    font-weight: 900;
    font-size: 25px;
  }
  .main {
    width: 295px;
    height: 363px;
    position: absolute;
    top: 155px;
    right: 10vw;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    overflow: hidden;

    .mainLeft {
      width: 510px;
      height: 363px;
      background-color: rgba(165, 164, 164, 0.5);
      float: left;
      h1 {
        font-size: 30px;
        color: #ffffff;
        margin-top: 95px;
        margin-left: 35px;
      }

      h2 {
        font-size: 11px;
        color: #ffffff;
        margin-left: 35px;
        margin-top: 20px;
        font-weight: 200;
      }
    }
    .mainRight {
      width: 295px;
      height: 362px;
      background-color: #ffffff;
      float: left;
      h2 {
        margin-top: 45px;
        margin-left: 40px;
        font-size: 20px;
      }

      h3 {
        margin-top: 15px;
        margin-left: 40px;
        color: #b9b9b9;
        font-size: 15px;
        font-weight: 400;
      }
      .el-form {
        margin-left: 40px;
        .el-form-item {
          .el-input {
            width: 215px;
            margin-top: 20px;
            height: 15px;
            outline: none;
            img {
              height: 15px;
            }
          }
        }
        .el-button {
          width: 210px;
          height: 40px;
          margin: 0 auto;
          margin-top: 30px;
        }
        a {
          font-size: 14px;
          color: lightgrey;
        }
      }
    }
  }
}
</style>
