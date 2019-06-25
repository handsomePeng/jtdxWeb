<template>
  <el-container>
    <el-aside width="200px" style="position: fixed;left: 0;top: 0;z-index: 2;">
      <asideMenu></asideMenu>
    </el-aside>
    <el-container>
      <el-header style="position: fixed;top: 0;right: 0;width: 100%;padding-left: 220px;z-index: 1;">
        <commonHeader></commonHeader>
      </el-header>
      <el-main style="padding-left: 220px;padding-top: 80px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import asideMenu from '../pubilc/asideMenu/asideMenu'
  import commonHeader from '../pubilc/commonHeader/commonHeader'
  export default {
    name: "index",
    components: {
      asideMenu: asideMenu,
      commonHeader: commonHeader
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-aside{
    height: 100vh;
    background-color: rgb(84, 92, 100);
    overflow: hidden;
  }
  /deep/ .el-header{
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
  }
  /deep/ .el-main{
    background-color: #f0f1f5;
    min-height: 100vh;
  }
</style>
