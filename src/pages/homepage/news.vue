<template>
  <div class="news">
    <div class="news-top">
      <div class="button"><el-button type="primary" round @click="goback"><i class="el-icon-back"></i>返回</el-button></div>
      <div class="title">{{title}}</div>
      <div class="author">作者：{{author}}</div>
      <div class="time">当前时间：{{date|formatDate(this)}}</div>
      <div class="point" @click.once="fabulous"><i class="el-icon-circle-check">{{point}}</i></div>
      <div class="collect"><i :class="flag==false?'el-icon-star-off':'el-icon-star-on'" @click="collectnews"></i></div>
    </div>
    <div class="news-bottom">
      <img :src=imgurl alt="">
      <div class="content">{{content}}</div>
    </div>
    <div class="newsreplay">
      <div class="replayarea">
        <div class="top-left">
          <div class="title">评论区</div>
          <div style="width:30px;height:3px;background-color: #00F0FF;margin-top:4%;"></div>
        </div>
        <el-button @click="dialogFormVisible = true" style="height:40px">评论</el-button>
      </div>

      <el-dialog title="评论" :visible.sync="dialogFormVisible"
                 @close="closeDialog" :modal="false" :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="评论内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.area" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="comment(form)">确 定</el-button>
        </div>
      </el-dialog>

      <div class="replaylist" v-for="(item,index) in replaylist">
        <div class="replay-top">
          <div class="top-left">
            <div class="user">用户：{{ item.name }}</div>
            <div class="time">评论时间：{{item.time}}</div>
          </div>
          <div class="top-right">
            <i class="el-icon-thumb" style="margin:1% 5% 0 0"></i>
            <div class="point" @click.once = "thumbs(item.id)">点赞数：{{ item.point }}</div>
          </div>

        </div>
        <div class="replay-center">
          <div class="parcontent">
            <div class="content">{{ item.content }}</div>
            <el-button @click="dialogFormVisible2=true"style="height:40px">回复</el-button>
          </div>

          <el-dialog title="回复" :visible.sync="dialogFormVisible2" @close="closeDialog2"
                     :modal="false" :close-on-click-modal="false">
            <el-form :model="form2">
              <el-form-item label="回复内容" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form2.area" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="replay('作者',item.id,form2)">确 定</el-button>
            </div>
          </el-dialog>

          <div class="dialog" @click="item.showflag=!item.showflag">
            共{{item.total}}条回复
            <i class="el-icon-d-arrow-right"></i>
          </div>

            <div class="children-list" v-for="(sy,index) in item.children" v-if="item.showflag">
              <el-dialog title="回复" :visible.sync="dialogFormVisible1" @close="closeDialog1"
                         :modal="false" :close-on-click-modal="false">
                <el-form :model="form1">
                  <el-form-item label="回复内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form1.area" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="replay(sy.username,item.id,form1)">确 定</el-button>
                </div>
              </el-dialog>
              <div class="child-left">
                <div class="userinfo">{{sy.username}}回复了{{sy.replayed_id}}</div>
                <div class="time">回复时间{{sy.replay_time}}</div>
                <div class="content">{{sy.replay_content}}</div>
              </div>
              <el-button @click="dialogFormVisible1=true" style="height:40px;">回复</el-button>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "error",
  data() {
    return {
      timer:'',
      title:'',
      author:'',
      imgurl:'',
      id:0,
      flag:false,
      ifshow:true,
      date:new Date(),
      replaylist:[],
      showflag:false,
      dialogFormVisible:false,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
    formLabelWidth:'120px',
      form:{
        area:''
      },
      form1:{
        area:''
      },
      form2:{
        area:''
      },
      checktime:''
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    var _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改日期数据
    }, 1000);
    this.getInfo();
    this.getreplay();
    this.changeDate();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
    };
  },
  methods:{
    closeDialog(){
      this.form = '';
    },
    closeDialog1(){
      this.form1 = '';
    },
    closeDialog2(){
      this.form2 = ''
    },
    goback(){
      this.$router.push('/index')
    },
    collectnews(){
      this.flag = true;
      this.$http({
        url:this.$http.adornUrl('/api/news/collect'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          newsid:this.id
        }
      }).then(({data})=>{})
    },
    getInfo(){
      this.$http({
        url:this.$http.adornUrl('/api/news'),
        method:'post',
        data:{
          id:this.$route.query.id
        }
      }).then(({data})=>{
        let info = data.data[0]
        this.title = info.title;
        this.author = info.author;
        this.content = info.content;
        this.imgurl = info.imgurl;
        this.point = info.point;
        this.id = info.id;
      })
    },
    fabulous(){
      this.point = this.point+1;
      this.$message({
        type:'success',
        message:'点赞成功'
      })
      this.$http({
        url:this.$http.adornUrl('/api/news/point'),
        method:'post',
        data:{
          id:this.$route.query.id,
          point:this.point
        }
      }).then(({data})=>{})
      this.$router.go(0)
    },
    setZero(a) {//设置小于10的数字在加0
      return a < 10 ? "0" + a : a;
    },
    //日期格式修改
    changeDate(){
      var date = new Date();
      let year = date.getFullYear();
      let month = this.setZero(date.getMonth()+1);
      let day = this.setZero(date.getDate());
      let hour = this.setZero(date.getHours());
      let minute = this.setZero(date.getMinutes());
      let second = this.setZero(date.getSeconds());
      this.checktime = year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒'
    },
    //查询评论信息
    getreplay(){
      this.$http({
        url:this.$http.adornUrl('/api/news/comment/select'),
        method:'post',
        data:{
          newsid:this.$route.query.id
        }
      }).then(({data})=>{
        data.data.forEach(item=>{
          let obj = {};
          obj.id = item.replay_id;
          obj.name = item.username;
          obj.time = item.replay_time;
          obj.content = item.replay_content;
          obj.point = item.replay_point;
          obj.children = item.children;
          obj.total = item.children.length;
          obj.showflag = false
          this.replaylist.push(obj)
        })
      })
    },
    //回复
    replay(replayed_id,id,form){
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.$http({
        url:this.$http.adornUrl('/api/news/replay'),
        method:'post',
        data:{
          time:this.checktime,
          content:form.area,
          userid:this.$store.getters.userinfo[0].user_id,
          username:this.$store.getters.userinfo[0].user_name,
          newsid:this.$route.query.id,
          id:id,
          replayed_id:replayed_id,
        }
      }).then(({data})=>{})
      // this.$router.go(0)
      this.$message({
        type:'success',
        message:'回复成功'
      })
    },
    //评论
    comment(form){
      this.dialogFormVisible = false
      this.$http({
        url:this.$http.adornUrl('/api/news/comment'),
        method:'post',
        data:{
          time:this.checktime,
          content:form.area,
          userid:this.$store.getters.userinfo[0].user_id,
          username:this.$store.getters.userinfo[0].user_name,
          newsid:this.$route.query.id
        }
      }).then(({data})=>{})
      this.$router.go(0)
      this.$message({
        type:'success',
        message:'评论成功'
      })
    },
    //点赞
    thumbs(id){
      this.$http({
        url:this.$http.adornUrl('/api/news/thumbs'),
        method:'post',
        data:{
          id:id
        }
      }).then(({data})=>{
      })
      this.$router.go(0)
    }
  },
  filters:{
    formatDate(date, vm) {  //当前时间格式化处理
      var str = "";
      var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      str += vm.setZero(date.getFullYear()) + "年"; //获取年份
      str += vm.setZero(date.getMonth() + 1) + "月"; //获取月份
      str += vm.setZero(date.getDate()) + "日"; //获取日
      str += " " + weekDay[date.getDay()]; //获取星期
      str += " " + vm.setZero(date.getHours()) + ":"; //获取时
      str += " " + vm.setZero(date.getMinutes()) + ":"; //获取分
      str += vm.setZero(date.getSeconds()); //获取秒
      return str;
    },
  }
};
</script>

<style lang="scss" scoped>
.news{
  width:100%;
  background-image: url("../../assets/img/back.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .news-top{
    width:90%;
    margin:0 5%;
    height:150px;
    position:relative;
    .button{
      position:absolute;
      left:2%;
      top:10%;
    }
    .point{
      cursor: pointer;
      font-size: 19px;
      position: absolute;
      right:2%;
      top:15%;
    }
    .title{
      font-size: 30px;
      text-align: center;
      position: absolute;
      left:15%;
      top:20%;
    }
    .author{
      font-size:20px;
      color:#abc;
      position: absolute;
      left:10%;
      bottom:20%;
    }
    .time{
      font-family:"Times New Roman",Georgia,Serif;
      font-size: 18px;
      position: absolute;
      right:5%;
      bottom:0%;
    }
    .collect{
      font-size: 25px;
      position: absolute;
      right:5%;
      top:40%;
    }
  }
  .news-bottom{
    width:90%;
    margin:0 5%;
    img{
      margin:2% 20%;
      width:60%;
    }
    .content{
      width:66%;
      font-size: 18px;
      padding-bottom:20px;
      margin:0 17%;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909090;
      letter-spacing: 4px;
    }
  }
  .newsreplay{
    width:60%;
    min-height:400px;
    margin:5% 20%;
    padding-bottom:20px;
    .replayarea{
      width:100%;
      height:50px;
      display: flex;
      justify-content: space-between;
      .top-left{
        width:100%;
        height:50px;
        display: flex;
        justify-content: flex-start;
        border-bottom:1px solid #abc;
        .title{
          width:15%;
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2A2A2A;
        }

      }
    }
    .replaylist{
      width:100%;
      margin:5% 0% 10% 0%;
      .replay-top{
        width:100%;
        height:50px;
        display: flex;
        justify-content: space-between;
        .top-left{
          width:70%;
          .user{
            font-size: 20px;
            font-family: ProximaNova;
            font-weight: 400;
            color: #2A2A2A;
          }
          .time{
            font-size: 12px;
            margin-left:10%;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909090;
          }
        }
        .top-right{
          width:30%;
          display:flex;
          justify-content: flex-end;
          cursor: pointer;
          .point{
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909090;
          }
        }
      }
      .replay-center{
        width:100%;
        .parcontent{
          width:90%;
          margin:0 5%;
          display: flex;
          justify-content: space-between;
          .content{
            width:80%;
            font-size: 18px;
          }
        }
        .dialog{
          width:15%;
          height:30px;
          line-height:30px;
          text-align: center;
          background-color: #abc;
          color:lightseagreen;
          cursor:pointer;
        }
        .children-list{
          width:80%;
          margin: 1% 10%;
          display: flex;
          justify-content: space-between;
          .child-left{
            width:80%;
            .userinfo{
              font-size:14px;
            }
            .content{
              width:100%;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #2A2A2A;
              word-break:break-all;
            }
            .time{
              margin-left:5%;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909090;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
