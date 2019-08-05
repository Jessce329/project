const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu'
});


exports.login = (email, callback) => {
    //创建SQL语句
    let sql = `select * from users where email = "${email}"`
    //调用MySQL模块
    connection.query(sql, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result[0]);
        }
    })
    //返回操作结果
}