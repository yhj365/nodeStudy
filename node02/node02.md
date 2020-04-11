# node express-apidemo

1. 安装express 

    npm i express -S

2. 第三方模块引用，从当前目录的node_modules依次向上寻找

### api接口的书写
  + 接收数据
    - get req.query
    - post req.body 需要body-parser 插件进行解析
      + 注意数据格式 json  formdata  x-www-form-urlencode

# middlewear 中间件
  + 内置中间件 static
  + 自定义中间件 (全局 局部)
  + 第三方中间件 (body-parser) (拦截器)

  中间件的使用 一定要注意next

### 静态资源目录 static
  指定一个目录 目录可以被访问 如apache (www)

# mongodb 数据库

### 指令
  + mongodb 数据库名
  + mongod  命令行启动数据库命令
  + mongo   命令行操作数据库指令
  + mongoose node 操作数据库的插件

# promise

大量的异步操作 如果需要顺序执行 通过回调函数执行 会产生回调地狱

通过promise 解决回调地狱


    function test(){
      // 返回Promise
      return new Promise((resolve, reject) => {
        // 需要的异步处理
        成功的时候 resolve()
        失败的时候 reject()
      })
    }


根据顺序，链式调用
test()
.then()
.catch((err) => {
  console.log(err)
})


# mongoose

安装
npm install mongoose

运行mongodb
打开cmd命令行工具，输入mongod，提示在c盘建立data/db文件夹。在运行mongod,启动数据库。然后重新打开cmd命令行工具，输入mongo回车，输入show dbs显示数据库。

# 跨域问题

ajax 同源策略 协议 主机（ip，域名）端口
1. 协议 域名 端口号一致
2. cors （使用cors，npm i cors）
3. jsonp
4. 代理 （使用request，npm i request）