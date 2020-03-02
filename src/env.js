/**
 * 配置测试环境
 * 1. 在package.json 里面 修改 --mode='development';
 * 2. 在这里配置对应的参数
 * 3. 自定义的话 --mode='te_st';在跟目录创建env.te_st NODE_ENV = 'te_st',
 * 4. 在配置对应的文件即可 
 */
let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = '/api';
    break;
  case 'production':
    baseURL = 'http://prod-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseURL
}