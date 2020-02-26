const express = require('express')
const router = express.Router()
const multer = require('multer')
var storage = multer.diskStorage({
  // 设置上传后文件路径，创建文件夹
  destination: function (req, file, cb) {
    cb(null, './static/images')
  },
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let exts = (file.originalname).split('.')
    let ext = exts[exts.length - 1]
    let tmpname = (new Date()).getTime() + parseInt(Math.random()*999)
    cb(null, `${tmpname}.${ext}`)
  }
})
var upload = multer({
  storage
})

router.post('/upload', upload.single('fileKey'), (req, res) => {
  // fileKey上传文件的key值，必须前后端一致
  // 允许上传后缀名
  let types = ['jpg', 'jpeg', 'png', 'gif']
  let { size, mimetype, path } = req.file
  let tmpType = mimetype.split('/')[1]
  if (size > 500 * 1024) {
    return res.send({ err: 0, message: '尺寸大于500k' })
  } else if (types.indexOf(tmpType) === -1) {
    return res.send({ err: 0, message: '上传类型错误' })
  } else {
    let url = `/public/images/${req.file.filename}`
    res.send({ err: 0, message: '上传成功', data: url})
  }
})

module.exports = router