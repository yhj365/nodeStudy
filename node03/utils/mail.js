"use strict"
const nodemailer = require('nodemailer')

// 创建发送邮箱的对象
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '365435306@qq.com',
    pass: 'hbkxufzbrbfobgcd'
  }
})

function send(mail, code) {
  let mailobj = {
    from: '"邮箱验证码" <365435306@qq.com>',
    to: mail,
    subject: "1222",
    text: `您的验证码是${code}, 有效期五分钟`
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailobj, (err, data) => {
      if(err){
        reject()
      }else{
        resolve()
      }
    })
  })
}

module.exports = {send}