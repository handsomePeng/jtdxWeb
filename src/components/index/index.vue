<template>
  <el-container>
    <el-aside width="200px">
      <asideMenu></asideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <commonHeader></commonHeader>
      </el-header>
      <el-main>
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
  }
  /deep/ .el-main{
    background-color: #f0f1f5;
  }
</style>
