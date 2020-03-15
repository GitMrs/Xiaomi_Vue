<template>
  <div class="orderHeader">
    <div class="container clearfix">
      <div class="header_logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>{{title}}</h2>
        <slot name="tips"></slot>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "orderHeader",
  props: {
    title: String
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>

<style lang='scss' scope>
.orderHeader {
  height: 112px;
  box-sizing: border-box;
  padding: 29px 0;
  border-bottom: 2px solid #ff6600;

  .header_logo {
    float: left;
  }
  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    font-size: 28px;
    float: left;
    font-weight: bold;
    margin-left: 54px;
    h2 {
      font-size: 28px;
      color: #333;
      display: inline-block;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999;
      font-weight: 200;
    }
  }
  .username {
    float: right;
    a {
      color: #333;
    }
  }
}
</style>