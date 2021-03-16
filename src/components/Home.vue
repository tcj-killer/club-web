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
};
</script>
<style scoped>
.app-wrap {
  width: 96%;
}
.content {
  width: 84%;
  margin: 10px;
  height: 90vh;
  overflow: hidden;
  display: block;
  position: absolute;
  left: 220px;
  top: 60px;
}
</style>