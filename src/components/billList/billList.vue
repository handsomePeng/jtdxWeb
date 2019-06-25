<template>
  <div class="content">
    <p class="content-title">账单列表</p>
    <div class="option">
      <formOption
        :form="params"
        v-on:onSubmit="getParams"
      ></formOption>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="headerCellStyle"
        :cell-style="{'border': '0px','font-size': '14px'}"
        style="width: 100%">
        <el-table-column
          fixed="left"
          prop="payer"
          label="支付人"
          align="center"
          header-align="center"
          min-width="94">
        </el-table-column>
        <el-table-column
          align="center"
          label="承担人"
          prop="sharer"
          show-overflow-tooltip
          min-width="120">
          <template slot-scope="scope">
            <span> {{ scope.row.sharer.join(',') }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          show-overflow-tooltip
          label="备注"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="changer"
          show-overflow-tooltip
          label="结算人"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="花费时间"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          show-overflow-tooltip
          label="状态"
          align="center"
          min-width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.status">已结算</p>
            <p v-else>未结算</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="operator"
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditMask(scope.row)">修改</el-button>
            <el-button type="text" class="delete" @click="showDeleteMask(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--底部分页-->
    <div class="content-footer clearfix">
      <div class="page-box fr">
        <el-pagination
          background
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import formOption from './../pubilc/formOption/formOption'
  export default {
    name: "billList",
    components: {
      formOption
    },
    data () {
      return {
        form: {
          payer: undefined,
          sharer: undefined,
          changer: undefined,
          remark: undefined,
          startTimes: undefined,
          endTimes: undefined,
          status: undefined
        },
        tableData: [],
        pageSize: 10,
        currPage: 1,
        total: 0,
        // 表头样式
        headerCellStyle: {
          'border-top': '1px solid #ebeef5',
          'font-size': '14px',
          'font-weight': 'Bold',
          color: '#666666'
        },
        //查询参数组件的参数
        params: [{
          type: 'input',
          label: '支付人',
          placeholder: '',
          name: 'payer',
          value: ''
        },{
          type: 'input',
          label: '承担人',
          placeholder: '',
          name: 'sharer',
          value: ''
        },{
          type: 'input',
          label: '备注',
          placeholder: '',
          name: 'remark',
          value: ''
        },{
          type: 'input',
          label: '结算人',
          placeholder: '',
          name: 'changer',
          value: ''
        },{
          type: 'select',
          label: '状态',
          placeholder: '请选择',
          name: 'status',
          value: '',
          option:[{
            name: '全部',
            value: undefined
          },{
            name: '已结算',
            value: true
          },{
            name: '未结算',
            value: false
          }]
        },{
          type: 'datePicker',
          label: '花费时间',
          pickerOptions:{},
          placeholder: '',
          name: 'date',
          value: ''
        }],
      }
    },
    methods: {
      //搜索数据
      searchData: function () {
        let params = {...this.form}
        this.$axios.post(this.$api.queryBillList, qs.stringify({...params})).then(res => {
          if (res.data.code == 1000){
            this.tableData = res.data.data
            this.total = res.data.total
            this.currPage = res.data.currPage
            this.pageSize = res.data.pageSize
          }
        })
      },
      //分页请求数据
      updateData: function () {
        let params = {...this.form}
        params.currPage = this.currPage
        params.pageSize = this.pageSize
        this.$axios.post(this.$api.queryBillList, qs.stringify({...params})).then(res => {
          if (res.data.code == 1000){
            this.tableData = res.data.data
          }
        })
      },
      //获取商品订单查询参数(点击查询)
      getParams: function (data) {
        data.map((item, index) => {
          //如果是日期类型，是一个数组，需要拆分成两个参数
          if (item.type == 'datePicker') {
            this.form['startTimes'] = item.value[0]
            this.form['endTimes'] = item.value[1]
          } else {
            this.form[item.name] = item.value
          }
        })
        this.searchData()
      },
      //调整每页条数
      handleSizeChange: function (val) {
        this.pageSize = val
        this.updateData()
      },
      //跳转至某页
      handleCurrentChange: function (val) {
        this.currPage = val
        this.updateData()
      },
    },
    created: function () {
      this.searchData()
    }
  }
</script>

<style scoped lang="scss">
  .content{
    padding: 0 30px 30px;
    border-radius: 3px;
    background-color: #ffffff;
    .content-title{
      text-align: left;
      height: 43px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      line-height: 42px;
      font-size: 14px;
      color: #666666;
    }
    .option{
      margin-top: 10px;
      text-align: left;
    }
    .content-footer{
      margin-top: 40px;
      padding:0 30px;
      text-align: right;
      .select-box{
        padding-left: 30px;
        .el-button{
          margin-left: 30px;
          width: 80px;
          height: 30px;
          padding: 7px 20px;
        }
      }
    }
  }
</style>
