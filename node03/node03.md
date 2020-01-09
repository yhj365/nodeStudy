# node express实现基本登录、注册

### nodemon工具使用
  + 更新代码自动更新服务
  + 安装
  ```
    npm i nodemon -g
  ```
  + 运行文件时使用nodemon
  ```
    nodemon server.js
  ```

### 注册登录
1. 验证码逻辑接口实现
  a. 验证用户名存在
  b. 获取验证码 (验证码存储 => redis 数据库 )
  c. 
2. apidoc 自动生成api文档