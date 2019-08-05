const express = require('express');
const querystring = require('querystring');
const session = require('express-session');
const app = express();
app.listen(7777, () => {
    console.log('http://127.0.0.1:7777');
});

app.use(session(
    {
        //加盐
        secret: 'keyboard cat',//相当于是一个加密秘钥,值可以是任意的字符串
        resave: false,//强制session保存到session stor中,不管session有没有更新,都被强制保存
        saveUninitialized: false//强制没有初始化的session保存到storage中
    }
))

app.get('/', (req, res) => {
    //使用的方法都是通过req.session进行处理
    //req.session是一个对象
    console.log(res.session);
    if (req.session.isLogin && req.session.isLogin == 'true') {
        res.end('welcome back123');
    } else {
        req.session.isLogin = 'true';
        req.session.currentUser = { name: 'jack', age: 20 };
        res.end('first come 123');
    }
})