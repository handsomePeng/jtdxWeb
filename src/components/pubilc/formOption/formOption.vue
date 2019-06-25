<template>
  <div class="form-option">
      <el-form  :inline="true" :form="params" label-position="left" size="small" label-width="72px">
        <el-form-item v-for="(item, index) in params" :key="index" :label="item.label" style="width: 316px;">
          <!--类型为input-->
          <el-input v-if="item.type == 'input'" v-model="item.value" clearable :placeholder="item.placeholder"></el-input>
          <!--类型为日期选择器-->
          <el-date-picker
            v-else-if="item.type == 'datePicker'"
            style="width: 243px;"
            v-model="item.value"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="item.pickerOptions"
            >
          </el-date-picker>
          <!--类型为下拉选择器-->
          <el-select v-else-if="item.type == 'select'" v-model="item.value" :placeholder="item.placeholder">
            <el-option v-for="(ele, i) in item.option" :key="i" :label="ele.name" :value="ele.value"></el-option>
          </el-select>
          <!--级联选择器-->
          <el-cascader
            v-else-if="item.type == 'cascader'"
            v-model="item.value"
            :options="item.option"
            ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="check-btn" @click="onSubmit">{{ submitBtnText }}</el-button>
          <el-button type="primary" size="large" plain v-if="isShowExport" @click="onExport">{{ exportText }}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
    name: "formOption",
    props:{
      //参数表单
      isExport: {
        type: Boolean,
        default: false
      },
      form: Array,
      submitText: {//搜索按钮的文字
        type: String,
        default: '查询'
      },
      exportBtnText: {
        type: String,
        default: '批量导出'
      }
    },
    data () {
      return {
        exportText: this.exportBtnText,
        isShowExport: this.isExport,
        submitBtnText: this.submitText,
        params: this.form,
        eLink: this.exportLink,
        /*[{
          type: 'input',
          label: '输入框',
          placeholder: '请输入内容',
          name: 'name',
          value: ''
        },{
          type: 'datePicker',
          label: '时间选择',
          pickerOptions:{},
          placeholder: '',
          name: 'date',
          value: 'date'
        },{
          type: 'select',
          label: '下拉选择',
          placeholder: '请选择',
          name: 'type',
          value: 'type',
          option:[{
            name: '下拉选择1',
            value: 1
          },{
            name: '下拉选择2',
            value: 2
          }]
        },{
          type: 'input',
          label: '输入框',
          placeholder: '请输入内容',
          name: 'name',
          value: ''
        },{
          type: 'datePicker',
          label: '时间选择',
          pickerOptions:{},
          placeholder: '',
          name: 'date',
          value: 'date'
        },{
          type: 'select',
          label: '下拉选择',
          placeholder: '请选择',
          name: 'type',
          value: 'type',
          option:[{
            name: '下拉选择1',
            value: 1
          },{
            name: '下拉选择2',
            value: 2
          }]
        }]*/
        value7: '',
        pickerOptions2: []
      }
    },
    methods: {
      onSubmit: function () {
        this.params.map((item, index) => {
          if (item.type == 'datePicker'){
            if (item.value == null){
              item.value = []
            }
          }
        })
        this.$emit('onSubmit',this.params)
      },
      onExport: function () {
        this.params.map((item, index) => {
          if (item.type == 'datePicker'){
            if (item.value == null){
              item.value = []
            }
          }
        })
        this.$emit('onExport',this.params)
      }
    }
  }
</script>

<style lang="scss" scoped>
.form-option{
  padding:15px 0;
    & /deep/ .el-input__inner{
      width: 243px;
      height: 36px;
      &:focus{
        border-color: #00c1de;
      }
    }
    /deep/ .el-form{
      margin-left: -100px;
      /deep/ .el-form-item__label{
        color: #666666;
        padding-right: 0;
        text-align: left;
        &:before{
          content: none !important;
          width: 0;
          height: 0;
          margin-right: 0;
        }
      }
      .el-form-item{
        margin-left: 100px;
        margin-right: 0;
        margin-bottom: 20px;
        & /deep/ .el-button{
          height: 36px;
          padding: 10px 20px;
        }
        .check-btn{
          width: 100px;
        }
        /deep/ .el-cascader--small{
          line-height: 36px;
        }
      }
    }
}
</style>
