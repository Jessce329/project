// 实现所有分类数据相关操作
var conn = require('../utils/conn')

// 获取所有分类数据
exports.getAllCate = (callback) => {
    var sql = 'select * from categories'
    conn.query(sql, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}

//编辑分类数据
exports.editCate = (obj, callback) => {
    let sql = `update categories set ? where id = ?`;
    conn.query(sql, [obj, obj.id], (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    })
}


//新增数据
exports.addCate = (obj, callback) => {
    let sql = `insert into categories set ?`;
    conn.query(sql, obj, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    })
}

//删除数据类型

exports.delCateById = (id, callback) => {
    let sql = `delete from categories where  id =?`;
    conn.query(sql, [id], (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    })
}