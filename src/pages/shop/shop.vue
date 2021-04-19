<template>
  <!-- 用户信息页面 -->
  <div class="shop">
    <div class="shop-top">
      <div class="top-left">
        <el-input placeholder="请输入要搜索的内容" v-model="input" clearable size="small"></el-input>
      </div>
      <div class="top-right">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="danger" @click="shoplist">取消</el-button>
      </div>
    </div>
    <div class="shop-center">
    <div class="shop-content">
      <div class="shop-content-list" v-for="(item,index) in list.slice((currentPage-1)*4,currentPage*4)" :key="index">
        <div class="list-top">
          <img :src="item.src" alt="">
          <div class="list-top-right">
            <div class="count">月销量:{{item.count}}</div>
            <div class="price">价格:{{item.price}}</div>
          </div>
        </div>
        <div class="list-bottom">
          <div style="width:80%;text-align:center;height:40px;line-height:40px;padding:0% 10% 0 10%;text-overflow:ellipsis;overflow: hidden">{{item.name}}</div>
          <div style="position:absolute;bottom:0;right:20%;">
            <el-button type="warning" @click="collect(item.id)">收藏</el-button>
            <el-button type="danger" @click="toBug(item.id)">购买</el-button>
          </div>
        </div>
      </div>
    </div>
      <div class="goodsEcharts" id="goodsEcharts"></div>
    </div>
    <div class="shop-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes=[4]
        :page-size=1
        layout="sizes,prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引用组件
import echarts from 'echarts'
export default {
  name: "index",
  data() {
    return {
      src:[],
      input: '',
      list:[],
      currentPage:1,
      checktime:''
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
    this.shoplist();
    //this.initPie();

  },
  methods: {
    shoplist(){
      this.$http({
        url: this.$http.adornUrl('/api/shop'),
        method: 'get',
        //params: this.$http.adornParams(param)
      }).then(({data}) => {
        let piedata = [];
        data.data.forEach(item=>{
          let obj = {};

          let arr = {};
          obj.src = item.imgurl;
          obj.id = item.goods_id;
          obj.name = item.goods_name;
          obj.price = item.goods_price;
          obj.address = item.goods_address;
          obj.count = item.goods_count;
          obj.time = item.goods_time;
          arr.name = item.goods_name;
          arr.value = item.goods_count;
          piedata.push(arr)
          this.list.push(obj)
        })
        this.initPie(piedata)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //搜索
    search(){
      this.$http({
        url: this.$http.adornUrl('/api/shop/search'),
        method: 'post',
        data:{
          content:this.input
        }
      }).then(({data}) => {
        this.list = [];
            //查询成功
            for(var i=0;i<data.data.length;i++){
              let src = data.data[i].imgurl;
              let id = i+1;
              let name = data.data[i].goods_name;
              let price = data.data[i].goods_price;
              let address = data.data[i].goods_address;
              let count = data.data[i].goods_count;
              let time = data.data[i].goods_time;
              let obj = {
                src:src,
                id:id,
                name:name,
                price:price,
                address:address,
                count:count,
                time:time
              }
              this.list.push(obj)
            }
          if(data.status == 0){
            //查询成功
            this.$message({
              type:'success',
              message:'查询成功'
            })
          }else{
            //查询失败
            this.$message({
              type:'error',
              message:'查询失败'
            })
          }

      })
    },
    //收藏
    collect(id){
      this.$http({
        url:this.$http.adornUrl('/api/shop/collect'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          goodsid:id
        }
      }).then(({data})=>{
        if(data.data == 0){
        //  未收藏过
          this.$message({
            type:'success',
            message:'收藏成功'
          })
        }else{
          this.$message({
            type:'error',
            message:'已收藏此商品，请勿多次点击'
          })
        }
      })
    },
    //购买
    toBug(id){
      this.$router.push({
        path:'/buy',
        query: {
          id: id
        }
      })
    },
    //饼图
    initPie(val){
      let goodsEcharts = this.$echarts.init(document.getElementById('goodsEcharts'))

      let index = 0;
      var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'];

      function fun() {
        var length = val.length;
        var timer = setInterval(function() {
          goodsEcharts.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: index
          });
          // 显示提示框
          goodsEcharts.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          // 取消高亮指定的数据图形
          goodsEcharts.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index == 0 ? length-1 : index - 1
          });
          goodsEcharts.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if (index > length-1) {
            index = 0;
          }
        }, 2000)
      }
      fun()
      var option = {
        title: {
          text: '商品月累计销量统计(实时)',
          x: '23%',
          y: '5%',
          textStyle: {
            fontSize: 20,
          }
        },
        legend: {
          type:'plain',
          show:true,
          x:'left',
          y:'bottom',
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          center: ['50%', '40%'],
          radius: ['30%', '45%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 15,
          emphasis:{
            itemStyle:{
              borderColor: '#f3f3f3',
              borderWidth: 5
            }
          },
          label: {
            show: true,
            position: 'outside',
            //formatter: '{a|{b}：{d}%}\n{hr|}',
            formatter:function(params){
            },
            rich: {
              hr: {
                backgroundColor: 't',
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
              },
              a: {
                padding: [-30, 15, -20, 15]
              }
            }
          },
          legend:{
            show:true
          },
          labelLine: {
            normal: {
              length: 10,
              length2: 20,
              lineStyle: {
                width: 1
              }
            }
          },
          data:val,
        }]
      };
      goodsEcharts.clear();//清空echarts
      goodsEcharts.setOption(option, true);
      window.addEventListener('resize', () => {
        goodsEcharts.resize()
      })
    }
  },
};
</script>
<style lang="scss" scoped>
body{
  box-sizing: border-box;
}

.shop{
  width:100%;
  position: relative;
  .shop-top{
    width:100%;
    height:20%;
    display: flex;
    justify-content: start;
    .top-left{
      width:40%;
    }
    .top-right{
      width:50%;
      margin-left: 2%;
    }
  }
  .shop-center{
    width:100%;
    display: flex;
    justify-content: flex-start;
    .shop-content{
    width:48%;
    display: flex;
    flex-wrap: wrap;
    .shop-content-list{
      width:45%;
      height:20%;
      margin:1% 2%;
      border:1px solid #abc;
      height:270px;
      .list-top{
        width:100%;
        height:70%;
        display: flex;
        justify-content: space-between;
        img{
          width:60%;
        }
        .list-top-right{
          width:35%;
          .count{
            padding-top:30%;
            font-size:14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909090;
          }
          .price{
            padding-top:30%;
            font-size: 18px;
          }
        }
      }
      .list-bottom{
        width:100%;
        height:30%;
        position: relative;
      }
    }
  }
    .goodsEcharts{
      position: absolute;
      left:50%;
      width:42%;
      height:600px;
    }
  }
  .shop-bottom{
    width:45%;
    position:absolute;
    left:5%;
  }
}
/deep/.el-table td, .el-table th {
  text-align: center;
}


</style>
