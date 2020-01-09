const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodeTest', { useNewUrlParser: true, useUnifiedTopology: true })

// 连接数据库
var db = mongoose.connection // 数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('db ok')
})

// schema 对象

// 创建一个和集合相关的schema 对象
// var Schema = mongoose.Schema
// 获取schema对象 new Schema 简写如下
var userSchema = new mongoose.Schema({
  us: {type: String, required: true},
  ps: {type: String, required: true},
  age: Number,
  sex: {type: Number, default: 0}
})

// 将schema 对象转化为数据模型
var User = mongoose.model('user', userSchema) // 改数据对象和集合关联('集合名', schema对象)

// 操作数据库
// User.insertMany({us: 'admin', ps: '123456', age: 18})
// .then((data) => {
//   console.log('插入成功')
// })
// .catch((err) => {
//   console.log('插入失败')
// })

User.find({us: 'admin'})
.then((data) => {
  console.log('查询成功')
})
.catch((err) => {
  console.log('查询失败')
})
