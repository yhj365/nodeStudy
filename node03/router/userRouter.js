const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../utils/mail')

let codes = {}

/**
 * @api {post} /user/reg 用户注册
 * @apiName reg
 * @apiGroup user
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {String} err: 0 注册成功
 * 
 */
router.post('/reg', (req, res) => {
  // 获取数据
  let { us, ps, code } = req.body
  if (us && ps && code) {
    // 判断验证码是否正确
    if(codes[us] != code){
      return res.send({ err: -2, message: '验证码错误' })
    }
    User.find({ us })
      .then(data => {
        if (data.length === 0) {
          return User.insertMany({ us, ps })
        } else {
         res.send({ err: -2, message: '用户名已存在' })
        }
      })
      .then(data => {
        res.send({ err: 0, message: '注册ok' })
      })
      .catch((err) => {
        res.send({ err: -1, message: '注册失败' })
      })
  } else {
    return res.send({ err: -1, message: '参数错误' })
  }
})

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup user
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 密码
 *
 * @apiSuccess {String} err:0 登录成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/login', (req, res) => {
  let { us, ps } = req.body
  if (!us && !ps) { return res.send({ err: -1, message: '参数错误' }) }
  User.find({ us, ps })
    .then(data => {
      if (data.length > 0) {
        res.send({ err: 0, message: '登录成功' })
      } else {
        res.send({ err: -2, message: '用户名或密码不正确' })
      }
    })
    .catch(err => {
      return res.send({ err: -1, message: '内部错误' })
    })
})

// 发送邮箱验证码
router.post('/getMailCode', (req, res) => {
  let {mail} = req.body
  // 产生随机验证码
  let code = parseInt(Math.random() * 10000)
  Mail.send(mail, code)
  .then(() => {
    codes[mail] = code
    res.send({err: 0, msg: '验证码发送成功'})
  })
  .catch((err) => {
    res.send({err: -1, msg: '验证码发送失败'})
  })
})

module.exports = router