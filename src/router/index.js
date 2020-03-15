import Vue from 'vue';
// vue.
import Router from 'vue-router';
// import Home from '../layout/index';
import Login from '../layout/login';
// import Index from '../pages/home';
import Product from '../pages/product';
import Detail from '../pages/detail';
import Card from '../layout/cart';
import Order from '../layout/order';
import OrderConfirm from '../pages/orderConfirm';
import OrderPay from '../pages/orderPay';
import OrderList from '../pages/orderList';
import AliPay from '../pages/aliPay';
Vue.use(Router);





export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../layout/index'), //按需加载
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: reslove =>require(['../pages/home'],reslove) // 使用resolve实现按需加载
        },
        {
          path: '/product/:id',
          name: 'product',
          component: Product
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Card
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      redirect: '/order/list',
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: AliPay
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});