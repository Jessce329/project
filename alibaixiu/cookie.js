const express = require('express');
const querystring = require('querystring');
const app = express();
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
});
app.get('/', (req, res) => {
    //判断是否有登陆状态,
    //2.获取之前可能存在的登录状态
    let mycook = req.headers.cookie;
    console.log(mycook);
    let obj = querystring.parse(mycook);
    if (obj.islogin && obj.islogin == 'true') {
        res.end('welcome back');
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/css;charset=utf-8',
            'Set-Cookie': 'islogin=true',
        })
        res.end('first come');
    }
})