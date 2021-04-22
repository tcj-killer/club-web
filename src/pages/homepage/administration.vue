<template>
  <!-- 场地信息页面 -->
  <div class="admin">
    <el-tabs type="border-card">
      <el-tab-pane label="用户信息管理">
        <div class="user">
          <el-button type="danger" @click="ban">封禁</el-button>
          <el-button type="primary" @click="Unban">解封</el-button>
        <el-table
          :data="tableData.slice((currentPage-1)*5,currentPage*5)"
          :header-cell-style="{'text-align':'center'}"
          @selection-change="handleSelectionChange"
          border
          style="width: 100%;margin-top:1%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="user_id"
            label="用户编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="140">
          </el-table-column>
          <el-table-column
            prop="user_pass"
            label="密码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="identity"
            label="用户身份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="creatTime"
            label="创建时间"
            width="250">
          </el-table-column>
          <el-table-column
            prop="user_email"
            label="邮箱"
            width="200">
          </el-table-column>
          <el-table-column
            prop="user_phone"
            label="电话"
            width="140">
          </el-table-column>
          <el-table-column
            prop="point"
            label="剩余积分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="账号状态"
            fixed="right"
            width="80">
          </el-table-column>

        </el-table>
        <div class="bottom-bottom">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes=[5]
            :page-size=1
            layout="sizes,prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="首页新闻信息管理">
        <el-button type="danger" @click="bannews">停用</el-button>
        <el-button type="primary" @click="Unbannews">启用</el-button>
        <div class="news">
          <el-table
            :data="newslist.slice((currentPage1-1)*5,currentPage1*5)"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="selectnews"
            border
            style="width: 100%;margin-top:1%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="id"
              label="新闻编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              show-overflow-tooltip
              width="250">
            </el-table-column>
            <el-table-column
              prop="content"
              label="新闻详情"
              show-overflow-tooltip
              width="400">
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="120">
            </el-table-column>
            <el-table-column
              prop="point"
              label="点赞数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="imgurl"
              label="图片"
              width="150">
              <template slot-scope="scope">
                <img  :src="scope.row.imgurl" alt="" style="width: 100px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bottom-bottom">
            <el-pagination
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes=[5]
              :page-size=1
              layout="sizes,prev, pager, next, jumper"
              :total="newslist.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息管理">
        <el-button type="danger" @click="OFF">下架</el-button>
        <el-button type="primary" @click="PUT">上架</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增商品</el-button>

        <el-dialog title="新增商品" :visible.sync="dialogFormVisible" @close="closeDialog">
          <el-form :model="goods">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="goods.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发货地址" :label-width="formLabelWidth">
              <el-input v-model="goods.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单价" :label-width="formLabelWidth">
              <el-input v-model="goods.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="upload">
            <el-upload
              class="upload-demo"
              action="http://localhost:3000/api/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handelSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload">确 定</el-button>
          </div>
        </el-dialog>
        <div class="goods">
          <el-table
            :data="goodslist.slice((currentPage2-1)*5,currentPage2*5)"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="selectgoods"
            border
            style="width: 100%;margin-top:1%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="goods_id"
              label="商品编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="goods_name"
              label="商品名称"
              show-overflow-tooltip
              width="400">
            </el-table-column>
            <el-table-column
              prop="goods_address"
              label="发货地址"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              prop="goods_price"
              label="单价"
              width="120">
            </el-table-column>
            <el-table-column
              prop="imgurl"
              label="图片"
              width="150">
              <template slot-scope="scope">
                <img  :src="scope.row.imgurl" alt="" style="width: 100px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_count"
              label="累计销量"
              width="100">
            </el-table-column>
            <el-table-column
              prop="status"
              fixed="right"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="goodsdelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bottom-bottom">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes=[5]
              :page-size=1
              layout="sizes,prev, pager, next, jumper"
              :total="goodslist.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视频管理">
        <el-button type="danger" @click="videoOff">停用</el-button>
        <el-button type="primary" @click="videoPut">启用</el-button>
        <div class="goods">
          <el-table
            :data="videolist.slice((currentPage3-1)*5,currentPage3*5)"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="selectvideo"
            border
            style="width: 100%;margin-top:1%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="video_id"
              label="视频编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="video_title"
              label="视频标题"
              show-overflow-tooltip
              width="450">
            </el-table-column>
            <el-table-column
              prop="video_author"
              label="视频作者"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              prop="video_point"
              label="点赞数"
              width="120">
            </el-table-column>
            <el-table-column
              prop="video_time"
              label="发布时间"
              width="300">
            </el-table-column>
            <el-table-column
              prop="status"
              fixed="right"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="videodelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bottom-bottom">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page="currentPage3"
              :page-sizes=[5]
              :page-size=1
              layout="sizes,prev, pager, next, jumper"
              :total="videolist.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引用组件
import echarts from 'echarts'
export default {
  name: "index",
  data() {
    return {
      activeName: 'first',
      tableData:[],
      currentPage:1,
      currentPage1:1,
      currentPage2:1,
      currentPage3:1,
      multipleSelection:[],
      goods: {
        name:'',
        address:'',
        price:0
      },
      newslist:[],
      news:[],
      goodslist:[],
      goodssel:[],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      path:'',
      fileList:[],
      videolist:[],
      videosel:[]
    };
  },
  created() {
  if(this.$store.getters.userinfo[0].identity == 0){
    this.$router.push('/index')
    this.$message({
      type:"warning",
      message:'权限不足，请使用管理员身份登录'
    })
  }
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
    this.GetuserInfo();
    this.Getnews();
    this.Getgoods();
    this.Getvideo();
  },
  methods: {
    //新增商品，上传图片
    handelSuccess(response,file,fileList){
      //文件上传后的地址
      this.path = file.response.data.path;
      console.log(this.path)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload(){
      this.$http({
        url:this.$http.adornUrl('/api/goods/increase'),
        method:'post',
        data:{
          name:this.goods.name,
          address:this.goods.address,
          price:this.goods.price,
          path:this.path
        }
      }).then(({data})=>{})
      this.dialogFormVisible = false
    },
    //获取选中的每行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectnews(val) {
      this.news = val;
    },
    selectgoods(val){
      this.goodssel = val;
    },
    //用户封停解封
    Unban(){
      var arr = [];
      console.log(this.multipleSelection)
      this.multipleSelection.forEach(item=>{
        arr.push(item.user_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/userinfo/unban'),
        method:'post',
        data:{
          arr:arr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'解封账号成功'
      })
      this.$router.go(0);
    },
    ban(){
      var idArr = [];
      this.multipleSelection.forEach(item=>{
        idArr.push(item.user_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/userinfo/ban'),
        method:'post',
        data:{
          idArr:idArr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'停用成功'
      })
      this.$router.go(0);
    },
    //新闻
    Unbannews(){
      var arr = [];
      console.log(this.news)
      this.news.forEach(item=>{
        arr.push(item.id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/news/unban'),
        method:'post',
        data:{
          arr:arr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'启用成功'
      })
      this.$router.go(0);
    },
    bannews(){
      var idArr = [];
      this.news.forEach(item=>{
        idArr.push(item.id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/news/ban'),
        method:'post',
        data:{
          idArr:idArr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'封停账号成功'
      })
      this.$router.go(0);
    },
    OFF(){
      var arr = [];
      this.goodssel.forEach(item=>{
        arr.push(item.goods_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/goods/off'),
        method:'post',
        data:{
          arr:arr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'下架成功'
      })
      this.$router.go(0);
    },
    PUT(){
      var arr = [];
      this.goodssel.forEach(item=>{
        arr.push(item.goods_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/goods/put'),
        method:'post',
        data:{
          arr:arr
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'上架成功'
      })
      this.$router.go(0);
    },
    //获取用户信息
    GetuserInfo(){
      this.$http({
        url:this.$http.adornUrl('api/userinfo'),
        method:'get'
      }).then(({data})=>{
        this.tableData = data.data
        this.tableData.forEach(item=>{
          if(item.identity == 0){
            item.identity = '用户'
          }else{
            item.identity = '管理员'
          }
          if(item.status == 0){
            item.status = '正常'
          }else{
            item.status = '封禁'
          }
        })
      })
    },
    //获取新闻信息
    Getnews(){
      this.$http({
        url: this.$http.adornUrl('/api/home/carousel'),
        method: 'get',
        //params: this.$http.adornParams(param)
      }).then(({data}) => {
        this.newslist = data.data
        this.newslist.forEach(item=>{
          if(item.status == 0){
            item.status = '启用'
          }else{
            item.status = '停用'
          }
        })
      })
    },
    //获取商品信息
    Getgoods(){
      this.$http({
        url:this.$http.adornUrl('/api/shop'),
        method:'get',
      }).then(({data})=>{
        this.goodslist = data.data;
        this.goodslist.forEach(item=>{
          if(item.status == 0){
            item.status = '已上架'
          }else{
            item.status = '已下架'
          }
        })
      })
    },
    //删除新闻
    handleClick(row) {
      this.$http({
        url:this.$http.adornUrl('/api/news/delete'),
        method:'post',
        data:{
          id:row.id
        }
      }).then(({data})=>{})
      this.$message({
        type:"success",
        message:'删除成功'
      })
      this.$router.go(0);
    },
    //删除商品
    goodsdelete(row){
      console.log(row.goods_id)
      this.$http({
        url:this.$http.adornUrl('/api/goods/delete'),
        method:'post',
        data:{
          id:row.goods_id
        }
      }).then((data)=>{})
      this.$message({
        type:'success',
        message:'删除成功'
      })
      this.$router.go(0);
    },
    //查询视频信息
    Getvideo(){
      this.$http({
        url:this.$http.adornUrl('/api/video/select'),
        method:'get'
      }).then(({data})=>{
          this.videolist = data.data;
          this.videolist.forEach(item=>{
            if(item.status == 0){
              item.status = '启用'
            }else{
              item.status = '禁用'
            }
          })
      })
    },
    //删除视频
    videodelete(val){
      let id = val.video_id;
      this.$http({
        url:this.$http.adornUrl('/api/video/delete'),
        method:'post',
        data:{id:id}
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'删除成功'
      })
    },
    //禁用视频
    videoOff(){
      let arr = [];
      this.videosel.forEach(item=>{
        arr.push(item.video_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/video/off'),
        method:'post',
        data:{arr:arr}
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'停用成功'
      })
    },
    videoPut(){
      let arr = [];
      this.videosel.forEach(item=>{
        arr.push(item.video_id)
      })
      this.$http({
        url:this.$http.adornUrl('/api/video/put'),
        method:'post',
        data:{arr:arr}
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'启用成功'
      })
    },
    selectvideo(val){
      this.videosel = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    closeDialog(){
      this.goods = [];
      this.fileList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
//上传模块位置
.upload{
  margin-left:7%;
}
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
span{
  padding:0;
  margin:0;
}
.admin{
  width:100%;
}
.user{
  width:100%;
  height:100%;
  .bottom-bottom{
    margin-left:32%;
    margin-top:1%;
  }
}
.news{
  width:100%;
  height:100%;
  .bottom-bottom{
    margin-left:32%;
    margin-top:1%;
  }
}

.goods{
  width:100%;
  height:100%;
  .bottom-bottom{
    margin-left:32%;
    margin-top:1%;
  }
}
</style>
