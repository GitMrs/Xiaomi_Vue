<template>
  <div class="ali-pay">
    <div class="form" v-html="content"></div>
    <Loading />
  </div>
</template>

<script>
import Loading from "../components/Loading";
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: ""
    };
  },
  mounted() {
    // console.log( this.$route.query)
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      // 支付宝对接
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "小米商城",
          amount: 0.01,
          payType: 1
        })
        .then(res => {
          this.content = res.content;
          setTimeout(() => {
            document.forms[0].submit();
          }, 1000);
        });
    }
  },
  components: {
    Loading
  }
};
</script>

<style>
</style>