<template>
  <div class="Home">
    <OrderHeader />
    <router-view></router-view>
    <OrderFooter />
  </div>
</template>

<script>
import OrderHeader from '../components/order_header';
import OrderFooter from '../components/order_footer';
export default {
  name:'Home',
  components:{
    OrderHeader,
    OrderFooter
  }
}
</script>

<style>

</style>