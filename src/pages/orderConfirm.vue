<template>
  <div class="orderconfirm">
    <div class="wrapper">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
      >
        <defs>
          <symbol id="icon-add" viewBox="0 0 31 32">
            <title>add</title>
            <path
              d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
              class="path1"
            />
          </symbol>
          <symbol id="icon-edit" viewBox="0 0 32 32">
            <title>edit</title>
            <path
              d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
              class="path1"
            />
          </symbol>
          <symbol id="icon-del" viewBox="0 0 32 32">
            <title>delete</title>
            <path
              d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
              class="path1"
            />
            <path
              d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path2"
            />
            <path
              d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path3"
            />
            <path
              d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path4"
            />
          </symbol>
        </defs>
      </svg>
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                v-for="(item,index) in list"
                :key="index"
                :class="{'checked':index === activeIndex}"
                @click="changeAddrInfo(index)"
              >
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{item.receiverDistrict + item.receiverAddress}}</div>
                <div class="action">
                  <a href="javascript:;" @click="deleAddr(item)" class="fl">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del" />
                    </svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="openEditModal(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-edit" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddreeModal">
                <div class="icon-add"></div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img :src="item.productMainImage" alt />
                  <span>{{item.productName}}</span>
                </div>
                <div class="good-price">{{item.productPrice * item.quantity}}</div>
                <div class="good-total">{{item.quantity}}</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="是否确认删除"
      :btnType="3"
      :showModal="showModal"
      @cancel="showModal =false"
      @submit="submitAddree"
    >
      <template v-slot:body>
        <p>您确认要删除改地址吗？</p>
      </template>
    </modal>
    <modal
      title="新增确认"
      :btnType="3"
      :showModal="showEditModal"
      @cancel="showEditModal =false"
      @submit="submitAddree"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkItem.receiverName" />
            <input type="text" class="input" placeholder="手机号" v-model="checkItem.receiverMobile" />
          </div>
          <div class="item">
            <select name="province" v-model="checkItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="distict" v-model="checkItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkItem.receiverZip" />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/modal.vue";
export default {
  name: "orderconfirm",
  data() {
    return {
      activeIndex: 0,
      list: [], //收货地址列表
      cartList: [], //购物车结算列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      checkItem: {}, // 选中项
      userAction: "", // 用户的行为 1：新增 2：编辑 3：删除
      showModal: false, // 删除弹框
      showEditModal: false // 编辑弹框
    };
  },
  methods: {
    orderSubmit() {
      let item = this.list[this.activeIndex];
      if (!item) {
        this.$message.error("选选择收货地址");
        return false;
      }
      this.axios
        .post("/orders", {
          shippingId: item.id
        })
        .then(res => {
          this.$router.push({
            path: "/order/pay",
            query: {
              orderNo: res.orderNo
            }
          });
        });
    },
    changeAddrInfo(index) {
      this.activeIndex = index;
    },
    getAddrList() {
      this.axios.get("/shippings").then(res => {
        this.list = res.list;
      });
    },
    getCartList() {
      this.axios.get("/carts").then(res => {
        let list = res.cartProductVoList;
        this.cartTotalPrice = res.cartTotalPrice;
        this.cartList = list.filter(item => item.productSelected); // 获取到选中结算的商品
        list.map(item => {
          this.count += item.quantity;
        });
      });
    },
    deleAddr(item) {
      this.checkItem = item;
      this.userAction = 3;
      this.showModal = true;
    },
    openAddreeModal() {
      this.showEditModal = true;
      this.checkItem = {};
      this.userAction = 1;
    },
    openEditModal(item) {
      this.showEditModal = true;
      this.checkItem = item;
      this.userAction = 2;
    },
    //地址新增，编辑，删除
    submitAddree() {
      let { userAction, checkItem } = this;
      let method,
        url,
        params = {};
      if (userAction == 1) {
        (method = "post"), (url = "/shippings");
      } else if (userAction == 2) {
        (method = "put"), (url = `/shippings/${checkItem.id}`);
      } else {
        (method = "delete"), (url = `/shippings/${checkItem.id}`);
      }
      if (userAction == 1 || userAction == 2) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = checkItem;
        let errMsg;
        if (!receiverName) {
          errMsg = "请输入用户名名称";
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = "请输入手机号";
        } else if (!receiverProvince) {
          errMsg = "请选择身份";
        } else if (!receiverCity) {
          errMsg = "请选择城市";
        } else if (!receiverDistrict) {
          errMsg = "请选择区";
        } else if (!receiverAddress) {
          errMsg = "请输入具体地址";
        } else if (!receiverZip) {
          errMsg = "请输入邮编";
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return false;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        };
      }
      this.axios[method](url, params).then(() => {
        this.$message.success("成功！");
        this.showModal = false;
        this.showEditModal = false;
        this.getAddrList();
      });
    }
  },
  mounted() {
    this.getAddrList();
    this.getCartList();
  },
  components: {
    Modal
  }
};
</script>

<style lang='scss' scope>
.orderconfirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #fff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            margin-bottom: 15px;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .phone {
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6700;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        box-sizing: border-box;
        border: 1px solid #eee;
        outline: none;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #eee;
        margin-right: 10px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #eee;
      }
    }
  }
}
</style>