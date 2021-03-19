<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #eceff3;
  width: 100vw;
  height: 100vh;
}
.el-table th.gutter{
  display: table-cell!important;
}

</style>
