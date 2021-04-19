<template>
  <!-- 侧边栏导航 -->
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      background-color="#04294b"
      text-color="#80a0bf"
      active-text-color="#fff"
      :default-active="$route.path"
      router
    >
<!--      <el-menu-item index="/usermanages">-->
<!--        <i class="el-icon-user-solid"></i>-->
<!--        <span>用户管理</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/index">
        <i class="el-icon-user-solid"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/active">
        <i class="el-icon-user-solid"></i>
        <span>线下活动</span>
      </el-menu-item>
      <el-menu-item index="/location">
        <i class="el-icon-user-solid"></i>
        <span>场地集合</span>
      </el-menu-item>
      <el-menu-item index="/shop">
        <i class="el-icon-user-solid"></i>
        <span>商城</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="el-icon-user-solid"></i>
        <span>历史订单</span>
      </el-menu-item>
      <el-menu-item index="/collect">
        <i class="el-icon-user-solid"></i>
        <span>收藏</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <i class="el-icon-user-solid"></i>
        <span>精彩视频</span>
      </el-menu-item>
      <el-menu-item index="/administration">
        <i class="el-icon-user-solid"></i>
        <span>信息管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.sidebar {
  position: absolute;
  top: 60px;
  display: block;
  height: 45vw;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
</style>
