<template>
  <div class="cart">
    <OrderHeader title="我的购物车">
      <template v-slot:tips>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span @click="toggleAll" class="checkbox" :class="{'checked':allCheck}"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li></li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in cartProductInfo" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{'checked':item.productSelected}"
                  @click="updateProduct(item)"
                ></span>
              </div>
              <div class="item-name">
                <img :src="item.productMainImage" alt />
                <span>{{item.productName}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateProduct(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateProduct(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共
            <span>{{cartProductInfo.length}}</span>件商品，已选择
            <span>{{selectNum}}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{totalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <ServiceBar />
    <NavFooter />
  </div>
</template>

<script>
import OrderHeader from "../components/order_header";
import ServiceBar from "../components/seeverBar";
import NavFooter from "../components/nav_footer";
import { Message } from "element-ui";
export default {
  name: "cart",
  data() {
    return {
      cartProductInfo: [],
      allCheck: false,
      totalPrice: 0,
      totalNum: 0
    };
  },
  components: {
    NavFooter,
    ServiceBar,
    OrderHeader
  },
  mounted() {
    this.getCartInfo();
  },
  computed: {
    selectNum() {
      return this.cartProductInfo.filter(item => item.productSelected).length;
    }
  },
  methods: {
    //获取数据
    getCartInfo() {
      this.axios.get("/carts").then(res => this.resetData(res));
    },
    //去换全选
    toggleAll() {
      let url = this.allCheck ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then(res => this.resetData(res));
    },
    //订单
    order() {
      //判断没有选中的
      let isCheck = this.cartProductInfo.every(item => !item.productSelected);
      if (isCheck) {
        Message.info("请选择一件商品");
        return false;
      }
      this.$router.push("/order/confirm");
    },
    //更新状态
    updateProduct(item, type) {
      let quantity = item.quantity;
      let selected = item.productSelected;
      if (type === "-") {
        if (quantity === 1) {
          this.$message.warning("不能少于一");
          return false;
        }
        --quantity;
      } else if (type === "+") {
        if (quantity > item.productStock) {
          Message.warning("不能大于库存数量");
          return false;
        }
        ++quantity;
      } else {
        selected = !item.productSelected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          selected,
          quantity
        })
        .then(res => this.resetData(res));
    },
    //删除
    delProduct(item) {
      this.axios
        .delete(`/carts/${item.productId}`)
        .then(res => this.resetData(res));
      Message.warning("删除成功！");
    },
    //重置数据
    resetData(res) {
      this.cartProductInfo = res.cartProductVoList;
      this.allCheck = res.selectedAll;
      this.totalPrice = res.cartTotalPrice;
      this.totalNum = res.cartTotalQuantity;
    }
  }
};
</script>

<style lang="scss" scope>
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-guo.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>