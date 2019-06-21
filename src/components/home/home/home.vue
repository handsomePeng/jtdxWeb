<template>
  <div class="home">
    <div class="module-main">
      <div class="module-top">
        <p class="module-title">数据汇总</p>
        <el-button type="text" class="create"  @click="openCreateMask">新建账单</el-button>
        <el-button type="text" class="close"  @click="openConfirmMask">结算账单</el-button>
      </div>
      <div class="module-content">
        <sum-data v-if="isShowSumData"></sum-data>
      </div>
    </div>
    <createBillMask
      v-if="isShowCreateMask"
      v-on:cancel="closeCreateMask"
      v-on:submit="reFleshSumData"
    ></createBillMask>
    <confirmMask
      title="确定结算当前所有未结算账单吗？"
      v-if="isShowConfirmMask"
      v-on:cancel="closeConfirmMask"
      v-on:next="closeBills"
    ></confirmMask>
  </div>
</template>

<script>
  import sumData from './../sumData/sumData'
  import createBillMask from './../../pubilc/createBillMask/createBillMask'
  import confirmMask from './../../pubilc/confirmMask/confirmMask'
  export default {
    name: "home",
    components: {
      sumData: sumData,
      createBillMask: createBillMask,
      confirmMask: confirmMask,
    },
    data () {
      return {
        isShowCreateMask: false,
        isShowConfirmMask: false,
        isShowSumData: true

      }
    },
    methods: {
      closeCreateMask: function () {
        this.isShowCreateMask = false
      },
      openCreateMask: function () {
        this.isShowCreateMask = true
      },
      reFleshSumData: function () {
        this.isShowSumData = false
        this.$nextTick(() => (this.isShowSumData = true))
      },
      closeConfirmMask: function () {
        this.isShowConfirmMask = false
      },
      openConfirmMask: function () {
        this.isShowConfirmMask = true
      },
      closeBills: function () {
        this.$axios.post(this.$api.billsClose).then(res => {
          if (res.data.code == 1000) {
            this.$notify({
              title: '成功',
              message: '结算成功',
              type: 'success'
            })
            this.reFleshSumData()
          }
          this.closeConfirmMask()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .module-main{
    background-color: #ffffff;
    padding: 0 20px;
    border-radius: 3px;
    .module-top{
      height: 42px;
      border-bottom: 1px solid #e5e5e5;
      .module-title{
        line-height: 42px;
        font-size: 14px;
        color: #333333;
        float: left;
        text-align: left;
      }
    }
    .close{
      float: right;
      margin-right: 20px;
    }
    .create{
      float: right;
    }

  }
</style>
