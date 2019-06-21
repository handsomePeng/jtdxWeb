<template>
  <div class="main">
    <p class="title">景田大厦1007工作室</p>
    <el-form :model="user" label-position="left" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name" @focus="clearValidateField"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"  @focus="clearValidateField"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="submitForm('user')">登录</el-button>
        <el-button class="btn" @click="pushRouter">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs'
export default {
  data () {
    return {
      user: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'submit' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'submit' },
          { min: 6, message: '密码最少为6位', trigger: 'submit' }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api.login, qs.stringify(this.user)).then(res => {
            console.log(res)
            if (res.data.code == 1000){
              this.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success'
              })
              this.$router.push({name: 'index'})
            }
          })
        } else {
          return false
        }
      })
    },
    pushRouter () {
      this.$router.push({name: 'signUp'})
    },
    //移除表单验证效果
    clearValidateField () {
      this.$refs['user'].clearValidate()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main{
    width: 400px;
    margin: 0 auto;
    /deep/ .el-form-item{
      margin-bottom: 30px;
    }
    .title{
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      height: 50px;
      line-height: 50px;
      margin-bottom: 200px;
    }
    .btn{
      width: 100px;
    }
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
