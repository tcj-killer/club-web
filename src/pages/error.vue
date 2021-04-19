<template>
  <div>
    <div class="error"></div>
  </div>
</template>

<script>

export default {
  name: "error",
  data() {
    return {
      timer:''
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.timer = setTimeout(this.goback,3000)
  },
  methods:{
  goback(){
    this.$message('账号密码错误，返回登录页')
    this.$router.push('/login')
  }
  }

};
</script>

<style lang="scss" scoped>
.error{
  width:100%;
  height:100vh;
  background-image: url("../assets/img/404.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
