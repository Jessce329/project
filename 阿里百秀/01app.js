const express = require('express');
const fs = require('fs');
const router = require('./02router');
const app = express();

app.listen(8888, () => {
    console.log('http://127.0.0.1:8888');
});

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

app.use(router);