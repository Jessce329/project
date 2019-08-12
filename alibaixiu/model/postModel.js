// 这个文件处理所有文章数据的操作
// 引入连接对象
const conn = require('../utils/conn.js')

// 获取所有文章数据
// obj是分页查询参数对象
// 里面必须包含这两个成员
// obj.pageNum:当前页码--必需
// obj.pageSize:每页显示的记录数--必需
// obj.cate:分类id
// obj.stauts:状态
exports.getAllPost = (obj, callback) => {
    console.log(obj)
    // 1.创建sql语句--多表连接
    var sql = `select posts.*,users.nickname,categories.name
                from posts
                join users on posts.user_id = users.id
                join categories on posts.category_id = categories.id
                where 1=1  ` // 添加恒成立，这样有一个好处：后面进行语句拼接的时候，不用再考虑是拼接 where 还是拼接 and,我们可以统一 拼接and
    if (obj.cate && obj.cate != 'all') { // 有没有传递分类数据
        sql += ` and category_id = ${obj.cate}`
    }
    if (obj.status && obj.status != 'all') {
        sql += ` and posts.status ='${obj.status}'`
    }

    sql += ` order by id desc
                limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize}`

    // 2.调用方法获取数据
    conn.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            // 再创建sql语句 进行总记录的查询
            sql = `select count(*) as cnt
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id
                    where 2=2 `
            if (obj.cate && obj.cate != 'all') { // 有没有传递分类数据
                sql += ` and category_id = ${obj.cate}`
            }
            if (obj.status && obj.status != 'all') {
                sql += ` and posts.status ='${obj.status}'`
            }
            conn.query(sql, (err2, res2) => {
                if (err2) {
                    callback(err2)
                } else {
                    // 没有错误，不仅仅要返回之前的查询数据，而且还要返回当前查询的总记录数
                    callback(null, { data: results, total: res2[0].cnt })
                }
            })
        }
    })
}

// 文章新增
// update 表 set ? where ?
exports.addPost = (obj, callback) => {
    // ? 它会根据数据对象中的属性名称自动创建sql语句，语句 中修改的字段名称就是数据对象的属性名称
    let sql = `insert into posts set ?`
    // 这里直接传入对象，不用再添加[]
    conn.query(sql, obj, (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}


// 根据id获取文章详细数据
exports.getPostById = (id, callback) => {
    var sql = 'select * from posts where id = ' + id
    conn.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            // 没有错误，不仅仅要返回之前的查询数据，而且还要返回当前查询的总记录数
            callback(null, results[0])
        }
    })
}

// 根据文章id实现文章的编辑
exports.editPostById = (obj, callback) => {
    let sql = 'update posts set ? where id = ?'
    conn.query(sql, [obj, obj.id], (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

// 根据文章id实现文章的删除
exports.delPostById = (id, callback) => {
    let sql = 'delete from posts where id = ?'
    conn.query(sql, [id], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

