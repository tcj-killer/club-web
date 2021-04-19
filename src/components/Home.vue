<template>
  <!-- home 页面 -->
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <v-head></v-head>
      <div class="app-wrap">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引用sidebar head
import vHead from "./Header.vue";
import vSidebar from "./SideBar.vue";
export default {
  name: "home",
  components: {
    vHead,
    vSidebar,
  },
  data() {
    return {
      collapse: true,
    };
  },
  computed: {},
  created() {},
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
  methods:{

  }

};
</script>
<style scoped>
/*/滚动条的宽度*/
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
height: 10px;
}
/*/滚动条的滑块*/
   /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     background-color: #ddd;
     border-radius: 3px;
   }
.app-wrap {
  width: 96%;
}
.content {
  width: 84%;
  margin: 10px;
  height: 90vh;
  display: block;
  position: absolute;
  left: 220px;
  top: 60px;
}
</style>
