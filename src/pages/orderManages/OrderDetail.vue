<!--<template>-->
<!--  &lt;!&ndash; 订单详情页面 &ndash;&gt;-->
<!--  <div class="orderDialog">-->
<!--    &lt;!&ndash; Form &ndash;&gt;-->
<!--    <el-dialog width="800px" title="详情" :visible.sync="dialogDetail">-->
<!--      <el-form :model="detailInfo" ref="detailInfo" :inline="true" label-position="right">-->
<!--        &lt;!&ndash; 空箱 &ndash;&gt;-->
<!--        <div v-if="emptyIsshow">-->
<!--          <el-form-item label="空箱上门时间" prop="emptyBoxCallTime" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallTime" clearable></el-input>-->
<!--          </el-form-item>-->

<!--          <el-form-item label="空箱上门姓名" prop="emptyBoxCallName" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallName" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="空箱上门电话" prop="emptyBoxCallPhone" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallPhone" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="空箱上门地址" prop="emptyBoxCallAddress" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallAddress" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="空箱上门时间" prop="emptyBoxCallTime" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallTime" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="空箱上门时段" prop="emptyBoxCallInterval" label-width="110px">-->
<!--            <el-input v-model="detailInfo.emptyBoxCallInterval" clearable></el-input>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--        &lt;!&ndash; 重箱&ndash;&gt;-->
<!--        <div v-if="heavyIsshow">-->
<!--          <el-form-item label="重箱上门时间" prop="heavyBoxCallTime" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallTime" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱提取姓名" prop="heavyBoxCallName" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallName" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱提取电话" prop="heavyBoxCallPhone" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallPhone" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱提取地址" prop="heavyBoxCallAddress" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallAddress" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱提取时间" prop="heavyBoxCallTime" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallTime" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="重箱提取时段" prop="heavyBoxCallInterval" label-width="110px">-->
<!--            <el-input v-model="detailInfo.heavyBoxCallInterval" clearable></el-input>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--        &lt;!&ndash; 公共显示部分 &ndash;&gt;-->
<!--        <el-form-item label="客户名称" prop="nickName" label-width="110px">-->
<!--          <el-input v-model="detailInfo.nickName" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="箱子编号" prop="boxCode" label-width="110px">-->
<!--          <el-input v-model="detailInfo.boxCode" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="箱子规格" prop="boxStandard" label-width="110px">-->
<!--          <el-input v-model="detailInfo.boxStandard" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="箱子积分单价" prop="boxUnitPrice" label-width="110px">-->
<!--          <el-input v-model="detailInfo.boxUnitPrice" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="租凭时长" prop="leaseDuration" label-width="110px">-->
<!--          <el-input v-model="detailInfo.leaseDuration" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="实付积分" prop="totalPrice" label-width="110px">-->
<!--          <el-input v-model="detailInfo.totalPrice" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="订单状态" prop="status" label-width="110px">-->
<!--          <el-input v-model="detailInfo.status" clearable></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="cancelDialog()">取 消</el-button>-->
<!--        <el-button type="primary" @click="addSure()">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      id: "",-->
<!--      dialogDetail: false,-->
<!--      emptyIsshow: false,-->
<!--      heavyIsshow: false,-->
<!--      list: [],-->
<!--      detailInfo: {-->
<!--        emptyBoxCallTime: "",-->
<!--        heavyBoxCallTime: "",-->
<!--        emptyBoxCallName: "",-->
<!--        emptyBoxCallPhone: "",-->
<!--        emptyBoxCallAddress: "",-->
<!--        emptyBoxCallTime: "",-->
<!--        emptyBoxCallInterval: "",-->
<!--        heavyBoxCallName: "",-->
<!--        heavyBoxCallPhone: "",-->
<!--        heavyBoxCallAddress: "",-->
<!--        heavyBoxCallTime: "",-->
<!--        heavyBoxCallInterval: "",-->
<!--        nickName: "",-->
<!--        boxCode: "",-->
<!--        boxStandard: "",-->
<!--        boxUnitPrice: "",-->
<!--        leaseDuration: "",-->
<!--        totalPrice: "",-->
<!--        status: ""-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // 详情弹窗页面开关-->
<!--    openDialog(flag, val) {-->
<!--      this.dialogDetail = flag;-->
<!--      if (-->
<!--        val.status == "代发空箱" ||-->
<!--        val.status == "已发空箱" ||-->
<!--        val.status == "送达空箱" ||-->
<!--        val.status == "代收空箱" ||-->
<!--        val.status == "以存储"-->
<!--      ) {-->
<!--        this.emptyIsshow = "true";-->
<!--      } else {-->
<!--        this.heavyIsshow = "true";-->
<!--      }-->

<!--      this.id = localStorage.getItem("ids");-->
<!--      console.log(this.id);-->
<!--      this.getData();-->
<!--      this.$nextTick(() => {});-->
<!--    },-->
<!--    // 获取数据-->
<!--    getData() {-->
<!--      this.$axios.get("prod-api/backend/order/info/" + this.id).then(res => {-->
<!--        if (200 == res.data.code) {-->
<!--          this.list = res.data.data;-->
<!--          console.log(this.list);-->
<!--          this.detailInfo.emptyBoxCallTime = this.list.emptyBoxCallTime;-->
<!--          this.detailInfo.heavyBoxCallTime = this.list.heavyBoxCallTime;-->
<!--          this.detailInfo.emptyBoxCallName = this.list.emptyBoxCallName;-->
<!--          this.detailInfo.emptyBoxCallPhone = this.list.emptyBoxCallPhone;-->
<!--          this.detailInfo.emptyBoxCallAddress = this.list.emptyBoxCallAddress;-->
<!--          this.detailInfo.emptyBoxCallTime = this.list.emptyBoxCallTime;-->
<!--          this.detailInfo.emptyBoxCallInterval = this.list.emptyBoxCallInterval;-->
<!--          this.detailInfo.heavyBoxCallName = this.list.heavyBoxCallName;-->
<!--          this.detailInfo.heavyBoxCallPhone = this.list.heavyBoxCallPhone;-->
<!--          this.detailInfo.heavyBoxCallAddress = this.list.heavyBoxCallAddress;-->
<!--          this.detailInfo.heavyBoxCallTime = this.list.heavyBoxCallTime;-->
<!--          this.detailInfo.heavyBoxCallInterval = this.list.heavyBoxCallInterval;-->
<!--          this.detailInfo.nickName = this.list.nickName;-->
<!--          this.detailInfo.boxCode = this.list.boxCode;-->
<!--          this.detailInfo.boxStandard = this.list.boxStandard;-->
<!--          this.detailInfo.boxUnitPrice = this.list.boxUnitPrice;-->
<!--          this.detailInfo.leaseDuration = this.list.leaseDuration;-->
<!--          this.detailInfo.totalPrice = this.list.totalPrice;-->
<!--          this.detailInfo.status = this.list.status;-->
<!--          this.$message({-->
<!--            type: "success",-->
<!--            message: "操作成功"-->
<!--          });-->
<!--        } else {-->
<!--          this.$message({-->
<!--            type: "error",-->
<!--            message: "操作失败"-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    // 取消-->
<!--    cancelDialog() {-->
<!--      this.dialogDetail = false;-->
<!--      //刷新-->
<!--      location.reload();-->
<!--      this.$router.go(0);-->
<!--    },-->
<!--    // 确定-->
<!--    addSure() {-->
<!--      this.dialogDetail = false;-->
<!--      location.reload();-->
<!--      this.$router.go(0);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--</style>-->
