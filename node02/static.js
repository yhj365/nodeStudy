/*
 * 静态资源目录
*/
const express = require('express')
const path = require('path')

const app = express()
// 打印目录
console.log(__dirname)
// 拼接文件目录
console.log(path.join(__dirname, './demo'))
app.use('/public',express.static(path.join(__dirname, './demo')))
// 访问地址 ip:3000/public
app.listen(3000, () => {
  console.log('server start')
})