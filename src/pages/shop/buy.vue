<template>
  <!-- 用户信息页面 -->
  <div class="buy">
      <div class="buy-top"><img src="../../assets/img/title.png" alt=""></div>
      <div class="buy-content">
        <div class="buy-content-left">
          <img :src=goodsinfo.imgurl alt="">
        </div>
        <div class="buy-content-right">
          <div class="title"><span>{{goodsinfo.goods_name}}</span></div>
          <div class="address"><span>发货地址：{{goodsinfo.goods_address}}</span></div>
          <div class="price"><span>商品价格：{{goodsinfo.goods_price}}</span></div>
          <div class="time"><span>上架时间：{{goodsinfo.goods_time}}</span></div>
          <div class="count"><span>月累计销量：{{goodsinfo.goods_count}}</span></div>
          <div class="point">
          <el-input-number v-model="num" @change="handleChange" :min="0" :max="99" label="描述文字"></el-input-number>
          </div>
        </div>
      </div>
    <div class="buy-bottom">
      <div>商品总价：</div>
      <el-input v-model="input"></el-input>
      <el-button type="danger" @click="buy">购买</el-button>
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
      goodsinfo:{},
      num:0,
      input:0,
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
    this.Getgoods();
    this.changeDate();
  },
  methods: {
    handleChange(value) {
      this.num = value;
      this.input = parseInt(this.num*this.goodsinfo.goods_price)
    },
    Getgoods(){
      this.$http({
        url:this.$http.adornUrl('/api/shop/buy'),
        method:'post',
        data:{
          id:this.$route.query.id
        }
      }).then(({data})=>{
        this.goodsinfo = data.data[0]
        console.log(this.goodsinfo)
      })
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
    buy(){
      this.$http({
        url:this.$http.adornUrl('/api/goods/buy'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          num:this.num,//数量
          price:this.input,
          goodsid:this.$route.query.id,
          time:this.checktime
        }
      }).then(({data})=>{
        if(data.data == 0){
          this.$message({
            type:'success',
            message:'购买成功'
          })
        }else{
          this.$message({
            type:'error',
            message:'余额不足'
          })
        }
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
.buy{
  width:100%;
  height:100%;
  position: relative;
  .buy-top{
    width:100%;
    height:10%;
    img{
      width:60%;
      height:100%;
    }
  }
  .buy-content{
    width:100%;
    height:70%;
    display: flex;
    justify-content: flex-start;
    .buy-content-left{
      width:30%;
      height:100%;
      img{
        width:100%;
      }
    }
    .buy-content-right{
      width:50%;
      height:100%;
      position: relative;
      .title{
        position: absolute;
        left:10%;
        width:100%;
        height:20%;
        span{
          font-size: 30px;
          font-family: PingFang SC;
        }
      }
      .address{
        width:50%;
        height:7%;
        position:absolute;
        left:10%;
        top:15%;
        background-color: #abc;
        text-align: center;
        span{
          padding-top:50%;
          font-size: 20px;
        }
      }
      .price{
        position: absolute;
        left:18%;
        top:30%;
        span{
          font-size: 18px;
        }
      }
      .time{
        width:100%;
        height:20%;
        position:absolute;
        left:18%;
        top:42%;
        span{
          color:#abc;
        }
      }
      .count{
        width:100%;
        height:20%;
        position:absolute;
        left:18%;
        top:53%;
        span{
          color:#abc;
        }
      }
      .point{
        position: absolute;
        left:15%;
        top:70%;
      }
    }
  }
  .buy-bottom{
    width:20%;
    position: absolute;
    left:40%;
    display: flex;
    justify-content: space-between;
    div{
      width:32%;
      text-align: center;
      height:40px;
      line-height:40px;
    }
  }
}


</style>
