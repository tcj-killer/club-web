<template>
  <!-- 用户信息页面 -->
  <div class="video">
    <el-button type="primary" @click="dialogFormVisible = true">发布视频</el-button>

    <el-dialog title="发布视频" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form :model="form">
        <el-form-item label="视频名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:3000/api/upload"
          :on-success="handelSuccess"
          :before-upload="beforeUpload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传mp4文件文件</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="videoincrease">确 定</el-button>
      </div>
    </el-dialog>

    <div class="video-content">
      <div class="video-list" v-for="(item,index) in videolist">
        <div class="top">
          <div class="title">{{item.title}}</div>
          <div class="point" @click="addpoint(item.id)"><i class="el-icon-star-off "></i>{{item.point}}</div>
        </div>
        <itcastvideo :src=item.url></itcastvideo>
        <div class="bottom">
          <div class="author">作者：{{item.author}}</div>
          <div class="time">发布时间：{{item.time}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 引用组件
import 'animate.css'
import itcastvideo from 'myitcastvideo456'
export default {
  name: "buy",
  components:{
    itcastvideo
  },
  data() {
    return {
      videolist:[

      ],
      path:'',
      formLabelWidth:'120px',
      dialogFormVisible:false,
      form:{
        title:'',
      },
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
    this.changeDate();
    this.Getinfo();
  },
  methods: {
    closeDialog(){
      this.form = ''
    },
    //上传图片前判断文件类型
    beforeUpload(file){
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'mp4'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if(!extension) {
        this.$message({
          message: '上传文件只能是mp4格式!',
          type: 'warning'
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension

    },
    handelSuccess(response,file,fileList){
      //文件上传后的地址
      this.path = file.response.data.path;
    },
    //日期格式修改
    setZero(a) {//设置小于10的数字在加0
      return a < 10 ? "0" + a : a;
    },
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
    //发布视频
    videoincrease(){
      this.dialogFormVisible = false;
      this.$http({
        url:this.$http.adornUrl('/api/video/increase'),
        method:'post',
        data:{
            title:this.form.title,
          time:this.checktime,
          username:this.$store.getters.userinfo[0].user_name,
          url:this.path,
        }
      })
      this.$router.go(0)
    },
    //获取所有视频信息
    Getinfo(){
      this.$http({
        url:this.$http.adornUrl('/api/video/select'),
        method:'get'
      }).then(({data})=>{
        data.data.forEach(item=>{
          let obj = {};
          obj.point = item.video_point;
          obj.title = item.video_title;
          obj.author = item.video_author;
          obj.time = item.video_time;
          obj.url = item.video_url;
          obj.id = item.video_id;
          this.videolist.push(obj)
        })
      })
    },
    //视频点赞
    addpoint(id){
      this.$http({
        url:this.$http.adornUrl('/api/video/point'),
        method:'post',
        data:{
          id:id
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'点赞成功'
      })
      this.$router.go(0)
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
.video {
  width: 100%;
  height: 100%;
  .video-content{
    width:90%;
    margin:0 5%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .video-list{
      width:45%;
      margin-top:10%;
      .top{
        width:100%;
        display: flex;
        justify-content: space-between;
        .title{
          text-overflow: ellipsis;
          overflow: hidden;
          width:80%;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2A2A2A;
        }
      }
      .bottom{
        width:100%;
        height:40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .time{
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909090;
          padding-top:3%;
        }
        .author{
          padding-left:10%;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909090;
        }
      }
    }
  }

}



</style>
