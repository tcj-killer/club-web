<template>
  <!-- 用户信息页面 -->
  <div class="act">
    <div class="act-top">
      <el-button type="primary" @click="dialogFormVisible = true">发起线下活动</el-button>
      <el-dialog title="线下活动信息" :visible.sync="dialogFormVisible" @close="closeDialog">
        <div class="pickdate">
          选择日期&nbsp&nbsp
          <el-date-picker
            v-model="value"
            type="daterange"
            @change="dateInfo(value)"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-form :model="form">
          <el-form-item label="活动简介" :label-width="formLabelWidth">
            <el-input v-model="form.des" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" :label-width="formLabelWidth">
            <el-input v-model="form.time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动最大人数" :label-width="formLabelWidth">
            <el-input v-model="form.maxNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动最小人数" :label-width="formLabelWidth">
            <el-input v-model="form.minNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAct(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="act-content">
    <el-table
      :header-cell-style="{'text-align':'center'}"
      :data="list.slice((currentPage-1)*3,currentPage*3)"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="act_id"
        label="活动编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="act_des"
        label="活动简介"
        width="350">
      </el-table-column>
      <el-table-column
        prop="act_signtime"
        label="活动报名时间"
        width="350">
      </el-table-column>
      <el-table-column
        prop="act_time"
        label="活动时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="act_minNum"
        label="最小参与人数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="act_maxNum"
        label="最大参与人数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="act_price"
        label="价格"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click ="handleClick(scope.row)" type="text" size="small">参与</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="act-content-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes=[3]
        :page-size=1
        layout="sizes,prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
    </div>
    </div>
    <div class="act-bottom">
      <div class="dualEcharts" id="dualEcharts"></div>
    </div>
  </div>
</template>

<script>
// 引用组件
import echarts from 'echarts'
export default {
  name: "active",
  data() {
    return {
      list:[],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      value: '',
      form:{
        time:'',
        maxNum:'',
        minNum:'',
        des:'',
        price:'',
      },
      dateDec:'',
    currentPage:1
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
    this.Getactive();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClick(row) {
      this.$http({
        url:this.$http.adornUrl('/api/active/join'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          actid:row.act_id
        }
      }).then(({data})=>{
        if(data.data == 0){
          //未参与
          this.$message({
            type:'success',
            message:'活动参与成功'
          })
        }else if(data.data == 1){
          this.$message({
            type:'error',
            message:'已参加此活动，请勿重复点击'
          })
        }else{
          this.$message({
            type:'error',
            message:'活动参与人数已达最大值 '
          })
        }
      })
      // this.$message({
      //   type:'success',
      //   message:'活动参与成功'
      // })
      this.$router.go(0)
    },
    Getactive(){
      this.$http({
        url:this.$http.adornUrl('/api/active'),
        method:'get',
      }).then(({data})=>{
        this.list = data.data;
        console.log(this.list)
        var arr = [];
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        this.list.forEach(item=>{
          arr.push(item.act_des)
          arr1.push(item.count)
          arr2.push(item.act_maxNum)
          arr3.push(item.act_minNum)
        })
        this.initBar(arr,arr1,arr2,arr3)
      })
    },
    closeDialog(){
      this.form = '';
    },
    //新增
    addAct(){
      this.dialogFormVisible = false;
      this.$http({
        url: this.$http.adornUrl('/api/active/create'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          signtime:this.dateDec,
          time:this.form.time,
          des:this.form.des,
          minnum:this.form.minNum,
          maxnum:this.form.maxNum,
          price:this.form.price
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'创建成功'
      })
      this.$router.go(0)
    },
    dateInfo(val){
      this.dateDec = val[0]+'——'+val[1]
    },
    initBar(area,val,max,min){
      // 基于准备好的dom，初始化echarts实例
      let dualEcharts = this.$echarts.init(document.getElementById('dualEcharts'))
      var areaList = area;

      var arr = val//参与人数
      var arr1 = max//最大人数
      var arr2 = min//最小人数

      var displayNum = 6;//每次显示数据条数
      var groupNum = Math.ceil(arr.length / displayNum);
      var arrGroup = [];
      for (var i = 0; i < arr.length; i += displayNum) {//数据按个数分组存储
        arrGroup.push(arr.slice(i, i + displayNum));
      }
      var arr1Group = [];
      for (var i = 0; i < arr1.length; i += displayNum) {//数据按个数分组存储
        arr1Group.push(arr1.slice(i, i + displayNum));
      }
      var arr2Group = [];
      for (var i = 0; i < arr2.length; i += displayNum) {//数据按个数分组存储
        arr2Group.push(arr2.slice(i, i + displayNum));
      }
      var areaGroup = [];
      for (var i = 0; i < areaList.length; i += displayNum) {//区域名称按个数分组存储
        areaGroup.push(areaList.slice(i, i + displayNum));
      }
      var groupOption = [];
      for (var i = 0; i < groupNum; i++) {
        var temp = {
          title:{
            text:'活动参与人数统计（实时）',
            left: "center",
            top: "0",
            textStyle: {
              fontSize: 20
            },
          },
          xAxis: [
            {
              name:'活动名称',
              nameLocation:'end',
              nameTextStyle:{
                color:'#abc',
                padding:[25,0,0,10]
              },
              type: 'category',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#abc',
                  fontSize: 9
                },
                interval: 0,
                //rotate: displayNum > 13 ? 25 : 0,//数据超过13条时，横坐标标签斜置
              },
              data: areaGroup[i],
              splitLine: { show: false },

            }
          ],
          series: [
            { data: arrGroup[i] },
            { data: arr1Group[i] },
            { data: arr2Group[i] },
          ]
        };
        groupOption.push(temp);
      }
      var option = {
        baseOption: {
          timeline: {
            // y: 0,
            show:false,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 5000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: areaGroup,
            label: {
              formatter : function(s) {
                return '';
              }
            }
          },
          legend: {
            orient: 'horizontal',//图例横向排列
            left: 'center',
            itemHeight:20,
            itemWidth:15,
            bottom: '-2%',
            textStyle: {
              fontSize:12,
              color:'#ABC',
            }

          },
          calculable : true,
          grid: {
            top: 40,
            left:40,
            bottom: 40
          },
          xAxis: [
            {
              type:'category',
              axisLine: {
                show:false,
                lineStyle: {
                  color: 'rgba(51,82,107,0.5)',
                }
              },
              axisTick: {
                show: false
              },
              splitArea: {
                show: false
              },
              data:areaList,
              axisLabel: {
                interval: 0,///居中显示
                color:'#C5DBF4',
                fontSize:8
              },
            }
          ],
          yAxis: [
            {
              name:'实时参与人数',
              nameLocation:'end',
              nameTextStyle:{
                color:'#abc',
                padding:[25,0,0,10]
              },
              minInterval: 1,//纵坐标为整数
              type: 'value',
              splitLine: {
                show:false,
                lineStyle:{
                  color:'rgba(51,82,107,0.5)'
                },
                show: true
              },
              axisLine: {
                show: true
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                color:'#abc',
                fontSize:10
              },
              splitArea: {
                show: false
              },
              // max: 53500
              //max: 3
            }
          ],
          tooltip:{
            show:true
          },
          series: [
            {
              name: '实时参与人数',
              type: 'line',
              barWidth: 40,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(255, 67, 2, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 196, 53, 1)", // 100% 处的颜色
                    },
                  ]),
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  color: '#D0D8E2',
                  formatter: function (params) {//总数为0时显示数字
                    if (params.value != 0) {
                      return params.value;
                    } else {
                      return '';
                    }
                  }
                }
              },
              data: arr,
            },
            {
              name: '最大参与人数',
              type: 'bar',
              barWidth: 40,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(10, 255, 255, 1)", // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, 1)", // 100% 处的颜色
                    },
                  ]),
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  color: '#D0D8E2',
                  formatter: function (params) {//总数为0时显示数字
                    if (params.value != 0) {
                      return params.value;
                    } else {
                      return '';
                    }
                  }
                }
              },
              data: arr1,
            },
            {
              name: '最小参与人数',
              type: 'bar',
              barWidth: 40,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(13, 73, 133, 1)", // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, 1)", // 100% 处的颜色
                    },
                  ]),
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  color: '#D0D8E2',
                  formatter: function (params) {//总数为0时显示数字
                    if (params.value != 0) {
                      return params.value;
                    } else {
                      return '';
                    }
                  }
                }
              },
              data: arr2,
            }
          ]
        },
        options: groupOption,
      };
      dualEcharts.clear();//清空echarts
      dualEcharts.setOption(option, true);
      window.addEventListener('resize', () => {
        dualEcharts.resize()
      })
    },
  }

};
</script>
<style lang="scss" scoped>

// 滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; // 横向滚动条
  height: 10px; // 纵向滚动条 必写
}
// 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}
body{
  box-sizing: border-box;
}

/deep/.el-table td, .el-table th {
  text-align: center;
}

.pickdate{
  margin-left:4%;
  margin-bottom:2.5%;
}

.act{
  width:100%;
  height:100%;
  .act-top{
    width:100%;
    height:7%;
  }
  .act-content{
    width:100%;
    height:50%;
    position: relative;
    .act-content-bottom{
      position: absolute;
      left:30%;
    }
  }
  .act-bottom{
    width:100%;
    height:49%;
    margin-top:-5%;
    .dualEcharts{
      width:100%;
      height:98%;
    }
  }
}

</style>
