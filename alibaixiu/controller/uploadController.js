const formidable = require('formidable');
const path = require('path');

exports.uploadFile = (req, res) => {
    //使用formidable来上传文件
    //1.创建上传文件对象
    let form = new formidable.IncomingForm();
    //2.设置编码:这个编码的设置与文件上传没有本质关系,只不过formidable可以上传普通的键值对,所以需要设置这些参数的编码
    form.encoding = 'utf-8';
    //3.设置文件的存储目录
    form.uploadDir = __dirname + '/../uploads';
    //4.设置保留文件的扩展名
    form.keepExtensions = true;
    //5.调用方法实现文件上传
    //req:请求报文,传递文件数据就是在请求报文的请求体中
    //回调函数的是三个参数
    //err:错误信息对象
    //fields:普通键值对
    //files:文件上传完成之后的信息,主要存储上传之后的文件信息
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                code: 400,
                msg: '上传文件失败',
            })
        } else {
            let imgname = path.basename(files.img.path);
            res.json({
                code: 200,
                msg: '上传文件成功',
                img: imgname
            })
        }
    })
}