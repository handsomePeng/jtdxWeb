<template>
  <div class="mask">
    <div class="center">
      <div class="title-box clearfix">
        <span class="title">新建账单</span>
        <i class="el-icon-close close" @click="onCancel"></i>
      </div>
      <div class="mask-content">
        <el-form ref="form" :model="form"  :rules="rules" label-position="left" label-width="100px">
          <el-form-item label="账单金额" prop="num">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item label="花费日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="账单分担" prop="sharer">
            <el-checkbox-group v-model="form.sharer">
              <el-checkbox :label="item.name" name="sharer" :key="index" v-for="(item, index) in userList">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="账单备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <div class="btn-box">
            <el-button type="primary" class="btn" @click="onSubmit('form')">确定</el-button>
            <el-button class="btn cancel-btn" @click="onCancel">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "createBillMask",
    data () {
      var isFloatNumber = (val) => {
        let exp = new RegExp('^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{0,2})?$')
        return exp.test(val)
      };
      var checkMoney = (rule, value, callback) => {
        if (!isFloatNumber(value)) {
          callback(new Error('请输入数字值(最多可保留小数点后两位)'));
        } else {
          callback();
        }
      };
      return {
        form: {
          num: undefined,
          date: undefined,
          sharer: [],
          remark: undefined
        },
        rules: {
          num: [{required: true, message: '账单金额不能为空！', trigger: 'submit' },
            {validator: checkMoney, trigger: 'submit' }],
          date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
          sharer: [{ type: 'array', required: true, message: '请至少选择一个账单分担者', trigger: 'submit' }]
        },
        userList: []
      }
    },
    methods: {
      onCancel: function () {
        this.$emit('cancel')
      },
      onSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {}
            params.num = this.form.num
            params.date = this.form.date
            params.remark = this.form.remark
            params.sharer = this.form.sharer.join(',')
            this.$axios.post(this.$api.billsAdd, qs.stringify(params)).then(res => {
              if (res.data.code == 1000) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                })
                this.$emit('submit')
              }
              this.$emit('cancel')
            })
          } else {
            return false
          }
        })
      },
      //移除表单验证效果
      clearValidateField () {
        this.$refs['user'].clearValidate()
      },
      getUserList: function () {
        this.$axios.get(this.$api.getUserList).then(res => {
          if (res.data.code == 1000){
            this.userList = res.data.data
            let defaultSharer = []
            this.userList.map((item, index) =>{
              defaultSharer.push(item.name)
            })
            this.$set(this.form, 'sharer', defaultSharer)
          }
        })
      }
    },
    created: function () {
      this.getUserList()
    }
  }
</script>

<style scoped lang="scss">
  .center{
    width: 600px;
    height: 500px;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 50%;
    margin-top: -250px;
    .mask-content{
      padding: 40px 70px;
      text-align: left;
      /deep/ .el-form-item{
        margin-bottom: 30px;
      }
      .el-textarea{
        height: 86px;
        /deep/ .el-textarea__inner{
          padding: 12px;
          resize: none;
          height: 86px;
          border-radius: 3px;
          box-sizing: border-box;
        }
      }
      .btn-box{
        text-align: center;
        .btn{
          width: 100px;
        }
        .cancel-btn{
          margin-left: 40px;
        }
      }

    }
  }
</style>
