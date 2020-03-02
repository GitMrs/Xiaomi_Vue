<template>
  <div class="Home">
    <NavHeader />
    <router-view></router-view>
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from '../components/nav_header';
import NavFooter from '../components/nav_footer';
export default {
  name:'Home',
  components:{
    NavHeader,
    NavFooter,
  }
}
</script>

<style>

</style>