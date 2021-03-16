<template>
  <div class="header">
    <!-- 页面头部 公共组件 -->
    <div class="systemTitle">数码乡村后台管理系统</div>
    <div class="headerRight">
      <div class="header-user-con">
        <div class="user-avator">
          <img src="../assets/tx.jpg" />
          <!-- 头像 -->
        </div>
        <span>{{userName}}</span>
        <!-- 用户名 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom"></i>
          </span>
          <!-- 下拉框 修改密码 退出登录 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogPwdEdit"
      width="380px"
      :close-on-click-modal="false"
      :before-close="cancelDialog"
    >
      <!-- 修改密码表单 -->
      <el-form
        :model="editPwd"
        :rules="rules"
        ref="editPwd"
        label-width="100px"
        label-position="right"
        class="changePassword"
      >
        <el-form-item label="原密码" prop="rePassWord" style="position: relative;">
          <el-input :type="passWord" v-model="editPwd.rePassWord"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="passWord">
          <el-input :type="passWord" v-model="editPwd.passWord" @keyup.native="myFunction()"></el-input>
          <span class="one" v-if="isshow1">弱</span>
          <span class="two" v-if="isshow2">中</span>
          <span class="three" v-if="isshow3">强</span>
          <!-- 密码强度 -->
        </el-form-item>
        <el-form-item label="确认密码" prop="passWordCheck">
          <el-input :type="passWord" v-model="editPwd.passWordCheck"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取消</el-button>
        <el-button type="primary" @click="editPwdSure()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 原密码校验
    var validatePassWord = (rule, value, callback) => {
      const passWord = /^[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入原密码"));
      }
      setTimeout(() => {
        if (!passWord.test(value)) {
          return callback(new Error("密码为8-16位英文或数字"));
        } else {
          if (this.editPwd.passWord !== "") {
            this.$refs.editPwd.validateField("passWord");
          }
        }
      }, 100);
    };
    // 密码校验
    var validatePassWordCheck = (rule, value, callback) => {
      const passWord = /^[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passWord.test(value)) {
        callback(new Error("密码为8-16位英文或数字"));
      } else if (value == this.editPwd.rePassWord) {
        callback(new Error("两次输入密码与原密码不能一致!"));
        this.editPwd.passWord = "";
      } else {
        callback();
      }
    };
    // 确定密码校验
    var validatePassWordCheckOne = (rule, value, callback) => {
      const passWord = /^[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.editPwd.passWord) {
        callback(new Error("两次输入密码不一致!"));
        this.editPwd.passWordCheck = "";
      } else {
        callback();
      }
    };
    return {
      dialogPwdEdit: false,
      passWord: "password",
      userName: "",
      isshow1: false,
      isshow2: false,
      isshow3: false,
      editPwd: {
        rePassWord: "",
        passWord: "",
        passWordCheck: ""
      },
      // 校验
      rules: {
        rePassWord: [
          {
            required: true,
            validator: validatePassWord,
            trigger: "blur"
          }
        ],
        passWord: [
          {
            required: true,
            validator: validatePassWordCheck,
            trigger: "blur"
          }
        ],
        passWordCheck: [
          {
            required: true,
            validator: validatePassWordCheckOne,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 键盘抬起事件  校验密码强度
    myFunction() {
      if (
        this.editPwd.passWord.length < 14 &&
        this.editPwd.passWord.length >= 12
      ) {
        this.isshow1 = false;
        this.isshow2 = true;
        this.isshow3 = false;
      }
      if (
        this.editPwd.passWord.length >= 8 &&
        this.editPwd.passWord.length <= 10
      ) {
        this.isshow1 = true;
        this.isshow2 = false;
        this.isshow3 = false;
      }
      if (14 <= this.editPwd.passWord.length) {
        this.isshow1 = false;
        this.isshow2 = false;
        this.isshow3 = true;
      }
    },
    // 退出登录接口
    handleCommand(command) {
      if (command == "loginout") {
        let loginOutParms = {};
        this.$axios.post("prod-api/common/logout", loginOutParms).then(res => {
          if (200 == res.data.code) {
            this.$router.push("/");
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
          }
        });
      }
      if (command == "changePwd") {
        this.dialogPwdEdit = true;
      }
    },
    // 取消
    cancelDialog() {
      this.dialogPwdEdit = false;
      this.$refs["editPwd"].resetFields();
    },
    //修改密码
    editPwdSure(editPwd) {
      this.dialogPwdEdit = false;
      this.isshow1 = false;
      this.isshow2 = false;
      this.isshow3 = false;
      this.$axios
        .put(
          "prod-api/backend/home/updatePassword/" +
            this.editPwd.rePassWord +
            "/" +
            this.editPwd.passWord
        )
        .then(res => {
          if (200 == res.data.code) {
            this.editPwd.rePassWord = "";
            this.editPwd.passWord = "";
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.editPwd.rePassWord = "";
            this.editPwd.passWord = "";
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        });
    }
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
    // 获取登陆人新的用户名
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
}
/* 储留箱标题样式 */
.systemTitle {
  float: left;
  line-height: 60px;
  margin-left: 10px;
  color: #0062ba;
  font-weight: bold;
}
/* 右部分样式 */
.headerRight {
  float: right;
  height: 60px;
  margin-right: 50px;
  line-height: 60px;
}
.headerRight .user-avator {
  float: left;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
}
.headerRight img {
  width: 30px;
  height: 30px;
  margin-top: 15px;
}
.headerRight span {
  line-height: 60px;
}
/* 密码强度样式 */
.el-dialog .el-form .three {
  position: absolute;
  top: 3px;
  left: 200px;
  font-size: 12px;
  color: red;
}
.el-dialog .two {
  position: absolute;
  top: 3px;
  left: 200px;
  font-size: 12px;
  color: orange;
}
.el-dialog .one {
  position: absolute;
  top: 3px;
  left: 200px;
  font-size: 12px;
  color: olive;
}
</style>