<template>
  <div class="header">
    <div class="nav_top_bar">
      <div class="container">
        <div class="top_bar_menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="top_bar_user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="/#/login" v-if="!username">登录</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" class="mycard">
            <span class="icon-card"></span>
            购物车({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav_header">
      <div class="container">
        <div class="header_logo">
          <a href="/#/index"></a>
        </div>
        <div class="header_menu">
          <div class="item_menu">
            <span>小米手机</span>
            <div class="chidren">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/product/'+ item.id" target="_blank">
                    <div class="pro_img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro_name">{{item.name}}</div>
                    <div class="pro_price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item_menu">
            <span>红米手机</span>
            <div class="chidren"></div>
          </div>
          <div class="item_menu">
            <span>电视</span>
            <div class="chidren"></div>
          </div>
        </div>
        <div class="header_search">
          <div class="wraper">
            <input type="text" name="keyword" />
            <a href="javascript:;" class></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 使用mapState
export default {
  name: "nav_header",
  data() {
    return {
      phoneList: []
    };
  },
  mounted() {
    this.getProductList();
  },
  computed: {
    ...mapState(["username", "cartCount"])
    // username() {
    //   return this.$store.state.username;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // }
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2) + "元";
    }
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012"
            // pageSize:6
          }
        })
        .then(res => {
          if (res.list.length > 6) {
            this.phoneList = res.list.slice(0, 6);
          } else {
            this.phoneList = res.list;
          }
        });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  .nav_top_bar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .mycard {
        width: 110px;
        background-color: $colorA;
        text-align: center;
        color: #fff;
        .icon-card {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav_header {
    .container {
      height: 112px;
      @include flex();
      position: relative;
      .header_logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: $colorA;
        /* overflow: hidden; */
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-logo.png", 55px);
            transition: margin 0.2s;
          }
          &:after {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-home.png", 55px);
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin 0.2s;
          }
        }
      }
      .header_menu {
        display: inline-block;
        padding-left: 209px;
        width: 643px;
        .item_menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .chidren {
              height: 220px;
              opacity: 1;
              transition: height 0.2s;
            }
          }
          .chidren {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            background-color: #ffffff;
            .product {
              float: left;
              width: 16.6%;
              height: 220px;
              line-height: 12px;
              text-align: center;
              position: relative;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 20px;
              }
              .pro_img {
                height: 137px;
              }
              .pro_name {
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro_price {
                color: $colorA;
              }
              &::before {
                position: absolute;
                content: "";
                top: 28px;
                right: 0;
                border-left: 1px solid #d7d7d7;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }
      .header_search {
        width: 319px;
        .wraper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            height: 100%;
            box-sizing: border-box;
            border: none;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 18px;
          }
        }
      }
    }
  }
}
</style>