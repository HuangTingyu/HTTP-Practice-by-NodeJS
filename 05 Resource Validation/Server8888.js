const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  console.log('request come', request.url)

if(request.url === '/'){
  const html = fs.readFileSync('test.html','utf8')
  response.writeHead(200,{
    'Content-Type':'text/html'
  })
  response.end(html)
}

if(request.url === '/script.js'){
  response.writeHead(200,{
    'Content-Type':'text/javascript',
    // no-cache表示每次缓存都要向服务器发送验证
    'Cache-Control':'max-age=20000,no-cache',
    'Last-Modified':'123',
    'Etag':'777'
    // 此处先把etag固定,etag不变启用缓存
  })
  const etag = request.headers['if-none-match']
  if(etag === '777'){
    // 如果etag不变，启用缓存
    response.writeHead(304,{
      'Content-Type':'text/javascript',
      'Cache-Control':'max-age=20000,no-cache',
      'Last-Modified':'123',
      'Etag':'777'
    })
    response.end('123')
  }else{
    response.writeHead(200,{
      'Content-Type':'text/javascript',
      'Cache-Control':'max-age=20000,no-cache',
      'Last-Modified':'123',
      'Etag':'777'
    })
    response.end('console.log("script loaded twice")')
  }
}
}).listen(8888)

console.log('server listening on 8888')
