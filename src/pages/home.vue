<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">
                手机 电话卡
                <div class="children">
                  <ul v-for="(item,index) in menuList" :key="index">
                    <li v-for="(sub,_index) in item" :key="_index">
                      <a :href="'/#/product/' + (sub.id ?sub.id : 0)">
                        <img  v-lazy="sub ? sub.img :'/imgs/item-box-1.png'" alt />
                        {{sub ? sub.name : '小米9'}}
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 拆线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiperSlide v-for="(item,index) in swiperList" :key="index">
            <a :href="'/#/product/' + item.id">
              <img  v-lazy="item.img" />
            </a>
          </swiperSlide>
          <!-- optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a :href="'/#/product/80'">
          <img  v-lazy="'/imgs/banner-1.png'" />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/11">
              <img  v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(item,index) in phoneList" :key="index">
              <div class="item" v-for="(sub,_index) in item" :key="_index">
                <span class="new-pro">新品</span>
                <div class="item-img">
                  <img  v-lazy="'/imgs/item-box-1.png'" alt />
                </div>
                <div class="item-info">
                  <h3>小米9</h3>
                  <p>为发烧而生</p>
                  <p class="price" @click="addCart">2999元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SearchBar />
    <Modal
      title="提示"
      sureText="查看购物车"
      :btnType='1'
      modalType="middle"
      :showModal="showModal"
      @submit="submit"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </Modal>
  </div>
</template>

<script>
import SearchBar from "../components/seeverBar";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Modal from "../components/modal";
import "swiper/dist/css/swiper.css";
export default {
  name: "index",
  data() {
    return {
      swiperOption: {
        auto: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "47",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "48",
          img: "/imgs/slider/slide-5.jpg"
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版"
          },
          {
            id: 32,
            img: "/imgs/item-box-3.jpg",
            name: "RedMi K20 Pro"
          },
          {
            id: 33,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: "33",
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: "48",
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: "45",
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: "47",
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      phoneList: [
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ],
      showModal: false
    };
  },
  mounted() {
    // console.log(this.axios.baseURL)
    // this.axios({
    //   method:'get',
    //   url:'/user/login',
    //   params:{name:'111'}
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    addCart() {
      this.showModal = true;
    },
    submit() {}
  },
  components: {
    SearchBar,
    swiper,
    swiperSlide,
    Modal
  }
};
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.index {
  .swiper-box {
    position: relative;

    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      box-sizing: border-box;
      left: 0;
      top: 0;
      z-index: 9;
      padding: 26px 0;
      background-color: rgba(85, 88, 90, 0.5);
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            display: block;
            color: #fff;
            font-size: 16px;
            padding-left: 30px;
            position: relative;

            &::after {
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
              content: "";
              position: absolute;
              right: 30px;
              top: 17.5px;
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            width: 962px;
            height: 451px;
            background: #fff;
            position: absolute;
            display: none;
            top: -26px;
            left: 264px;
            border: 1px solid #e5e5e5;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: #333;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin: 14px 0 31px 0;
    a {
      height: 167px;
      width: 296px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner {
    margin-bottom: 50px;
    img {
      width: 100%;
    }
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              margin: 10px 0;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: 10px;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 6px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>