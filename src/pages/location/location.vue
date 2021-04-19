<template>
  <!-- 场地信息页面 -->
  <div class="location">
    <div class="location-top">
      <el-button type="primary" @click="dialogFormVisible = true">新增场地</el-button>
      <el-dialog title="新增场地信息" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="form">
          <el-form-item label="场地名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租赁价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="场地简介" :label-width="formLabelWidth">
            <el-input v-model="form.des" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLocation(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="location-bottom">
    <el-table
      :header-cell-style="{'text-align':'center'}"
      :data="tableData.slice((currentPage-1)*6,currentPage*6)"
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="场地编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="场地名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="场地价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="场地状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="des"
        label="场地简介">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
          <el-button type="text" size="small" @click.native.prevent="update(scope.$index, tableData)">修改</el-button>
          <el-button @click.native.prevent="lease(scope.$index, tableData)" type="text" size="small">租用</el-button>
          <el-button @click.native.prevent="unlease(scope.$index, tableData)" type="text" size="small">退还</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="bottom-bottom">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes=[6]
      :page-size=1
      layout="sizes,prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
      </div>
      <el-dialog title="修改场地信息" :visible.sync="dialogFormVisible1" @close="closeDialog">
        <el-form :model="changeForm" append-to-body="true">
          <el-form-item label="场地名称" :label-width="formLabelWidth">
            <el-input v-model="changeForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="changeForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租赁价格" :label-width="formLabelWidth">
            <el-input v-model="changeForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="场地简介" :label-width="formLabelWidth">
            <el-input v-model="changeForm.des" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="changeInfo(changeForm)">确 定</el-button>
        </div>
      </el-dialog>
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
      tableData: [],
      currentPage:1,
      dialogTableVisible: false,
      dialogFormVisible1:false,
      dialogFormVisible: false,
      form: {
        name: '',
        price:0,
        address:'',
        des:''
      },
      changeForm:{
        name: '',
        price:0,
        address:'',
        des:''
      },
      oldname:'',
      status:'',
      formLabelWidth: '100px'
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
    this.getLocation();
  },
  methods: {
    getLocation(){
      this.$http({
        url: this.$http.adornUrl('/api/location'),
        method: 'get',
        //params: this.$http.adornParams(param)
      }).then(({data}) => {
        for(var i=0;i<data.data.length;i++){
          let id = i+1;
          let name = data.data[i].site_name;
          let price = data.data[i].site_price;
          let status = data.data[i].site_status;
          if(status == 0){
            status='未租用'
          }else{
            status='已租用'
          }
          let address = data.data[i].site_address;
          let des = data.data[i].site_des;
          let obj = {
            id:id,
            name:name,
            price:price,
            status:status,
            address:address,
            des:des
          }
          this.tableData.push(obj)
        }

      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    closeDialog(){
      this.form = '';
    },
    //删除场地信息（管理员身份）
    deleteRow(index, rows) {
      //管理员身份
      if(this.$store.getters.userinfo[0].identity==1){
        var info = rows.slice(index,index+1)
        this.$http({
          url: this.$http.adornUrl('/api/location/delete'),
          method: 'post',
          data: this.$http.adornData({
            name:info[0].name
          })
        }).then(({data}) => {
          console.log(data)
        })
         rows.splice(index, 1);
        this.$message({
          type:'success',
          message:'删除成功'
        })
      }else{
        this.$message({
          message:'权限不足,请使用管理员账号登录',
          type:'error'
        })
      }
    },
    //场地租用
    lease(index,rows){
      let info = rows.slice(index,index+1)
      this.status = info[0].status
      console.log(this.status)
      if(this.status == '未租用'){
        this.$http({
          url: this.$http.adornUrl('/api/location/lease'),
          method: 'post',
          data: this.$http.adornData({
            sitename:info[0].name,
            userid:this.$store.getters.userinfo[0].user_id,
            price:info[0].price
          })
        }).then(({data}) => {
          if(data.data != 1){
            this.$message({
              type:'success',
              message:'场地租赁成功'
            })
          }else{
            this.$message({
              type:'error',
              message:'余额不足 '
            })
          }
        })
      }else{
        this.$message({
          type:'error',
          message:'场地使用中'
        })
      }
    },
    //取消租用
    unlease(index,rows){
      var info = rows.slice(index,index+1)
      this.$http({
        url: this.$http.adornUrl('/api/location/unlease'),
        method: 'post',
        data: this.$http.adornData({
          sitename:info[0].name,
          userid:this.$store.getters.userinfo[0].user_id
        })
      }).then(({data}) => {
        if(data.data==0){
          //成功
          this.$message({
            type:'success',
            message:'取消成功'
          })
        }else{
          this.$message({
            type:'error',
            message:'取消失败'
          })
        }
      })
    },
    //场地新增
    addLocation(form){
      this.dialogFormVisible = false
      //管理员身份登录
      if(this.$store.getters.userinfo[0].identity==1){
        //调用场地新增接口
        this.$http({
          url: this.$http.adornUrl('/api/location/add'),
          method: 'post',
          data: this.$http.adornData({
            name:form.name,
            address:form.address,
            price:form.price,
            des:form.des
          })
        }).then(({data}) => {})
        this.$message({
          type:'success',
          message:'场地添加成功'
        })
      }else{
        this.$message({
          message:'权限不足,请使用管理员账号登录',
          type:'error'
        })
      }

    },
    update(index,rows){
      this.dialogFormVisible1 = true
      var info = rows.slice(index,index+1)
      this.changeForm = {
        name:info[0].name,
        address:info[0].address,
        price:info[0].price,
        des:info[0].des
      }
      this.oldname = this.changeForm.name
    },
    //场地修改
    changeInfo(changeFrom){
      this.dialogFormVisible1 = false
      if(this.$store.getters.userinfo[0].identity==1){
        this.$http({
          url: this.$http.adornUrl('/api/location/update'),
          method: 'post',
          data: this.$http.adornData({
            oldname:this.oldname,
            name:changeFrom.name,
            address:changeFrom.address,
            price:changeFrom.price,
            des:changeFrom.des
          })
        }).then(({data}) => {
          this.$message({
            type:'success',
            message:'修改信息成功'
          })
        })
      }else{
        this.$message({
          type:'error',
          message:'权限不足，请使用管理员账号登录'
        })
      }

    }
  },
};
</script>

<style lang="scss" scoped>

/deep/.el-table td, .el-table th {
  text-align: center;
}
body{
  box-sizing: border-box;
}

.location{
  width:100%;
  height:80%;
  .location-top{
    width:100%;
  }
  .location-bottom{
    width:100%;
    margin-top:1%;
    position:relative;
    .bottom-bottom{
      position: absolute;
      left:30%;
    }
  }
}

</style>
