const mongoose = require('mongoose')
const db = 'mongodb://localhost/nodeTest'

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开重连')
      if(maxConnectTimes <= 3){
        maxConnectTimes++
        mongoose.connect(db)
      }else{
        reject()
        throw new Error('数据库出现问题，请人为处理')
      }
    })

    mongoose.connection.on('error', (err) => {
      console.log('数据库断开重连')
      if(maxConnectTimes <= 3){
        maxConnectTimes++
        mongoose.connect(db)
      }else{
        reject(err)
        throw new Error('数据库出现问题，请人为处理')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('数据库连接成功')
      resolve()
    })

  })
}
