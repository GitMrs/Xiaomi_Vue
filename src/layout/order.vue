<template>
  <div class="Home">
    <OrderHeader :title="title">
      <template v-slot:tips>
        <span>{{tips}}</span>
      </template>
    </OrderHeader>
    <router-view></router-view>
    <ServiceBar />
    <NavFooter />
  </div>
</template>

<script>
import OrderHeader from "../components/order_header";
import NavFooter from "../components/nav_footer";
import ServiceBar from "../components/seeverBar";
export default {
  name: "Home",
  data() {
    return {
      title: "",
      tips: ""
    };
  },
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  mounted() {
    let path = this.$route.path;
    this.reseTitle(path);
  },
  methods: {
    reseTitle(path) {
      if (path === "/order/confirm") {
        this.title = "订单确认";
        this.tips = "请认真填写收货地址";
      } else if (path === "/order/list") {
        this.title = "订单列表";
        this.tips = "谨慎防钓鱼连接和诈骗电话，了解更多>";
      } else if (path === "/order/pay") {
        this.title = "订单支付";
        this.tips = "谨慎防钓鱼连接和诈骗电话，了解更多>";
      }else{
        this.title = "订单支付";
        this.tips = "谨慎防钓鱼连接和诈骗电话，了解更多>";
      }
    }
  },
  watch: {
    ["$route.path"](val) {
      this.reseTitle(val);
    }
  }
};
</script>

<style>
</style>