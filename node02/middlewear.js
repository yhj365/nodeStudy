const express = require('express')

const app = express()

// 根目录可省略'/', 简写为app.use((req,res,next) => {})
app.use('/',(req,res,next) => {
  console.log('中间件')
  let {token} = req.query
  if(token){
    next() // 是否继续往下执行
  }else{
    res.send({err: -1, msg: 'lose token'})
  }

  
})

app.get('/test1',(req, res) => {
  console.log('test1')
  
})

// 局部中间件 
app.get('/test2',(req,res,next) => {
  console.log('局部中间件')
  next()
},(req, res) => {

})


app.listen(3000, () => {
  console.log('server start')
})