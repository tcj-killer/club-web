<template>
  <!-- 广告页面 -->
  <div class="advert">
    <div class="formData">
      <!-- 查询 -->
      <el-card class="searchModule">
        <el-form
          :inline="true"
          :model="advert"
          ref="ruleForm"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item prop="adTitle">
            <el-input
              v-model="advert.adTitle"
              clearable
              placeholder="请输入广告标题"
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
        <el-button type="primary" @click="addData()">新增</el-button>
        <el-button type="primary" @click="editData()">编辑</el-button>
        <el-button type="primary" @click="isOpen()">启用</el-button>
        <el-button type="primary" @click="isStop()">停用</el-button>
        <el-button type="primary" @click="delData()">删除</el-button>
      </div>

      <div class="tableData">
        <!-- 页码与表格组件 -->
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
          <!-- 表格信息 -->
          <el-table-column
            type="selection"
            width="45"
            align="center"
          ></el-table-column>
          <el-table-column
            v-for="(item, index) in columnList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sort"
            :fixed="item.fixed"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="imgUrl" label="图片地址">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="70px" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">启用</span>
              <span v-else>停用</span>
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
    <!-- 绑定组件 -->
    <AdvertAdd ref="addData" v-on:search="search"></AdvertAdd>
    <AdvertEdit ref="editData" v-on:search="search"></AdvertEdit>
  </div>
</template>

<script>
// 引用组件

import AdvertAdd from "@/pages/advertManages/AdvertAdd";
import AdvertEdit from "@/pages/advertManages/AdvertEdit";
export default {
  name: "AdvertManages",
  components: {
    AdvertAdd,
    AdvertEdit,
  },
  data() {
    //查询框校验方法
    var validateUser = (rule, value, callback) => {
      const ts = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      if (!value) {
        return callback(new Error("请输入广告标题/内容/编号"));
      }
      setTimeout(() => {
        if (ts.test(value) || regCn.test(value)) {
          return callback(new Error("不能含有特殊字符"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      advert: {
        adTitle: "",
      },
      page:{
        pageSize: 1,
        total:0,
        pageNum:10
      },
      load: false,
      multipleSelection: [],
      // 校验
      rules: {
        adTitle: [
          {
            required: true,
            validator: validateUser,
            trigger: "blur",
          },
        ],
      },
      columnList: [
        {
          prop: "advert_id",
          label: "编号",
          width: 100,
        },
        { prop: "title", label: "广告标题", width: 200 },
        { prop: "come", label: "来源", width: 200 },
        { prop: "views", label: "浏览量", width: 100 },
        { prop: "content", label: "广告内容", width: 500 },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
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
        url: this.$http.adornUrl("/advert/advertList"),
        method: "get",
        params: this.$http.adornParams({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          searchValue: this.advert.adTitle,
        }),
      })
        .then(({ data }) => {
          if (0 == data.code) {
            this.tableData = data.data;
            this.page.total = data.total;
            this.tableData.forEach((el) => {
              el.imgUrl = "http://localhost:8081/advert/" + el.imgUrl;
            });
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
    //选中事件
    handleSelectionChange(row) {
      this.multipleSelection = row;
    },
    //新增
    addData() {
      this.$refs.addData.openDialog(true);
    },
    //修改
    editData() {
      if (1 == this.multipleSelection.length) {
        this.$refs.editData.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection[0]))
        );
      } else {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "error",
        });
      }
    },
    //启用
    isOpen() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否启用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let params = {
            ids: [],
            operate: "enable",
          };

          for (var i = 0; i < this.multipleSelection.length; i++) {
            console.log(this.multipleSelection[i]);
            params.ids.push(this.multipleSelection[i].advert_id);
          }
          params.ids = params.ids.join(",");

          this.$http({
            url: this.$http.adornUrl("/advert/advertEdit"),
            method: "post",
            data: this.$http.adornData({
              operate: params.operate,
              ids: params.ids,
            }),
          })
            .then(({ data }) => {
              if (0 == data.code) {
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success",
                });
                this.getData();
              } else {
                this.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },
    //停用
    isStop() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否禁用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              ids: [],
              operate: "disable",
            };

            for (var i = 0; i < this.multipleSelection.length; i++) {
              console.log(this.multipleSelection[i]);
              params.ids.push(this.multipleSelection[i].advert_id);
            }
            params.ids = params.ids.join(",");
            this.$http({
              url: this.$http.adornUrl("/advert/advertEdit"),
              method: "post",
              data: this.$http.adornData({
                operate: params.operate,
                ids: params.ids,
              }),
            })
              .then(({ data }) => {
                if (0 == data.code) {
                  this.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message({
                    showClose: true,
                    message: "操作失败",
                    type: "error",
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
              message: "已取消禁用",
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
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
          }).then(() => {
            let params = {
              ids: [],
              operate: "delete",
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.ids.push(this.multipleSelection[i].advert_id);
            }
            params.ids = params.ids.join(",");
            this.$http({
              url: this.$http.adornUrl("/advert/advertEdit"),
              method: "post",
              data: this.$http.adornData({
                operate: params.operate,
                ids: params.ids,
              }),
            })
              .then(({ data }) => {
                if (0 == data.code) {
                  this.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message({
                    showClose: true,
                    message: "操作失败",
                    type: "error",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
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
.advert {
  height: 91%;
}
</style>
