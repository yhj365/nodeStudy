const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const jwt = require('./token')


// 解决跨域
app.use(cors())
// 设置静态目录
app.use('/public', express.static(path.join(__dirname, './static')))

// 使用中间件(插件) app.use
// 解析表单数据 x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }))

// 解析json数据
app.use(bodyparser.json())


app.post('/user/login',(req, res) => {
  let {us,ps} = req.body
  if(us == 'admin' && ps == '123456'){
    let token = jwt.creatToken({login: true, name: us})
    res.send({err: 0, msg: 'login OK', token})
  }else{
    res.send({err: -1, msg: 'login error'})
  }
  
})

app.post('/user/edit',(req, res, next) => {
  let {token, us, ps} = req.body
  jwt.checkToken(token).then(data => {
    console.log(data)
    res.send({err: 0, msg: '用户已登录', data})
  })
  .catch(err => {
    res.send({err: -1, msg: '用户未登录'})
  })
})

app.post('/user/logout',(req, res) => {
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