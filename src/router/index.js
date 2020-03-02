import Vue from 'vue';
// vue.
import Router from 'vue-router';
import Home from '../layout/index';
import Login from '../layout/login';
import Index from '../pages/home';
import Product from '../pages/product';
import Detail from '../pages/detail';
import Card from '../layout/card';
import Order from '../layout/order';
import OrderConfirm from '../pages/orderConfirm';
import OrderPay from '../pages/orderPay';
import OrderList from '../pages/orderList';

Vue.use(Router);





export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: '首页',
          component: Index
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
      path: '/card',
      name: 'card',
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
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});