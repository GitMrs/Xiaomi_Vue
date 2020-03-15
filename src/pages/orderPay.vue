<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款喽~</h2>
              <p>
                请在
                <span>30分</span>内完成支付，超时后将自动取消订单！
              </p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：
                <span>{{payment}}</span>元
              </p>
              <p @click="showDetail = !showDetail">
                订单详情
                <em class="icon-down" :class="{'up':showDetail}"></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderList" :key="index">
                    <img v-lazy="item.productImage" alt />
                    {{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>请选择一下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <ScanPayCode v-if="ScanPay" :img="payImg" @close="closeScanPay" />
    <Modal 
      title="支付确认" 
      :btnType="3"
      sureText="是否确认支付"
      cancelText="支付为完成"
      :showModal="showModal"
      @submit="goOrderList"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        您确认是否完成支付？
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "../components/modal";
import ScanPayCode from "../components/ScanPayCode";
import QRCode from "qrcode";
export default {
  components: {
    Modal,
    ScanPayCode
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: {},
      orderList: {},
      showDetail: false,
      payType: "",
      payImg: "",
      showModal:false,
      ScanPay: false,
      T:"" ,
      payment:0
    };
  },
  mounted() {
    this.getOrderPay();
  },
  methods: {
    getOrderPay() {
      this.axios.get(`/orders/${this.orderId}`).then(res => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict}`;
        this.orderList = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    closeScanPay() {
      this.ScanPay = false;
      this.showModal = true;
      clearInterval(this.T)
    },
    paySubmit(payType) {
      if (payType === 1) {
        window.open("/#/order/alipay?orderId=" + this.orderId, "_blank");
      } else {
        this.axios
          .post("/pay", {
            orderId: this.orderId,
            orderName: "小米商城",
            amount: 0.01,
            payType: 2
          })
          .then(res => {
            QRCode.toDataURL(res.content)
              .then(url => {
                this.ScanPay = true;

                this.payImg = url;
                this.loopOrderState()
              })
              .catch(() => {
                this.$message("二维码获取失败！");
              });
            // console.log(res);
          });
      }
      this.payType = payType;
    },
    // 轮询查询
    loopOrderState(){
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then(res => {
          if(res.status == 10){
            clearInterval(this.T)
            this.goOrderList();
          }
        })
      },1000)
    },
    goOrderList(){
      this.$router.push('/order/list')
    }
  }
};
</script>

<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      /* margin-bottom: 30px; */
      .item-order {
        display: flex;
        align-items: center;
        padding-bottom: 45px;
        border-bottom: 1px solid #d7d7d7;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url("/imgs/icon-guo.png") #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }
          p {
            color: #666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            padding-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url("/imgs/icon-down.png") no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        padding-top: 47px;
        margin-left: 130px;
        font-size: 14px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #fff;
      color: #333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>