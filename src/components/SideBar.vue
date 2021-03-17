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
      <el-menu-item index="/usermanages">
        <i class="el-icon-user-solid"></i>
        <span>用户管理</span>
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
  height: calc(100vh - 60px);
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
