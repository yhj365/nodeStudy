### 前后端分离 前端矩阵 （app pc wap 小程序）

### api接口 

  + url http://
  + 参数
  + 结果
  + 方法

#### 前后端交互的桥梁

  + 前端：ajx通过api接口传递数据
  + 后端：通过api接受数据
  + 后端：处理数据
  + 后端：返回数据 {err: 0 -1 , msg: , data: }
  + 前端：接收数据，页面的刷新渲染


### 实现socket的方式

  1. net
  2. socket.io 麻烦 兼容性最好
  3. websocket h5新增 低版本浏览器不兼容 使用方式简单

  + 搭建socket 服务器 new WebSocket.server({port:8080}, ()=>{})
    - ws.on('connection')
  + 前端进行连接 new WebSocket('ws://localsocket:8080')
    - ws.onopen()
    client.on('message', ()=>{})
  + 前端主动发送数据
    - ws.send()
  + 后端主动发送数据
    - ws.onmessage = () => {}
  + 断开连接
   - ws.on('close') 后端
   - ws.onclose() 前端

#### 什么时候使用长连接
  + 实时刷新（轮询）
  + 服务器端发起数据

#### 身份验证

  http请求 无状态

  1. 登录时，发布一个加密字符串（用户相关信息），给前端（自动放在cookie）