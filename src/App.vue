<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /deep/ .el-form-item.is-success{
    .el-input__inner{
      border-color: #E5E5E5;
    }
  }
  /deep/ .el-form-item__label{
    &:before{
      margin-right: 4px;
      content: "*";
      color: rgba(250,250,250,0);
    }
  }
  /deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{
    color: #f56c6c;
  }
  /deep/ .el-form-item.is-success{
    .el-input__inner{
      border-color: #e5e5e5;
    }
  }
  /deep/ .el-form-item.is-error{
    .el-textarea__inner:focus{
      border-color: #e6e6e6;
    }
  }
}
</style>
