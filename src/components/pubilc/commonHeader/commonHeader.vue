<template>
  <div class="header">
    <div class="system-name">景田大厦1007工作室</div>
    <div class="user-info">
      <span class="user-name">当前账号：{{ user.name }}</span>
      <span class="user-line">|</span>
      <a href="javascript:;" @click="signOut" class="user-signOut">退出登录</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commonHeader",
    data () {
      return {
        user: {
          name: undefined
        }
      }
    },
    methods: {
      initData () {
        this.$axios.get(this.$api.getUserInfo).then(res => {
          if (res.data.code == 1000){
            this.user = res.data.data
          }
        })
      },
      signOut: function () {
        this.$axios.get(this.$api.signOut).then(res => {
          if (res.data.code == 1000) {
            this.$notify({
              title: '成功',
              message: '登出成功',
              type: 'success'
            })
            this.$router.push({name: 'login'})
          }
        })
      }
    },
    created: function () {
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
.header{
  height: 60px;
  .system-name{
    float: left;
    font-size: 14px;
    color: #333333;
    line-height: 60px;
  }
  .user-info{
    float: right;
    line-height: 60px;
    .user-name{
      font-size: 14px;
    }
    .user-line{
      margin: 0 8px;
      font-size: 14px;
    }
    .user-signOut{
      font-size: 14px;
      text-decoration: none;
      color: #333333;
      &:hover{
        color: #00c1de;
      }
    }
  }
}
</style>
