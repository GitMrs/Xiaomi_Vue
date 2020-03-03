<template>
  <div class="Home">
    <OrderHeader />
    <router-view></router-view>
    <NavFooter />
  </div>
</template>

<script>
import OrderHeader from '../components/order_header';
import NavFooter from '../components/nav_footer';
export default {
  name:'Home',
  components:{
    OrderHeader,
    NavFooter
  }
}
</script>

<style>

</style>