const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  // 设置domain
  const host = request.headers.host
  console.log('request come', request.url)
  if(request.url === '/'){
    const html = fs.readFileSync('test.html','utf8')
    if(host === 'test.com:8888'){
      response.writeHead(200,{
          'Content-Type':'text/html',
          'Set-Cookie':['id=123;domain=test.com','abc=456;domain=test.com']
        })
    }
    response.end(html)
  }
}).listen(8888)

console.log('server listening on 8888')
