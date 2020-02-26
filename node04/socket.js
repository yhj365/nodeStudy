const WebSocket = require('ws')
const ws = new WebSocket.Server({port: 8080}, ()=>{
  console.log('socket start')
})

// 记录多个socket连接
let clients = []
ws.on('connection', (client) => {
  clients.push(client)
  // 发送消息给前端
  client.send('后端发送数据')
  // 获取前端的数据
  client.on('message', (msg) => {
    console.log(msg)
    if(msg.indexOf('广播') != -1){
      sendAll()
    }
  })
  // 前端主动断开连接
  client.on('close', () => {
    
  })
})

// 群发socket消息
function sendAll() {
  for (let index = 0; index < clients.length; index++) {
    clients[index].send('群发消息')
  }
}
