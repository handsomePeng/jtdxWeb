<template>
  <div class="sum-data">
    <el-row :gutter="20">
      <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-content">
          <p class="title closeSum">已结算总数</p>
          <div class="item-main">
            <span class="num">
              {{ sum.closeSum }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-content">
          <p class="title sumPay">累计已支出</p>
          <div class="item-main">
            <span class="num">
              {{ sum.sumPay }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-content">
          <p class="title unCloseSum">未结算总数</p>
          <div class="item-main">
            <span class="num">
              {{ sum.unCloseSum }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-content">
          <p class="title unClosePay">未结算支出</p>
          <div class="item-main">
            <span class="num">
              {{ sum.unClosePay }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-content">
          <p class="title shouldPay" v-if="sum.shouldPay >= 0">本期应支出</p>
          <p class="title shouldPay" v-else>本期可收入</p>
          <div class="item-main">
            <span class="num">
              {{ sum.shouldPay >= 0 ? sum.shouldPay : -(sum.shouldPay) }}
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "sumData",
    data () {
      return {
        sum: {
          'sumPay': undefined,
          "closeSum": undefined,
          "unCloseSum": undefined,
          "unClosePay": undefined,
          "shouldPay": 0
        }
      }
    },
    methods: {
      initData: function () {
        this.$axios.get(this.$api.queryTypeData).then(res =>{
          if (res.data.code == 1000) {
            this.sum = res.data.data
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
  .sum-data{
    padding-top: 20px;
    .item-content{
      margin-bottom: 20px;
      border-radius: 3px;
      overflow: hidden;
      .title{
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        font-weight: 700;
        &.closeSum{
          background-color: #5dd290;
        }
        &.sumPay{
          background-color: #6cc;
        }
        &.unCloseSum{
          background-color: #f66;
        }
        &.unClosePay{
          background-color: #8eb4fa;
        }
        &.shouldPay{
          background-color: #fbc06c;
        }
      }
      .item-main{
        height: 90px;
        background-color: #fafafa;
        text-align: center;
        .num{
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          text-align: center;
          line-height: 90px;
        }
      }
    }
  }
</style>
