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
  2. 

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
