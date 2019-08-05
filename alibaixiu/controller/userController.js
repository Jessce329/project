const userModel = require('../model/userModel');
exports.login = (req, res) => {
    var obj = req.body;
    userModel.login(obj.email, (err, data) => {
        if (err) {
            // res.json():可以直接将js对象转换为json格式的是字符串并返回
            res.json({ code: 400, msg: '服务器异常' });
        } else {
            if (data) {
                //判断密码是否正确
                if (data.password == obj.password) {
                    //使用session写入登录状态
                    req.session.isLogin = 'true';
                    //将当前对象存储到session中
                    req.session.currentUser = data;
                    res.send({ code: 200, msg: '登录成功' });
                } else {
                    res.json({ code: 400, msg: '输入密码错误' });
                }
            } else {
                console.log(3)
                res.json({ code: 400, msg: '输入邮箱错误' });
            }
        }
    });
}