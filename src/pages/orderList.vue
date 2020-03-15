<template>
  <div class="order-list">
    <Loading v-if="loading" />
    <div class="wrap">
      <div class="order-box">
        <div class="order" v-for="(item,index) in list" :key="index">
          <div class="order-title">
            <div class="item-info fl">
              {{item.createTime}}
              <span>|</span>
              {{item.receiverName}}
              <span>|</span>
              订单号：{{item.orderNo}}
              <span>|</span>
              {{item.paymentTypeDesc}}
            </div>
            <div class="item-money fr">
              <span>应付金额：</span>
              <span class="money">{{item.payment}}</span>
              <span>元</span>
            </div>
          </div>
          <div
            class="order-content clearfix"
            v-for="(_item,_index) in item.orderItemVoList"
            :key="_index"
          >
            <div class="good-box fl">
              <div class="good-list">
                <div class="good-img">
                  <img v-lazy="_item.productImage" alt />
                </div>
                <div class="good-name">
                  <div class="p-name">{{_item.productName}}</div>
                  <div class="p-money">{{_item.currentUnitPrice}} x {{_item.quantity}}</div>
                </div>
              </div>
            </div>
            <div class="good-state fr">
              <a
                href="javascript:;"
                @click="goPay(item)"
                v-if="_item.status == 20"
              >{{item.statusDesc}}</a>
              <a href="javascript:;" v-else>{{item.statusDesc}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <no-data v-if="!loading && list.length == 0"></no-data>
    <!-- <div class="scroll-more" 
      v-infinite-scroll="scrollMore"
      infinite-scroll-disable="busy"
      infinite-scroll-distance="410"

    >
      <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" v-show="loading" alt="">
    </div>-->
    <!-- <div class="loading_wrap">
      <el-button @click="btnLoding" type="primary" class="btn-loading" :loading="loading">加载更多</el-button>
    </div>-->
    <el-pagination
      class="pagation"
      background
      layout="prev,pager,next"
      :page-size="pageSize"
      :total="total"
      @current-change="handleChange"
    ></el-pagination>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import infiniteScroll from "vue-infinite-scroll";
import { Pagination, Button } from "element-ui";
export default {
  name: "order_list",
  data() {
    return {
      list: [],
      loading: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      busy: true
    };
  },
  directives: { infiniteScroll },
  components: {
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.loading = true;
      this.busy = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 2,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.list = res.list;
          this.total = res.total;
          this.loading = false;
          this.busy = false;
          console.log(this.list);
          // console.log(res);
        })
        .catch(() => {
          this.loading = false;
          this.$message.fail("获取数据错误！");
        });
    },
    goPay(item) {
      this.$outer.push("/order/list");
      // this.$router.push({
      //   name:'order-list',
      //   query:{
      //     orderNo:item.orderNo
      //   }
      // })
      this.$router({
        path: "/order-list",
        query: {
          orderNo: item.orderNo
        }
      });
    },
    getOrderListMore() {
      this.loading = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 8,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.list);
          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
          this.loading = false;
          console.log(this.list);
          // console.log(res);
        })
        .catch(() => {
          this.loading = false;
          this.$message.fail("获取数据错误！");
        });
    },
    // 点击记载更多
    // btnLoding() {
    //   this.pageNum++;
    //   this.getOrderListMore();
    // },
    //分页
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    }
    // 滚动加载
    // scrollMore(){
    //   this.busy = false;
    //   setTimeout(() => {
    //     this.pageNum++
    //     this.busy = true;

    //     this.getOrderListMore()
    //   },500)
    // }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.order-list {
  width: 80%;
  margin: 0 auto;
  .wrap {
    background-color: $colorJ;
    margin-top: 30px;
    margin-bottom: 110px;
    .order-box {
      .order {
        border: 1px solid $colorF;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          height: 74px;
          line-height: 74px;
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          background-color: #fff;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 113px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            line-height: 143px;
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
    }
  }
  .pagation {
    text-align: right;
  }
  .loading_wrap {
    text-align: center;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff6600;
    color: #fff;
  }
  .scroll-more {
    text-align: center;
  }
}
</style>