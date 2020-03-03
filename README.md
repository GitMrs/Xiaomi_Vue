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
