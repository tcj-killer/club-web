<template>
  <!-- 用户信息页面 -->
  <div class="user">
    <div class="formData">
      <!-- 模糊查询 -->
      <el-card class="searchModule">
        <el-form
          :inline="true"
          :model="user"
          ref="ruleForm"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item label prop="queryValue">
            <el-input
              v-model="user.queryValue"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="primary" @click="reset('ruleForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 按钮 -->
    <div class="contentB">
      <div class="clickBtn">
        <el-button type="primary" @click="isOpen()">启用</el-button>
        <el-button type="primary" @click="isStop()">停用</el-button>
        <el-button type="primary" @click="delData()">删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#409EFF',color:'#ffffff'}"
        border
        height="55vh"
        style="width: 98%;margin: 0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="openId"
          label="openId"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="微信名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          align="center"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.gender==='1'">男</span>
            <span v-show="scope.row.gender==='0'">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="头像"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.status===0">启用</span>
            <span v-show="scope.row.status===1">停用</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="page.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        style="float: right;margin-right: 5vw;margin-top: 1vh"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引用组件

export default {
  name: "UserManages",
  data() {
    return {
      user: {
        queryValue: "",
      },
      page:{
        pageSize: 1,
        total:0,
        pageNum:10
      },
      // 校验
      rules: {
        queryValue: [
          {
            required: true,
            message:'请输入微信名',
            trigger: "blur",
          },
        ],
      },
      multipleSelection: [],
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //选泽表格
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    //每页条数
    handleSizeChange(val) {
      this.page.pageNum=val
      this.getData()
    },
    //当前页
    handleCurrentChange(val) {
      this.page.pageSize=val
      this.getData()
    },
    //查询
    search() {
      this.getData();
    },
    //查询列表数据
    getData() {
      this.$http({
        url: this.$http.adornUrl("/custom/customList"),
        method: "get",
        params: this.$http.adornParams({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          searchValue: this.user.queryValue,
        }),
      })
        .then(({ data }) => {
          if (0 == data.code) {
            this.tableData = data.data;
            this.page.total=data.total
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //重置
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    //启用
    isOpen() {
      if (this.multipleSelection.length >= 1) {
        if (0 != this.multipleSelection.length) {
          this.$confirm("是否启用", "启用", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
                let params = {
                  openIds: [],
                  operate:'enable'
                };
                this.multipleSelection.forEach(el=>{
                  params.openIds.push(el.openId)
                })
                params.openIds = params.openIds.join(",");
                this.$http({
                  url: this.$http.adornUrl("/custom/customChange"),
                  method: "post",
                  data: this.$http.adornData({
                    operate: params.operate,
                    ids:params.openIds
                  }),
                })
                  .then(({ data }) => {
                    if (0 == data.code) {
                      this.getData()
                      this.$message({
                        type: "success",
                        message: "操作成功",
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });

            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消启用",
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "请选择数据进行操作",
            type: "error",
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行操作",
          type: "error",
        });
      }
    },
    //停用
    isStop() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length >= 1) {
        if (0 != this.multipleSelection.length) {
          this.$confirm("是否停用", "停用", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let params = {
                openIds: [],
                operate:'disable'
              };
              this.multipleSelection.forEach(el=>{
                params.openIds.push(el.openId)
              })
              params.openIds = params.openIds.join(",");
              this.$http({
                url: this.$http.adornUrl("/custom/customChange"),
                method: "post",
                data: this.$http.adornData({
                  operate: params.operate,
                  ids:params.openIds
                }),
              })
                .then(({ data }) => {
                  if (0 == data.code) {
                    this.getData()
                    this.$message({
                      type: "success",
                      message: "操作成功",
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消停用",
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "请选择数据进行操作",
            type: "error",
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行操作",
          type: "error",
        });
      }
    },
    //删除
    delData() {
      if (this.multipleSelection.length >= 1) {
        if (0 != this.multipleSelection.length) {
          this.$confirm("是否删除该数据", "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let params = {
                openIds: [],
                operate:'delete'
              };
              this.multipleSelection.forEach(el=>{
                params.openIds.push(el.openId)
              })
              params.openIds = params.openIds.join(",");
              this.$http({
                url: this.$http.adornUrl("/custom/customChange"),
                method: "post",
                data: this.$http.adornData({
                  operate: params.operate,
                  ids:params.openIds
                }),
              })
                .then(({ data }) => {
                  if (0 == data.code) {
                    this.getData()
                    this.$message({
                      type: "success",
                      message: "操作成功",
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "请选择数据进行操作",
            type: "error",
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行操作",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
.contentB {
  width: 100%;
  margin-top: 10px;
  display: block;
  background-color: #fff;
  height: calc(100vh - 200px);
}
.contentB .clickBtn {
  padding: 10px;
}
.user {
  height: 91%;
}
.contentB img {
  width: 3vw;
  margin: 0;
  padding: 0;
}
</style>
