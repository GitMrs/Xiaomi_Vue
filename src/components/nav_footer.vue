<template>
  <div>
    <div class="footer">
      <div class="footer_logo">
        <img src="/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
      </div>
      <div class="footer_link">
        <a href="javascript:;">河畔一角主页</a> <span>|</span>
        <a href="javascript:;">Vue全栈课程</a> <span>|</span>
        <a href="javascript:;">React全家桶课程</a> <span>|</span>
        <a href="javascript:;">微信支付专访项课程(H5+小程序)</a>
      </div>
      <div class="copyringright">
        Copryrigt @2019 <a href="javascript:;">mi.futurefe.com</a> All Rights Reserved!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'nav_footer',
}
</script>

<style lang="scss" scope>
@import '../assets/scss/config.scss';
  .footer{
    height: 234px;
    border-top: 1px solid $colorA;
    background-color: #333;
    font-size: 16px;
    text-align: center;
    color: #999;
    .footer_logo{
      margin: 46px 0 31px 0;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer_link{
      a{
        color: #999;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
    .copyringright{
      a{
        color: $colorA;
      }
    }
  }
</style>