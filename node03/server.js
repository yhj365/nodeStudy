const express = require('express')
const db = require('./db/connect')
const path = require('path')
const app = express()
const mail = require('./utils/mail')
const cors = require('cors')

const bodyparser = require('body-parser')
// 解析表单数据 x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }))
// 解析json数据
app.use(bodyparser.json())
// 解决跨域
app.use(cors())
app.use('/public', express.static(path.join(__dirname, './static')))

const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
app.use('/user', userRouter)
app.use('/food', foodRouter)


app.listen(3000, () => {
  console.log('server start')
})