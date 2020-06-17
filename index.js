const http = require('http');

const hostname  = 'localhost';
const port = 3000;

const server = http.createServer((req,res)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hello Motasim</h1></body></html>')
});

server.listen(port,hostname,()=>{
    // Back quote because using variables inside string
    console.log(`Server running at http://${hostname}:${port}`)
})