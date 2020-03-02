<template>
  <div class="product">
    <ProductParam :name="pruductInfo.name">
      <template v-slot:buy>
        <button href class="btn" @click="buyFn">立即购买</button>
      </template>
    </ProductParam>
    <div class="content">
      <div class="item-bg">
        <h2>{{pruductInfo.name}}</h2>
        <h3>{{pruductInfo.subtitle}}</h3>
        <p>
          <a href="javascript:;">全球首款双频 GP</a>
          <span>|</span>
          <a href="javascript:;">骁龙845</a>
          <span>|</span>
          <a href="javascript:;">AI 变焦双摄</a>
          <span>|</span>
          <a href="javascript:;">红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>1999</em>
          </span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper>
          <swiper-slide>
            <img src="/imgs/product/gallery-1.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt />
          </swiper-slide>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>
          60帧超慢动作摄影
          <br />慢慢回忆每一瞬间的精彩
        </h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
          <br />
        </p>
        <!-- keyform -->
        <!-- <div class="video-box" @click="keyframes = 'slideDown'">
          <div class="overlay" v-if="keyframes === 'slideDown'"></div>
          <div class="video" :class="keyframes">
            <span class="icon-close" @click.stop.prevent="keyframes = 'slideUp'"></span>
            <video src="/imgs/product/video.mp4" controls="controls" muted autoplay></video>
          </div>
        </div> -->
        <!-- transition -->
        <div class="video-box" @click="showSlider = true">
          <div class="overlay" v-if="showSlider"></div>
          <div class="video" :class="{'slider': showSlider}">
            <span class="icon-close" @click.stop.prevent="closeVideo"></span>
            <video src="/imgs/product/video.mp4" controls="controls" muted autoplay></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from "../components/productParam";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "product",
  data() {
    return {
      showSlider: false,
      keyframes: "",
      pruductInfo:{}
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    closeVideo() {
      this.showSlider = false;
    },
    getProduct() {
      const { id } = this.$route.params;
      console.log(id)
      this.axios.get(`/products/${id}`).then(res => {
        this.pruductInfo = res
        console.log(res);
      });
    },
    buyFn(){
      this.$router.push(`/detail/${this.pruductInfo.id}`)
    }
  },
  components: {
    ProductParam,
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.product {
  .content {
    .item-bg {
      background: url("/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        line-height: 16px;
        a {
          font-size: 16px;
          color: #333;
        }
        span {
          margin: 2px 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url("/imgs/product/product-bg-2.png") no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url("/imgs/product/product-bg-3.png") no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333;
        text-align: center;
      }
      img {
        width: 100%;
        height: 800px;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #707078;
      margin-bottom: 76px;
      color: #fff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-box {
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
        .overlay {
          @include position(fixed);
          z-index: 10;
          background-color: rgba($color: #000000, $alpha: 0.6);
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate3D(-50%, -50%, 0);
          z-index: 11;
          width: 1000px;
          height: 536px;
          opacity: 0;
          transition: all 0.6s; //transition 动画
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            outline: none;
          }
          .icon-close {
            @include bgImg(12px, 12px, "/imgs/icon-close.png");
            position: absolute;
            top: 0px;
            right: 10px;
            cursor: pointer;
            z-index: 12;
          }
          // transition 动画
          &.slider {
            top: 50%;
            opacity: 1;
          }
          &.slideDown {
            animation: sliderDown 0.6s linear forwards;
          }
          &.slideUp {
            animation: sliderUp 6s linear forwards;
          }
          @keyframes sliderDown {
            form {
              top: -50%;
              opacity: 0;
            }
            to {
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes sliderUp {
            form {
              top: 50%;
              opacity: 1;
            }
            to {
              top: -50%;
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>