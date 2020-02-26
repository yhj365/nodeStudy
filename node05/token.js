const jwt = require('jsonwebtoken')

const screat = 'haojie'
const payload = {
  isToken: true
}
// 产生一个token，hs256加密
function creatToken(payload){
  payload.ctime = Date.now()
  payload.exp = 1000*60*24*7 // 设置有效时长
  return jwt.sign(payload, screat)
}

// 验证token的合法性
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, screat, (err, data) => {
      if (err) { reject('token 验证失败') }
      resolve(data)
    })
  })
}


module.exports = {creatToken, checkToken}