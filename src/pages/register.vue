<template>
    <div class="register">
      <div class="main">
        <div class="mainRight">
          <h2>欢迎来到注册页面</h2>
          <h3>大连“旗战”球迷协会管理网站</h3>
          <!-- 表单部分 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
          >
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名" v-model="ruleForm.username" prefix-icon="el-icon-user" show-password></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="ruleForm.email" prefix-icon="el-icon-c-scale-to-original" show-password></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="请输入电话" v-model="ruleForm.phone" show-password
                        prefix-icon="el-icon-mobile-phone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="primary" @click="register('ruleForm')">注册</el-button>
            <br />
            <a @click.prevent="toLogin" style="cursor: pointer" href="">登录</a>
          </el-form>
        </div>
      </div>
    </div>

</template>

<script>

export default {
  name: "register",
  data:function () {
    // 用户名校验方法
    var validateUser = (rule, value, callback) => {
      const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      const username = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      if (!value) {
        return callback(new Error("请输入对应信息"));
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
      ruleForm: {
        username: "",
        password: "",
        email:'',
        phone:''
      },
      // 校验
      rules: {
        username: [
          {
            required: true,
            validator: validateUser,
            trigger: "blur",
          },
        ],phone: [
          {
            required: true,
            validator: validateUser,
            trigger: "blur",
          },
        ],
        email: [
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
        checktime:''
      },
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.changeDate();
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    //日期格式修改
    setZero(a) {//设置小于10的数字在加0
      return a < 10 ? "0" + a : a;
    },
    changeDate(){
      debugger
      var date = new Date();
      let year = date.getFullYear();
      let month = this.setZero(date.getMonth()+1);
      let day = this.setZero(date.getDate());
      let hour = this.setZero(date.getHours());
      let minute = this.setZero(date.getMinutes());
      let second = this.setZero(date.getSeconds());
      this.checktime = year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒'
      console.log(this.checktime)
    },
    register(ruleForm) {
      this.$http({
        url: this.$http.adornUrl('/api/register'),
        method: 'post',
        data: this.$http.adornData({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          email:this.ruleForm.email,
          phone:this.ruleForm.phone,
          time:this.checktime
        })
      }).then(({data}) => {
        if(data.status == 0){
          //注册成功
          this.$message('注册成功即将跳转至登录页面')
          setTimeout(()=>{
            this.$router.push('/login')
          },3000)
        }else{
          //注册失败
          this.$message('此邮箱已注册')
        }
      })

    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item{
  margin:0;
}
.register{
  width:100%;
  height:100vh;
  background-image: url("../assets/img/2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main {
    width: 295px;
      height: 500px;
    position: absolute;
    top: 155px;
    right: 10vw;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    overflow: hidden;

    .mainLeft {
      width: 510px;
      height: 500px;
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
      height: 500px;
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
