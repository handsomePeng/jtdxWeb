<template>
  <div class="mask" >
    <div class="center">
      <div class="title">{{ content }}</div>
      <div class="btn-box clearfix">
        <a href="javascript:;" class="yes" @click="submit">确定</a>
        <a href="javascript:;" class="no" @click="cancel">取消</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'confirmMask',
    props: {
      title: {
        type: String,
        default: '确定进行下一步操作吗？'
      }
    },
    data() {
      return {
        content: this.title
      };
    },
    methods: {
      cancel () {
        this.$emit("cancel");
      },
      submit () {
        this.$emit("next");
      }
    }
  };
</script>
<style lang="scss" scoped>
  .center {
    width: 400px;
    min-height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 50px 0px 40px;
    box-sizing: border-box;
    .title {
      padding: 0 20px;
      min-height: 60px;
      line-height: 24px;
      letter-spacing: 1px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
    }
    .btn-box {
      height: 36px;
      width: 200px;
      margin: 20px auto 0;
      & > a {
        display: block;
        width: 80px;
        height: 36px;
        border-radius: 3px;
        text-align: center;
        line-height: 36px;
        top: 0;
        text-decoration: none;
      }
      .yes {
        float: left;
        font-size: 14px;
        background: #00c1de;
        border: 1px solid #00c1de;
        border-radius: 3px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #ffffff;
      }
      .no {
        float: right;
        width: 80px;
        height: 36px;
        font-size: 14px;
        background: rgba(245, 245, 245, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 3px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
</style>


