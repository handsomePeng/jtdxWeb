<template>
  <div class="asideMenu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="2" @click="pushRouter('index')">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="3" @click="pushRouter('billList')">
        <i class="el-icon-document"></i>
        <span slot="title">账单列表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: "asideMenu",
    components: {

    },
    data () {
      return {

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      pushRouter: function (name) {
        this.$router.push({name: name})
      }

    }
  }
</script>

<style scoped lang="scss">
  .asideMenu{
    background-color: #545c64;
    /deep/ .el-menu{
      border-right-color: #545c64;
    }
  }
</style>
