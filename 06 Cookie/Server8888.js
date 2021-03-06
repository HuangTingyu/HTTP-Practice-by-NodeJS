const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  console.log('request come', request.url)
  if(request.url === '/'){
    const html = fs.readFileSync('test.html','utf8')
      response.writeHead(200,{
          'Content-Type':'text/html',
          // max-age设置cookie存在时间，HttpOnly限制document.cookie的访问
          'Set-Cookie':['id=123;max-age=2','abc=456;HttpOnly']
        })
    response.end(html)
  }
}).listen(8888)

console.log('server listening on 8888')
