<template>
  <div class="sign-up">
    <p class="title">景田大厦1007工作室</p>
    <el-form :model="user" label-position="left" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name" @focus="clearValidateField"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"  @focus="clearValidateField"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="user.checkPassword"  @focus="clearValidateField"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="submitForm('user')">注册</el-button>
        <el-button class="btn" @click="pushRouter">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "signUp",
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPassword !== '') {
            this.$refs.user.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          name: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'submit' },

          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'submit' },
            { min: 6, message: '密码最少为6位', trigger: 'submit' },
            { validator: validatePass, trigger: 'submit' }
          ],
          checkPassword: [
            { required: true, message: '请输入确认密码', trigger: 'submit' },
            { validator: validatePass2, trigger: 'submit' }
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$api.signUp, qs.stringify(this.user)).then(res => {
              console.log(res)
              if (res.data.code == 1000){
                this.$notify({
                  title: '成功',
                  message: '用户信息注册成功',
                  type: 'success'
                })
                this.$router.push({name: 'login'})
              }
            })
          } else {
            return false
          }
        })
      },
      pushRouter () {
        this.$router.push({name: 'login'})
      },
      //移除表单验证效果
      clearValidateField () {
        this.$refs['user'].clearValidate()
      },
    }
  }
</script>

<style scoped lang="scss">
.sign-up{
  width: 400px;
  margin: 0 auto;
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
</style>
