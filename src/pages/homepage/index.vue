<template>
  <!-- 用户信息页面 -->
  <div>
    <el-alert
      title="部分功能及页面仅管理员身份可用"
      type="warning"
      center
      show-icon
    v-if="flag">
    </el-alert>
    <div class="top">
      <span>大连旗战球迷协会管理网站</span>
    </div>
  <div class="home">
    <div class="home-left">
      <!--   轮播   -->
      <div class="home-left-top">
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item v-for="(item,index) in carsoule" :label=index+1 :key="index" >
            <img :src=item.imgurl alt="" style="width: 100%;height:100%" @click="tonews(item.id)">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="home-left-bottom">
        <div class="left-bottom-list" v-for="(item,index) in newsList.slice((currentPage-1)*4,currentPage*4)"
             :key="index" @click="tonews(item.id)">
          <img :src=item.imgurl alt="">
          <span>{{ item.title }}</span>
          <span><i class="el-icon-user"></i>&nbsp作者：{{item.author}}</span>
          <span><i class="el-icon-thumb"></i>&nbsp点赞数：{{item.point}}</span>
          <el-divider></el-divider>
        </div>
        <div class="list-bottom">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes=[4]
          :page-size=1
          layout="sizes,prev, pager, next, jumper"
          :total="newsList.length">
        </el-pagination>
        </div>
<!--        <div class="myChart" id="myChart"></div>-->
      </div>
    </div>
    <div class="home-right">
      <div class="right-top">
        <div class="right-top-top"><span>2020中超联赛TOP10</span></div>
      <el-table
        :data="chinaList"
        :header-cell-style="{fontSize:'12px',height:'16px','text-align':'center'}"
        :row-style="{height:'29px',color:'#abc',fontSize:'14px'}"
        :cell-style="{padding:'0px',margin:'0'}"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="排名"
        min-width="40">
          <template slot-scope="scope">
            <img style="width:55%;margin-left:40%" v-if="( scope.$index + 1)==1" src="../../assets/img/icon-top1.png" alt="">
            <img style="width:55%;margin-left:40%" v-else-if="(scope.$index + 1)==2" src="../../assets/img/icon-top2.png" alt="">
            <img style="width:55%;margin-left:40%" v-else-if="(scope.$index + 1)==3" src="../../assets/img/icon-top3.png" alt="">
            <div v-else
              style="width:20px;height:20px;border-radius:50%;background-color:rgba(22, 119, 255, 0.1);color:rgba(102, 102, 102, 1);margin-left:40%;">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cname"
          label="球队"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="match"
          label="赛"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="win"
          label="胜"
          min-width="40">
        </el-table-column>
        <el-table-column
          prop="falt"
          label="平"
          min-width="40">
        </el-table-column>
        <el-table-column
          prop="false"
          label="负"
        min-width="40">
        </el-table-column>
        <el-table-column
          prop="goals"
          label="进/失"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="points"
          label="积分"
          min-width="40">
        </el-table-column>
      </el-table>
    </div>
      <div class="right-center">
        <div class="right-center-top"><span>2020西甲联赛TOP10</span></div>
        <el-table
          :data="spainList"
          :header-cell-style="{fontSize:'12px',height:'16px','text-align':'center'}"
          :row-style="{height:'29px',color:'#abc',fontSize:'14px'}"
          :cell-style="{padding:'0px',margin:'0'}"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="排名"
            min-width="40">
            <template slot-scope="scope">
              <img style="width:55%;margin-left:40%" v-if="( scope.$index + 1)==1" src="../../assets/img/ranking1.png" alt="">
              <img style="width:55%;margin-left:40%" v-else-if="(scope.$index + 1)==2" src="../../assets/img/ranking2.png" alt="">
              <img style="width:55%;margin-left:40%" v-else-if="(scope.$index + 1)==3" src="../../assets/img/ranking3.png" alt="">
              <div v-else
                   style="width:20px;height:20px;border-radius:50%;background-color:rgba(22, 119, 255, 0.1);color:rgba(102, 102, 102, 1);margin-left:40%;">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="cname"
            label="球队"
            min-width="70">
          </el-table-column>
          <el-table-column
            prop="match"
            label="赛"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="win"
            label="胜"
            min-width="40">
          </el-table-column>
          <el-table-column
            prop="falt"
            label="平"
            min-width="40">
          </el-table-column>
          <el-table-column
            prop="false"
            label="负"
            min-width="40">
          </el-table-column>
          <el-table-column
            prop="goals"
            label="进/失"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分"
            min-width="40">
          </el-table-column>
        </el-table>
      </div>
      <div class="right-bottom">
        <div class="title"><span>世界足球俱乐部TOP10</span></div>
        <div class="rankingEchart" id="rankingEchart"></div>
      </div>
    </div>

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
      carsoule:[],
      newsList:[],
      imgList: [
        {id:0,idView:require('../../assets/img/1.png')},
        {id:1,idView:require('../../assets/img/2.png')},
        {id:2,idView:require('../../assets/img/3.png')},
        {id:3,idView:require('../../assets/img/4.png')},
        {id:4,idView:require('../../assets/img/5.png')},
      ],//轮播列表
      chinaList:[],//表格
      spainList:[],
      currentPage:1,
      echartsList:[],
      flag:true,
      timer:''
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

    this.timer = setTimeout(()=>{
      this.flag = false;
    },5000)
    //this.getData();
    this.GetTop10();
    this.Getcarousel();
    this.Getrankings();
    this.initranking();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    tonews(id){
      this.$router.push({
        path:'/news',
        query:{
            id:id
        }
      })
    },
    GetTop10(){
        this.$http({
          url: this.$http.adornUrl('/api/top10'),
          method: 'get',
          //params: this.$http.adornParams(param)
        }).then(({data}) => {
          for(var i=0;i<data.data.slice(0,10).length;i++){
            this.chinaList.push(data.data[i])
          }
          for(var i=10;i<data.data.length;i++){
            this.spainList.push(data.data[i])
          }
        })
    },
    Getcarousel(){
      this.$http({
        url: this.$http.adornUrl('/api/home/carousel'),
        method: 'get',
        //params: this.$http.adornParams(param)
      }).then(({data}) => {
        data.data.forEach((item,index)=>{
          if(item.status == 0){
            let obj = {};
            obj.imgurl = item.imgurl;
            obj.author = item.author;
            obj.content = item.content;
            obj.title = item.title;
            obj.point = item.point
            obj.id = item.id
            this.newsList.push(obj)
            this.carsoule = this.newsList.slice(0,5)
          }

        })
      })
    },
    Getrankings(){
      this.$http({
        url:this.$http.adornUrl('/api/home/worldRankings'),
        method:'get',
      }).then(({data})=>{
        data.data.forEach(item=>{
          let obj = {
            name:item.clubName,
            value:item.point
          }
          this.echartsList.push(obj)
        })
        this.initranking(this.echartsList)
      })
    },
    initranking(arr){
      // 基于准备好的dom，初始化echarts实例
      let rankingEchart = this.$echarts.init(document.getElementById('rankingEchart'))
      // 绘制图表
      let index = 0;
      var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF','#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A'];

      function fun() {
        var length =arr.length
        var timer = setInterval(function() {
          rankingEchart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: index
          });
          // 显示提示框
          rankingEchart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          // 取消高亮指定的数据图形
          rankingEchart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index == 0 ? length-1 : index - 1
          });
          rankingEchart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if (index > length-1) {
            index = 0;
          }
        }, 3000)
      }
      fun()
      var option = {
        title: {
          show: false,
          text: 'PieChart',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          center: ['52%', '45%'],
          radius: ['30%', '50%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 10,
          emphasis:{
            itemStyle:{
              borderColor: '#f3f3f3',
              borderWidth: 20
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{a|{b}：{c}}\n{hr|}',
            rich: {
              hr: {
                backgroundColor: 't',
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
              },
              a: {
                fontSize:16,
                padding: [-30, 15, -20, 15]
              }
            }
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
          data: arr,
        }]
      };
      rankingEchart.clear();//清空echarts
      rankingEchart.setOption(option, true);
        window.addEventListener('resize', () => {
          rankingEchart.resize()
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
body{
  box-sizing: border-box;
}
.top{
  width:100%;
  height:40px;
  background-image: url("../../assets/img/top_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  span{
    font-size: 22px;
    position: absolute;
    left:38%;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #00F0FF;
    background: linear-gradient(0deg, #00FFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.home{
  width:100%;
  display: flex;
  justify-content: space-between;
  .home-left{
    width:60%;
    .home-left-top{
      width:100%;
    }
    .home-left-bottom{
      width:100%;
      position:relative;
      .left-bottom-list{
        width:100%;
        position: relative;
        img{
          width:25%;
          height:125px;
        }
        span:nth-of-type(1){
          font-size: 22px;
          position: absolute;
          left:30%;
        }
        span:nth-of-type(2){
          font-size: 17px;
          color:#abc;
          position: absolute;
          left:70%;
          top:80%;
        }
        span:nth-of-type(3){
          color:red;
          position:absolute;
          font-size: 14px;
          left: 35%;
          top:70%;
        }
      }
      .list-bottom{
        position:absolute;
        left:20%;
      }
      //.myChart{
      //  width:100%;
      //  height:50%;
      //}
    }
  }
  .home-right{
    width:39%;
    .right-top{
      width:100%;
      height:370px;
      .right-top-top{
        width:100%;
        height:30px;
        background-image: url("../../assets/img/tableHeader.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        line-height:30px;
        span{
          font-size: 18px;
          color: #00F0FF;
          background: linear-gradient(0deg, #00FFFF 0%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .right-center{
      width:100%;
      height:370px;
      .right-center-top{
        width:100%;
        height:30px;
        background-image: url("../../assets/img/tableHeader.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        line-height:30px;
        span{
          font-size: 18px;
          color: #00F0FF;
          background: linear-gradient(0deg, #00FFFF 0%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .right-bottom{
      width:100%;
      height:300px;
      .title{
        width: 100%;
        height:10%;
        text-align: center;
        background-image: url("../../assets/img/tableHeader.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        span{
          font-size: 18px;
          color: #00F0FF;
          background: linear-gradient(0deg, #00FFFF 0%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .rankingEchart{
        width:100%;
        height:100%;
      }
    }
  }
}

/deep/.el-table td, .el-table th {
  text-align: center;
}


</style>
