<template>
  <!-- 用户信息页面 -->
  <div class="order">
    <el-button type="primary" @click="deleteAll">批量删除</el-button>
    <el-table
      :data="orderList.slice((currentPage-1)*5,currentPage*5)"
      :header-cell-style="{'text-align':'center'}"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="订单编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        label="购买时间"
        width="245">
      </el-table-column>
      <el-table-column
        prop="usercount"
        label="购买数量"
        width="140">
      </el-table-column>
      <el-table-column
        prop="price"
        label="订单总价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="350">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发货地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="imgurl"
        label="商品图片"
        width="180">
        <template slot-scope="scope">
          <img  :src="scope.row.imgurl" alt="" style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="deleteRow(scope.$index, orderList)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="order-bottom">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes=[5]
      :page-size=1
      layout="sizes,prev, pager, next, jumper"
      :total="orderList.length">
    </el-pagination>
    </div>
  </div>
</template>

<script>
// 引用组件
import echarts from 'echarts'
export default {
  name: "buy",
  data() {
    return {
      orderList:[],
      currentPage:1,
    };
  },
  mounted() {
    //全局监听，页面刷新的时候将store里state的值存到sessionStorage中，然后从sessionStorage中获取，再赋值给store。
// 然后再把session里面存的删除即可，相当于中间件的作用。
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.removeItem("store")
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    })
    this.getorder();
  },
  methods: {
    deleteAll(){
      var arr = [];
      this.multipleSelection.forEach(item=>{
        arr.push(item.id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/order/deleteAll'),
        method:'post',
        data:{
          arr:arr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'批量删除成功'
      })
    },
    getorder(){
      this.$http({
        url:this.$http.adornUrl('/api/order/select'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id
        }
      }).then(({data})=>{
            console.log(data.orderdata.length)
         for(var i=0;i<data.orderdata.length;i++){
           let arr = {};
           arr.address = data.goodsinfo[i][0].goods_address
           arr.price = data.orderdata[i].price
           arr.name = data.goodsinfo[i][0].goods_name
           arr.usercount = data.orderdata[i].count
           arr.time = data.orderdata[i].time
           arr.imgurl = data.goodsinfo[i][0].imgurl
           arr.id = data.orderdata[i].id
           this.orderList.push(arr)
           console.log(this.orderList)
         }

      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //获取选中的每行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    //删除历史订单
    deleteRow(index,rows){
      let val = rows.slice(index,index+1);
      this.$http({
        url:this.$http.adornUrl('/api/order/delete'),
        method:'post',
        data:{
          id:val[0].id
        }
      }).then(({data})=>{})
      rows.splice(index, 1);
      this.$message({
        type:'success',
        message:'订单删除成功'
      })
    }
  }

};
</script>
<style lang="scss" scoped>
body{
  box-sizing: border-box;
}

/deep/.el-table td, .el-table th {
  text-align: center;
}

.order{
  width:100%;
  .order-bottom{
    margin-left:30%;
    margin-top:2%;
  }
}


</style>
