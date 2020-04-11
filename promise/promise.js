function Promise(excutor) {
  var self = this
  // Promise resolve时的回调函数集
  self.onResolvedCallback = []
  
  // 传递给Promise处理函数的resolve
  // 这里直接往实例上挂个data  
  // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
  function resolve(value) {
    // 注意promise的then函数需要异步执行 
    setTimeout(() => {
      self.data = value
      self.onResolvedCallback.forEach(callback => callback(value))
    })
  }
  // 执行用户传入的函数
  excutor(resolve.bind(self))
}
Promise.prototype.then = function(onResolved) {
  // 保存上下文，哪个promise调用的then，就指向哪个promise。
  var self = this
  // 一定要返回一个新的promise
  return new Promise(resolve => {
    self.onResolvedCallback.push(function() {
      var result = onResolved(self.data)
      if (result instanceof Promise) {
        // resolve的权力被交给了user promise
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  })
}

// 核心案例
new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})
  .then(res => {
    console.log(res)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 500)
    })
  })
  .then(console.log)
