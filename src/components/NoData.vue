<template>
  <div class="No-data">
    <img src="/imgs/icon-no-data.png" alt />
    <p>当前暂无订单提交记录</p>
  </div>
</template>

<script>
export default {
  name: "no-data"
};
</script>

<style lang='scss'>
.No-data {
  text-align: center;
  font-size: 20px;
  color: #999;
  margin: 50px 0;
  img {
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
}
</style>