<!--<template>-->
<!--  &lt;!&ndash; 意见管理界面 &ndash;&gt;-->
<!--  <div class="opinion">-->
<!--    <div class="formData">-->
<!--      &lt;!&ndash; 查询 &ndash;&gt;-->
<!--      <el-card class="searchModule">-->
<!--        <el-form :inline="true" :model="opinion" ref="ruleForm" label-width="100px" :rules="rules">-->
<!--          <el-form-item prop="opinions">-->
<!--            <el-input v-model="opinion.opinions" clearable placeholder="请输入意见标题"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="search()">查询</el-button>-->
<!--            <el-button type="primary" @click="reset('ruleForm')">重置</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-card>-->
<!--    </div>-->
<!--    &lt;!&ndash; 意见查询表格 &ndash;&gt;-->
<!--    <div class="contentB">-->
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
<!--          &lt;!&ndash; 表格数据 &ndash;&gt;-->
<!--          <el-table-column type="selection" width="45" align="center"></el-table-column>-->
<!--          <el-table-column-->
<!--            v-for="(item,index) in columnList"-->
<!--            :key="index"-->
<!--            :prop="item.prop"-->
<!--            :label="item.label"-->
<!--            :width="item.width"-->
<!--            :sortable="item.sort"-->
<!--            :fixed="item.fixed"-->
<!--            align="center"-->
<!--            show-overflow-tooltip-->
<!--          ></el-table-column>-->
<!--        </SiruiTable>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// 引入组件-->

<!--export default {-->
<!--  name: "OpinionManages",-->
<!--  data() {-->
<!--    // 查询校验-->
<!--    var validateUser = (rule, value, callback) => {-->
<!--      const ts = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im;-->
<!--      const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;-->
<!--      if (!value) {-->
<!--        return callback(new Error("请输入意见标题/内容"));-->
<!--      }-->
<!--      setTimeout(() => {-->
<!--        if (ts.test(value) || regCn.test(value)) {-->
<!--          return callback(new Error("不能含有特殊字符"));-->
<!--        } else {-->
<!--          callback();-->
<!--        }-->
<!--      }, 100);-->
<!--    };-->
<!--    return {-->
<!--      opinion: {-->
<!--        opinions: ""-->
<!--      },-->
<!--      page: {-->
<!--        pages: 0,-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        total: 0-->
<!--      },-->
<!--      load: false,-->
<!--      multipleSelection: [],-->
<!--      // 校验-->
<!--      rules: {-->
<!--        opinions: [-->
<!--          {-->
<!--            required: true,-->
<!--            validator: validateUser,-->
<!--            trigger: "blur"-->
<!--          }-->
<!--        ]-->
<!--      },-->
<!--      // 表格头部信息-->
<!--      columnList: [-->
<!--        {-->
<!--          prop: "id",-->
<!--          label: "编号",-->
<!--          width: 200-->
<!--        },-->
<!--        { prop: "createBy", label: "提交人" },-->
<!--        { prop: "title", label: "意见标题" },-->
<!--        { prop: "content", label: "意见内容" },-->
<!--        { prop: "createTime", label: "提交时间" }-->
<!--      ],-->
<!--      tableData: []-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getData();-->
<!--  },-->
<!--  methods: {-->
<!--    //查询-->
<!--    search() {-->
<!--      this.getData();-->
<!--    },-->
<!--    //查询列表数据-->
<!--    getData() {-->
<!--      this.$axios-->
<!--        .get(-->
<!--          "prod-api/backend/advice/list?" +-->
<!--            "pageNum=" +-->
<!--            this.page.pageNum +-->
<!--            "&pageSize=" +-->
<!--            this.page.pageSize +-->
<!--            "&searchValue=" +-->
<!--            this.opinion.opinions-->
<!--        )-->
<!--        .then(res => {-->
<!--          if (200 == res.data.code) {-->
<!--            this.tableData = res.data.rows;-->
<!--            this.page.total = res.data.total;-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "查询成功",-->
<!--              type: "success"-->
<!--            });-->
<!--          } else {-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: "操作失败",-->
<!--              type: "error"-->
<!--            });-->
<!--          }-->
<!--        });-->
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
<!--    }-->
<!--  }-->
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
<!--.opinion {-->
<!--  height: 91%;-->
<!--}-->
<!--</style>-->
