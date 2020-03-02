<template>
  <div class="nav-bar" ref="nav_bar" :class="{'is_Fiexed': isFiexed}">
    <div class="container">
      <div class="pro-title">{{name}}</div>
      <div class="pro-params">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "parduct_nav",
  props:{
    name:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      isFiexed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.isFiexed = scrollTop > 152 ? true : false;
    }
  },
  destroyed(){
    window.removeEventListener('scroll',this.initHeight,false);
  }
};
</script>

<style lang='scss' scope>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.nav-bar {
  height: 70px;
  font-size: $fontH;
  line-height: 70px;
  width: 100%;
  background: #fff;
  &.is_Fiexed {
    position: fixed;
    top:0;
    box-shadow: 0 1px 5px #ccc;
    z-index: 9;
  }
  .container {
    @include flex();
    .pro-title {
      color: #333;
      font-weight: bold;
    }
    .pro-params {
      a {
        display: inline-block;
        color: $colorC;
        font-size: 16px;
        &:last-of-type {
          margin-right: 11px;
        }
      }
      span {
        display: inline-block;
        margin: 0 10px;
      }
    }
  }
}
</style>