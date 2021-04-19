<template>
  <!-- 场地信息页面 -->
  <div class="collect">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="商品收藏" name="first">
          <div class="collect_goods">
            <div class="collect-shop-list" v-for="(item,index) in shopList" :key="index">
              <img :src=item.imgurl alt="">
              <div class="name">{{item.goods_name}}</div>
              <div class="price">价格：{{item.goods_price}}</div>
              <div class="count">月销量：{{item.goods_count}}</div>
              <div class="time">上架时间：{{item.goods_time}}</div>
              <div class="button">
                <el-button type="info" round @click="uncollect(item.goods_id)">取消收藏</el-button>
                <el-button type="danger" round @click="goBuy(item.goods_id)">购买</el-button>
              </div>

            </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="新闻收藏" name="second">
        <el-button type="primary" @click="dialogFormVisible = true">发布新闻</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="closeDialog">
          <el-form :model="newsform">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="newsform.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="newsform.content"></el-input>
            </el-form-item>
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="newsincrease">确 定</el-button>
          </div>
        </el-dialog>
          <div class="news">
              <div class="news-list" v-for="(item,index) in newslist" :key="index" @click="gonews(item.id)">
                <div class="imgsty"><img :src=item.imgurl alt=""></div>
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content.slice(0,150)}}...</div>
                <div class="point">点赞数：{{item.point}}</div>
                <div class="author">作者：{{item.author}}</div>
                <div class="btn"><el-button type="info" @click="unselect(item.id)">取消收藏</el-button></div>
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
      shopList:[],
      newslist:[],
      fileList:[],
      dialogFormVisible:false,
      formLabelWidth:'120px',
      newsform:{
        title:'',
        content:''
      },
      path:''
    };
  },
  created() {
    this.Getgoods();
    this.Getnews();
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
  },
  methods: {
    handleClick(tab, event) {
    },
    goBuy(id){
      this.$router.push({
        path:'/buy',
        query:{
          id
        }
      })
    },
    Getgoods(){
      this.$http({
        url:this.$http.adornUrl('/api/shop/collect/list'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id
        }
      }).then(({data})=>{
          console.log(data.data)
        // data.data.forEach(item=>{
        //   let id = item.goods_id;
        //   let name = item.goods_name;
        //   let address = item.goods_address;
        //   let count = item.goods_count;
        // })
        this.shopList = data.data;
          console.log(this.shopList)
      })
    },
    uncollect(id){
      this.$http({
        url:this.$http.adornUrl('/api/shop/uncollect'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          goodsid:id
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'操作成功'
      })
      this.$router.go(0);
    },
    Getnews(){
      this.$http({
        url:this.$http.adornUrl('/api/news/collected'),
        method:'post',
        data:{
          id:this.$store.getters.userinfo[0].user_id
        }
      }).then(({data})=>{
        this.newslist = data.data;
      })
    },
    unselect(id){
      this.$http({
        url:this.$http.adornUrl('/api/news/uncollect'),
        method:'post',
        data:{
          userid:this.$store.getters.userinfo[0].user_id,
          newsid:id
        }
      }).then(({data})=>{})
      this.$message({
        type:'success',
        message:'取消收藏成功'
      })
      this.$router.go(0);
    },
    gonews(id){
      this.$router.push({
        path:'/news',
        query:{
          id
        }
      })
    },
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
    closeDialog(){
      this.newsform = [];
      this.fileList = [];
    },
    newsincrease(){
      this.dialogFormVisible = false;
      this.$http({
        url:this.$http.adornUrl('/api/news/increase'),
        method:'post',
        data:{
          title:this.newsform.title,
          content:this.newsform.content,
          path:this.path,
          username:this.$store.getters.userinfo[0].user_name
        }
      }).then(({data})=>{})
    }
  }
};
</script>

<style lang="scss" scoped>

body{
  box-sizing: border-box;
}
span{
  padding:0;
  margin:0;
}
.collect{
  width:100%;
  .collect_goods{
    width:100%;
    height:658px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .collect-shop-list{
      width:50%;
      height:50%;
      position: relative;
      img{
        width:40%;
        position: absolute;
        left:0;
        top:0;
      }
      .name{
        position: absolute;
        left:43%;
        top:5%;
      }
      .price{
        position: absolute;
        left:50%;
        top:20%;
      }
      .count{
        position: absolute;
        left:50%;
        top:35%
      }
      .time{
        position: absolute;
        left:50%;
        top:50%;
      }
      .button{
        position: absolute;
        left:45%;
        top:62%;
      }
    }
  }
}
.news{
  width:100%;
  margin-top:1%;
  .news-list{
    width:100%;
    display: flex;
    position:relative;
    img{
      width:200px;
    }
    .title{
      position:absolute;
      left:20%;
      font-size: 18px;
      font-weight: bold;
    }
    .content{
      width:65%;
      position:absolute;
      left:20%;
      top:20%;
      color:#abc;
    }
    .point{
      font-size: 14px;
      position:absolute;
      bottom:5%;
      right:35%;
      color: rgb(240,143,138);
    }
    .author{
      font-size: 14px;
      position: absolute;
      left:30%;
      bottom:5%;
      color: rgb(224,200,124);
    }
    .btn{
      position:absolute;
      right:5%;
      top:40%;
    }
  }
}

</style>
