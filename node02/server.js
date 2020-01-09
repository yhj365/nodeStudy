const express = require('express')
const bodyparser = require('body-parser')

const app = express()

// 使用中间件(插件) app.use
// 解析表单数据 x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }))

// 解析json数据
app.use(bodyparser.json())

app.get('/user/login',(req, res) => {
  let {user,psw} = req.query

  if(user == 'admin' && psw == '123456'){
    res.send({err: 0, msg: 'login OK'})
  }else{
    res.send({err: -1, msg: 'login error'})
  }
  
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