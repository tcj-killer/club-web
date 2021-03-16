<!--<template>-->
<!--  &lt;!&ndash; 订单页面 &ndash;&gt;-->
<!--  <div class="order">-->
<!--    <div class="formData">-->
<!--      &lt;!&ndash; 查询页面 &ndash;&gt;-->
<!--      <el-card class="searchModule">-->
<!--        <el-form-->
<!--          :inline="true"-->
<!--          :model="order"-->
<!--          ref="ruleForm"-->
<!--          label-width="100px"-->
<!--        >-->
<!--          <el-form-item label="客户名称" prop="nickName">-->
<!--            <el-input-->
<!--              v-model="order.nickName"-->
<!--              clearable-->
<!--              placeholder="请输入客户名称"-->
<!--            ></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash; 订单状态下拉框 &ndash;&gt;-->
<!--          <el-form-item label="订单状态" prop="status">-->
<!--            <el-select v-model="order.status" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="(item, index) in option"-->
<!--                :key="index"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <br />-->
<!--          &lt;!&ndash; 空箱 重箱下单时间模糊查询 &ndash;&gt;-->
<!--          <el-form-item label="空箱下单时间" prop="emptyBoxOrderTime">-->
<!--            <el-date-picker-->
<!--              v-model="order.emptyBoxOrderTime"-->
<!--              type="daterange"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              :default-time="['00:00:00', '23:59:59']"-->
<!--            ></el-date-picker>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱下单时间" prop="heavyBoxOrderTime">-->
<!--            <el-date-picker-->
<!--              v-model="order.heavyBoxOrderTime"-->
<!--              type="daterange"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              :default-time="['00:00:00', '23:59:59']"-->
<!--            ></el-date-picker>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="search()">查询</el-button>-->
<!--            <el-button type="primary" @click="reset('ruleForm')"-->
<!--              >重置</el-button-->
<!--            >-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-card>-->
<!--    </div>-->

<!--    <div class="contentB">-->
<!--      <div class="clickBtn">-->
<!--        <el-button type="primary" @click="detail()">详情</el-button>-->
<!--        <el-button type="primary" @click="delData()">删除</el-button>-->
<!--      </div>-->
<!--      &lt;!&ndash; 表格 &ndash;&gt;-->
<!--      <div class="tableData">-->
<!--        <SiruiTable-->
<!--          @handleSelectionChange="handleSelectionChange"-->
<!--          @handleSizeChange="handleSizeChange"-->
<!--          @handleCurrentChange="handleCurrentChange"-->
<!--          class="operateTable"-->
<!--          :page="page"-->
<!--          :loading="load"-->
<!--          :data="tableData"-->
<!--          height="100"-->
<!--        >-->
<!--          &lt;!&ndash; 表格信息 &ndash;&gt;-->
<!--          <el-table-column-->
<!--            type="selection"-->
<!--            width="40"-->
<!--            align="center"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="orderName"-->
<!--            label="订单名称"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="orderCode"-->
<!--            label="订单编号"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="status"-->
<!--            label="订单状态"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="nickName"-->
<!--            label="客户名称"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="boxId"-->
<!--            label="箱子id"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="boxCode"-->
<!--            label="箱子编号"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="boxStandard"-->
<!--            label="箱子规格"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="leaseDuration"-->
<!--            label="租聘时长"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="totalPrice"-->
<!--            label="所需积分"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--          &lt;!&ndash; 判断表格头部信息显示 &ndash;&gt;-->
<!--          <el-table-column-->
<!--            prop="emptyBoxCallTime"-->
<!--            label="空箱上门下单时间"-->
<!--            v-if="isShow"-->
<!--            :show-overflow-tooltip="true"-->
<!--          ></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="heavyBoxCallTime"-->
<!--            label="重箱提取下单时间"-->
<!--            v-if="isShow2"-->
<!--            :show-overflow-tooltip="true"-->
<!--          ></el-table-column>-->
<!--          &lt;!&ndash; 判断显示按钮 &ndash;&gt;-->
<!--          <el-table-column prop="btn" label="操作" show-overflow-tooltip>-->
<!--            <template slot-scope="scope">-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                v-if="scope.row.status === '代发空箱'"-->
<!--                style="color: orange"-->
<!--                @click="operation(scope.row)"-->
<!--                >发送空箱</el-button-->
<!--              >-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                v-else-if="scope.row.status === '代收重箱'"-->
<!--                style="color: blue"-->
<!--                @click="operation(scope.row)"-->
<!--                >收取重箱</el-button-->
<!--              >-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                v-else-if="scope.row.status === '代发重箱'"-->
<!--                style="color: green"-->
<!--                @click="operation(scope.row)"-->
<!--                >发送重箱</el-button-->
<!--              >-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                v-else-if="scope.row.status === '代收空箱'"-->
<!--                style="color: pink"-->
<!--                @click="operation(scope.row)"-->
<!--                >收取空箱</el-button-->
<!--              >-->
<!--              <el-button size="mini" v-else style="color: orange; display: none"-->
<!--                >&#45;&#45;</el-button-->
<!--              >-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </SiruiTable>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash; 组件绑定 &ndash;&gt;-->
<!--    <OrderDetail ref="detail"></OrderDetail>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// 引用表格 页数 详情组件-->

<!--import OrderDetail from "@/pages/orderManages/OrderDetail";-->
<!--export default {-->
<!--  name: "OrderManages",-->
<!--  components: {-->
<!--    OrderDetail,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      order: {-->
<!--        nickName: "",-->
<!--        status: "",-->
<!--        emptyBoxOrderTime: ["", ""],-->
<!--        heavyBoxOrderTime: ["", ""],-->
<!--      },-->
<!--      page: {-->
<!--        pages: 0,-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        total: 0,-->
<!--      },-->
<!--      load: false,-->
<!--      multipleSelection: [],-->
<!--      isShow: false,-->
<!--      isShow2: false,-->
<!--      id: "",-->
<!--      version: "",-->
<!--      operate: "",-->
<!--      orderVO: {},-->
<!--      option: [-->
<!--        {-->
<!--          value: 1,-->
<!--          label: "代发空箱",-->
<!--        },-->
<!--        {-->
<!--          value: 2,-->
<!--          label: "已发空箱",-->
<!--        },-->
<!--        {-->
<!--          value: 3,-->
<!--          label: "送达空箱",-->
<!--        },-->
<!--        {-->
<!--          value: 4,-->
<!--          label: "代收空箱",-->
<!--        },-->
<!--        {-->
<!--          value: 5,-->
<!--          label: "已存储",-->
<!--        },-->
<!--        {-->
<!--          value: 6,-->
<!--          label: "代发重箱",-->
<!--        },-->
<!--        {-->
<!--          value: 7,-->
<!--          label: "已发重箱",-->
<!--        },-->
<!--        {-->
<!--          value: 8,-->
<!--          label: "送达重箱",-->
<!--        },-->
<!--        {-->
<!--          value: 9,-->
<!--          label: "代收空箱",-->
<!--        },-->
<!--        {-->
<!--          value: 10,-->
<!--          label: "已完成",-->
<!--        },-->
<!--      ],-->
<!--      tableData: [],-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getData();-->
<!--  },-->
<!--  methods: {-->
<!--    //查询-->
<!--    search() {-->
<!--      this.getData();-->

<!--      console.log(this.order.emptyBoxOrderTime);-->
<!--    },-->
<!--    //操作-->
<!--    operation(state) {-->
<!--      this.id = state.id;-->
<!--      if (state.status == "代发空箱") {-->
<!--        this.operate = 2;-->
<!--      } else if (state.status == "已发空箱") {-->
<!--        this.operate = 3;-->
<!--      } else if (state.status == "送达空箱") {-->
<!--        this.operate = 4;-->
<!--      } else if (state.status == "代收重箱") {-->
<!--        this.operate = 5;-->
<!--      } else if (state.status == "已存储") {-->
<!--        this.operate = 6;-->
<!--      } else if (state.status == "代发重箱") {-->
<!--        this.operate = 7;-->
<!--      } else if (state.status == "已发重箱") {-->
<!--        this.operate = 8;-->
<!--      } else if (state.status == "送达重箱") {-->
<!--        this.operate = 9;-->
<!--      } else if (state.status == "代收空箱") {-->
<!--        this.operate = 10;-->
<!--      } else if (state.status == "已完成") {-->
<!--        this.operate = 10;-->
<!--      }-->
<!--      let params = {};-->
<!--      console.log(state.id, this.operate, state.version);-->
<!--      this.$axios-->
<!--        .put(-->
<!--          "prod-api/backend/order/operate/" +-->
<!--            state.id +-->
<!--            "/" +-->
<!--            this.operate +-->
<!--            "/" +-->
<!--            state.version,-->
<!--          params-->
<!--        )-->
<!--        .then((res) => {-->
<!--          if (200 == res.data.code) {-->
<!--            this.getData();-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "查询成功",-->
<!--              type: "success",-->
<!--            });-->
<!--          } else {-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "操作失败",-->
<!--              type: "error",-->
<!--            });-->
<!--          }-->
<!--        });-->
<!--    },-->
<!--    //查询列表数据-->
<!--    getData() {-->
<!--      this.$axios-->
<!--        .get(-->
<!--          "prod-api/backend/order/list?" +-->
<!--            "pageNum=" +-->
<!--            this.page.pageNum +-->
<!--            "&pageSize=" +-->
<!--            this.page.pageSize +-->
<!--            "&nickName=" +-->
<!--            this.order.nickName +-->
<!--            "&status=" +-->
<!--            this.order.status +-->
<!--            "&emptyBoxOrderTimeStart=" +-->
<!--            this.order.emptyBoxOrderTime[0] +-->
<!--            "&emptyBoxOrderTimeEnd=" +-->
<!--            this.order.emptyBoxOrderTime[1] +-->
<!--            "&heavyBoxOrderTimeStart=" +-->
<!--            this.order.heavyBoxOrderTime[0] +-->
<!--            "&heavyBoxOrderTimeEnd=" +-->
<!--            this.order.heavyBoxOrderTime[1]-->
<!--        )-->
<!--        .then((res) => {-->
<!--          if (200 == res.data.code) {-->
<!--            this.tableData = res.data.rows;-->
<!--            for (var i = 0; i < res.data.rows.length; i++) {-->
<!--              if (res.data.rows[i].status == "1") {-->
<!--                this.tableData[i].status = "代发空箱";-->
<!--              } else if (res.data.rows[i].status == "2") {-->
<!--                this.tableData[i].status = "已发空箱";-->
<!--              } else if (res.data.rows[i].status == "3") {-->
<!--                this.tableData[i].status = "送达空箱";-->
<!--              } else if (res.data.rows[i].status == "4") {-->
<!--                this.tableData[i].status = "代收重箱";-->
<!--              } else if (res.data.rows[i].status == "5") {-->
<!--                this.tableData[i].status = "已存储";-->
<!--              } else if (res.data.rows[i].status == "6") {-->
<!--                this.tableData[i].status = "代发重箱";-->
<!--              } else if (res.data.rows[i].status == "7") {-->
<!--                this.tableData[i].status = "已发重箱";-->
<!--              } else if (res.data.rows[i].status == "8") {-->
<!--                this.tableData[i].status = "送达重箱";-->
<!--              } else if (res.data.rows[i].status == "9") {-->
<!--                this.tableData[i].status = "代收空箱";-->
<!--              } else if (res.data.rows[i].status == "10") {-->
<!--                this.tableData[i].status = "已完成";-->
<!--              }-->
<!--            }-->
<!--            this.page.total = res.data.total;-->

<!--            for (var i = 0; i < this.tableData.length; i++) {-->
<!--              if (-->
<!--                this.tableData[i].status == "代发空箱" ||-->
<!--                this.tableData[i].status == "已发空箱" ||-->
<!--                this.tableData[i].status == "送达空箱" ||-->
<!--                this.tableData[i].status == "代收重箱"-->
<!--              ) {-->
<!--                this.isShow = true;-->
<!--              } else {-->
<!--                this.isShow2 = true;-->
<!--              }-->
<!--            }-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "查询成功",-->
<!--              type: "success",-->
<!--            });-->
<!--          } else {-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "操作失败",-->
<!--              type: "error",-->
<!--            });-->
<!--          }-->
<!--        });-->
<!--    },-->
<!--    //详情-->
<!--    detail() {-->
<!--      if (1 == this.multipleSelection.length) {-->
<!--        this.$refs.detail.openDialog(-->
<!--          true,-->
<!--          JSON.parse(JSON.stringify(this.multipleSelection[0]))-->
<!--        );-->
<!--        localStorage.setItem("ids", this.multipleSelection[0].id);-->
<!--      } else {-->
<!--        this.$message({-->
<!--          showClose: true,-->
<!--          message: "请选择一条数据",-->
<!--          type: "error",-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    //删除-->
<!--    delData() {-->
<!--      if (this.multipleSelection.length >= 1) {-->
<!--        if (0 != this.multipleSelection.length) {-->
<!--          this.$confirm("是否删除该数据", "删除", {-->
<!--            confirmButtonText: "确定",-->
<!--            cancelButtonText: "取消",-->
<!--            type: "warning",-->
<!--          })-->
<!--            .then(() => {-->
<!--              let params = {-->
<!--                ids: [],-->
<!--              };-->
<!--              for (var i = 0; i < this.multipleSelection.length; i++) {-->
<!--                params.ids.push(this.multipleSelection[i].id);-->
<!--              }-->
<!--              params.ids = params.ids.join(",");-->
<!--              this.$axios-->
<!--                .delete("prod-api/backend/order/delete/" + params.ids)-->
<!--                .then((res) => {-->
<!--                  if (200 == res.data.code) {-->
<!--                    this.getData();-->
<!--                    this.$message({-->
<!--                      type: "success",-->
<!--                      message: "操作成功",-->
<!--                    });-->
<!--                    this.search();-->
<!--                  } else {-->
<!--                    this.$message({-->
<!--                      type: "error",-->
<!--                      message: "操作失败",-->
<!--                    });-->
<!--                  }-->
<!--                });-->
<!--            })-->
<!--            .catch(() => {-->
<!--              this.$message({-->
<!--                type: "info",-->
<!--                message: "已取消删除",-->
<!--              });-->
<!--            });-->
<!--        } else {-->
<!--          this.$message({-->
<!--            showClose: true,-->
<!--            message: "请选择数据进行操作",-->
<!--            type: "error",-->
<!--          });-->
<!--        }-->
<!--      } else {-->
<!--        this.$message({-->
<!--          showClose: true,-->
<!--          message: "请选择数据进行操作",-->
<!--          type: "error",-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    //重置-->
<!--    reset(formName) {-->
<!--      this.$refs[formName].resetFields();-->
<!--    },-->
<!--    //选中事件-->
<!--    handleSelectionChange(row) {-->
<!--      this.multipleSelection = row;-->
<!--    },-->
<!--    //每条页数-->
<!--    handleSizeChange(val) {-->
<!--      this.page.pageSize = val;-->
<!--    },-->
<!--    //第几页-->
<!--    handleCurrentChange(val) {-->
<!--      this.page.pageNum = val;-->
<!--      this.getData();-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--.contentB {-->
<!--  width: 100%;-->
<!--  margin-top: 10px;-->
<!--  display: block;-->
<!--  background-color: #fff;-->
<!--  height: 83%;-->
<!--}-->
<!--.contentB .clickBtn {-->
<!--  padding: 10px;-->
<!--}-->
<!--.order {-->
<!--  height: 81%;-->
<!--}-->
<!--</style>-->
