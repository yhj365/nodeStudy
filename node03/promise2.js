const fs = require('fs')

function isEix () {
  return new Promise((resolve, reject) => {
    fs.stat('./hehe.js', (err, stats) => {
      if (err) {
        reject('文件不存在')
      } else {
        resolve('文件存在')
      }
    })
  })
}

function delFile () {
  return new Promise((resolve, reject) => {
    fs.unlink('./hehe.js', (err) => {
      if (err) {
        reject('del no ok')
      } else {
        resolve('del ok')
      }
    })
  })
}

isEix()
.then(() => {
  console.log('isEix 的成功处理')
  return delFile()
})
.then(() => {
  console.log('delFile 的成功处理')

  // 终止链式调用的执行 通过抛出一个错误
  throw new Error('手动终止')
})
.then(() => {
  console.log('test1')
})
.then(() => {
  console.log('test2')
})
.catch((err) => {
  console.log(err)
})