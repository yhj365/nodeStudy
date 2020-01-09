const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')
const Mail = require('../utils/mail')

let codes = {}

/**
 * @api {post} /food/add 商品添加
 * @apiName add
 * @apiGroup food
 *
 * @apiParam {String} name 商品名称
 * @apiParam {String} ps 密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {String} err:0 注册成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/add', (req, res) => {
  // 获取数据
  let { name, price, desc, typename, typeid, img} = req.body
  // 判断参数是否ok

  foodModel.insertMany({ name, price, desc, typename, typeid, img})
  .then(data => {
    res.send({ err: 0, message: '添加成功' })
  })
})

/**
 * @api {post} /food/getInfoByType 商品按分类查询
 * @apiName add
 * @apiGroup food
 *
 * @apiParam {String} typeid 商品分类id
 *
 * @apiSuccess {String} err:0 查询成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/getInfoByType', (req, res) => {
  // 获取数据
  let { typeid} = req.body
  // 判断参数是否ok

  foodModel.find({ typeid })
  .then(data => {
    res.send({ err: 0, message: '查询成功' , list: data})
  })
  .catch((err) => {
    res.send({ err: -1, message: '查询失败' })
  })
})

/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName getInfoByKw
 * @apiGroup food
 *
 * @apiParam {String} keyword 关键字
 *
 * @apiSuccess {String} err:0 查询成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/getInfoByKw', (req, res) => {
  // 获取数据
  let { keyword} = req.body
  let reg = new RegExp(keyword)
  // 名字、描述模糊查询
  foodModel.find({$or: [{ name: {$regex: reg}}, {desc: {$regex: reg} }]})
  .then(data => {
    res.send({ err: 0, message: '查询成功' , list: data})
  })
  .catch((err) => {
    res.send({ err: -1, message: '查询失败' })
  })
})

/**
 * @api {post} /food/del 商品删除
 * @apiName del
 * @apiGroup food
 *
 * @apiParam {String} _id 商品id
 *
 * @apiSuccess {String} err:0 删除成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/del', (req, res) => {
  let { _id} = req.body
  foodModel.remove({_id})
  .then(data => {
    res.send({ err: 0, message: '删除成功' })
  })
  .catch((err) => {
    res.send({ err: -1, message: '删除失败' })
  })
})

/**
 * @api {post} /food/edit 商品修改
 * @apiName edit
 * @apiGroup food
 *
 * @apiParam {String} _id 商品id
 *
 * @apiSuccess {String} err:0 删除成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/edit', (req, res) => {
  let { _id, name, price, desc, typename, typeid, img} = req.body
  foodModel.update({_id},{ name, price, desc, typename, typeid, img})
  .then(data => {
    res.send({ err: 0, message: '修改成功' })
  })
  .catch((err) => {
    res.send({ err: -1, message: '修改失败' })
  })
})

/**
 * @api {post} /food/getInfoByPage 商品分页查询
 * @apiName getInfoByPage
 * @apiGroup food
 *
 * @apiParam {String} _id 商品id
 *
 * @apiSuccess {String} err:0 删除成功
 * @apiSuccess {String} err: 其他为失败
 */
router.post('/getInfoByPage', (req, res) => {
  let pageSize = req.body.pageSize || 5
  let page = req.body.page || 1

  foodModel.find().limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
  .then(data => {
    res.send({ err: 0, message: '查询成功', list: data })
  })
  .catch((err) => {
    res.send({ err: -1, message: '查询失败' })
  })
})

module.exports = router