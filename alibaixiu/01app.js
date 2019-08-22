const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./02router');
const app = express();

app.listen(8888, () => {
    console.log('http://127.0.0.1:8888');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//在express使用session中间件,因为在默认情况下,express并不会开启session的使用
app.use(session(
    {
        // 加盐
        secret: 'my_albx_Q',//相当于一个加密密钥，值可以是任意字符串
        resave: false,//强制session保存到session store中,不管Session有没有更新，都强制保存
        saveUninitialiazed: false //强制没有‘初始化’的session保存到storage中
    }
))

//添加路由配置
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/detail', (req, res) => {
    res.render('detail')
})
app.get('/list', (req, res) => {
    res.render('list')
})
//处理静态页面资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'))
//设置模板引擎
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(function(req,res,next){
    //设置允许进行跨域请求的源
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type')
    res.header('Access-Control-Allow-Credentials','true')
    next();
})
//导航守卫
app.use(function (req, res, next) {
    //三种场合不用登录
    //1.登录页
    //2.前面三个首页不用登录
    //3.已经有登录状态的
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
        next();
    } else {
        res.redirect('/admin/login')
    }
})
app.use(router);