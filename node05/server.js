const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')

// 解决跨域
app.use(cors())
// 设置静态目录
app.use('/public', express.static(path.join(__dirname, './static')))

// 使用中间件(插件) app.use
// 解析表单数据 x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }))

// 解析json数据
app.use(bodyparser.json())

// session整体配置
app.use(session({
  secret: 'haojie', // 为了安全性考虑设置
  cookie: {maxAge: 60 * 1000}, // 设置过期时间
  resave: true, // 即使session没有修改，也保存session值，默认为true
  saveUninitialized: false // 无论有没有session,cookie,每次请求都设置session,cookie
}))

app.post('/user/login',(req, res) => {
  let {us,ps} = req.body
  if(us == 'admin' && ps == '123456'){
    res.session.login = true
    res.session.name = us
    res.send({err: 0, msg: 'login OK'})
  }else{
    res.send({err: -1, msg: 'login error'})
  }
  
})

app.post('/user/edit',(req, res, next) => {
  let {us,ps} = req.body
  if(req.session.login){
    next()
  }else{
    res.send({err: -1, msg: '用户未登录'})
  }
  
})
app.post('/user/logout',(req, res) => {
  // 销毁保存的session
  res.session.destroy()
  res.send({err: 0, msg: '已退出'})
})

// post消息体需要第三方插件解析，body-parser
app.post('/user/register',(req, res) => {
  let {user,psw} = req.body

  if(user == 'admin' && psw == '123456'){
    res.send({err: 0, msg: 'register OK'})
  }else{
    res.send({err: -1, msg: 'register error'})
  }
  
})


app.listen(3000, () => {
  console.log('server start')
})