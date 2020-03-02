import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelazyload from 'vue-lazyload';
import VueCookie from 'vue-cookie';
import App from './App.vue'
import router from './router';
import store from './store/index';
import env from './env';
// console.log(env);

// mock数据
const mock = false; // mock 开关
if (mock) {
  require('./mock/index'); // require只有使用时加载
}
console.log(env.baseURL)
Vue.config.productionTip = false
// axios 封装
// 依据跨域方式调整
const server = axios.create({
  baseURL: env.baseURL,
  timeout: 8000
})
server.interceptors.response.use(function (response) { // 响应拦截
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) { // 成功
    return res.data;
  } else if (res.status == 10) { // 未登录
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
  } else {
    alert(res.msg)
    return Promise.reject();
  }
})
Vue.use(VueAxios, server)
Vue.use(Vuelazyload, {
  loading: '/imgs/loading-svg/loading-spin.svg'
})
Vue.use(VueCookie);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
