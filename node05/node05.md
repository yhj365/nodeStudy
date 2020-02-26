## 身份验证

  + http请求 无状态

### JWT
  
  + 非对称加密  通过私钥产生

  + token通过公钥解密token


### Cookie + Session

  1. 登录成功 发布一个加密字符串 给前端
  2. 调用其他接口 解密字符串 作为参数传递给服务器
  3. 根据权限进行验证

  + 使用插件cookie-parser, express-session

    - 