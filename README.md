# mall 
  1. npm i -g @vue/li 安装vue-cli 4.xx.xx
  2. vue create mall 创建项目
# 项目构件
  1. 跨域的问题
    - yarn add axios --save-dev
    
    - vue.config.js 配置proxy代理
    ```
      devServer:{
        host:'localhost',
        port:'8080',
        proxy:{
          '/api':{
            targer:'www.baidu.com',
            changeOrigin:true,
            pathRewrite:{ // 将前缀路径置空
              '/api':''
            }
          }
        }
      }
    ```
  2. 路由封装
    router.beforeEach((to,form,next) => {
        ...
        next()
    })
  3. axios 封装
    let server = axios.create({
      basrUrl:'xxx',
      timeout:400000
    })
    // 请求拦截
    server.interceptors.request.use(request => {
      
    })
    // 响应过滤
    server.interceptors.response.use(response => {

    })
  4. 数据mock,使用mockjs；

  5. storage 数据存储

  6. vue-cookie 登录信息保存
    
  

  ## Vue 路由传参
    ```
      // query 类似于get方式！拼接地址
      this.$router.push({
        path:'/index',
        query:{

        }
      })
      // params 类似于post 不拼接地址，但是需要使用name,和vue-router里面的name一样
      this.$router.push({
        name:'index',
        params:{

        }
      })
    ```
# vue.config.js
  1. vue-cli 
# vue 按需加载
  1. 使用 Promise  resolve => require(['../xxx/xxx']resolve)
  2. 使用import 新语法 () => import('../xxxx/xxx');
  3. 按需加载删除预加载 ，在vue.config.js 删除babel里面的prefetch
# 部署
  1. 购买服务器
  2. 购买域名，解析

  3. nginx 安装 
    ```
      yum install nginx // 安装 
      which nginx //查看文件路径
      nginx -t // 看nginx配置文件
      vi nginx.config //配置nginx
      在nginx.config 里面添加 其他配置
       include /etc/nginx/vhosts/*.conf 
      server {
        listen 80; // 端口
        server_name mi.futurefe.com; // 域名
        root /wokespace/mimall; // 路径
        index index.html index.htm login.htnl; //文件
        location ^_/api/ { // 请求反向代理路径设计
          proxy_pass http://mall-pre.springboot.cn/
        } 
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)${ //图片配置
          root /worksapce/mimall;
        }
        location ~ .*\.(js|html|css)?${ // js,css 配置
          root /workspace/mimall;
          express 30d:
        }
      }
      
      nginx -s stop // 停止
      nginx -s reload // 重启
    ```
   4. node 安装
    ```
      wget 'xxxx路径'
      tar -xvf xxx 解压
      echo $PATH // 查看路径
      // 创建node的软连接还有npm
      ln -s /soft/xxxxx  /user/bin/node
    ```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
