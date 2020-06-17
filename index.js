const http = require('http');
const path = require('path');
const fs =  require('fs');

const hostname  = 'localhost';
const port = 3000;

// 1. Make HTTP server
// 2. Check Type of Request
// 3. If GET request 
//     * get desired fileUrl in var
//     * make filePath using path.resolve(...)
//     * get fileExt using path.extname(filePath)
//     * If fileExt is .html
//         ** If filePath exists using fs.exists(filePath, (exits)=>{})
//             *** If does not exits send 404 status, valid response and return
//             *** else send 200 status and file using fs.createReadStream(filePath).res
//         ** else send 404 status and respose that file does not exists
//     * else fileExt is not supported send valid reponse and status code    

const server = http.createServer((req,res)=>{
    console.log('Request for '+ req.url + ' by method '+ req.method);
    if(req.method == 'GET') {
        var fileUrl;
        if(req.url == '/') 
            fileUrl = '/index.html';
        else 
            fileUrl = req.url;
        var filePath = path.resolve('./public/'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: '+ fileUrl+ ' is not found</h1></body></html>')
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
                
            })
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: '+ fileExt+ ' format not supported</h1></body></html>')
            return;
        }
    } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: '+ req.method+ ' not supported</h1></body></html>')
            return;
    }
});

server.listen(port,hostname,()=>{
    // Back quote because using variables inside string
    console.log(`Server running at http://${hostname}:${port}`)
})