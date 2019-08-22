// 实现所有与分类数据相关的业务处理
let cateModel = require('../model/cateModel');
// 获取所有分类数据
exports.getAllCate = (req, res) => {
    cateModel.getAllCate((err, data) => {
        if (err) {
            res.json({ code: 400, msg: '数据查询失败' })
        } else {
            res.json({
                code: 200,
                msg: '数据查询成功',
                data: data
            })
        }
    })
}

//编辑分类数据
exports.editCate = (req, res) => {
    let obj = req.body;
    console.log(obj);
    cateModel.editCate(obj, (err) => {
        if (err) {
            res.json({
                code: 400,
                msg: '数据编辑失败',
            })
        } else {
            res.json({
                code: 200,
                msg: '数据编辑成功',
            })
        }
    })
}

//数据添加
exports.addCate = (req, res) => {
    let obj = req.body;
    // console.log(obj);
    // obj.id = null;
    cateModel.addCate(obj, (err) => {
        if (err) {
            res.json({
                code: 400,
                msg: '数据新增成功',
            })
        } else {
            res.json({
                code: 200,
                msg: '数据新增成功',
            })
        }
    })

}


//数据类型的删除
exports.delCateById = (req, res) => {
    let id = req.query.id;
    cateModel.delCateById(id, (err) => {
        if (err) {
            res.json({
                code: 400,
                msg: '数据删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '数据删除成功'
            })
        }
    })
}