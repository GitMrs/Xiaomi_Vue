<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex"; // 使用mapActions
export default {
  name: "App",
  components: {},
  mounted() {
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    ...mapActions(["saveUserName"]),
    getUser() {
      const userId = this.$cookie.get("userId");
      console.log(userId);
      this.axios.get("/user").then((res = {}) => {
        //todo
        // this.$store.dispatch("saveUserName", res.username);
        this.saveUserName(res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then(res => {
        this.$store.dispatch("getCartCount", res);
      });
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
@import "./assets/scss/button.scss";
</style>
