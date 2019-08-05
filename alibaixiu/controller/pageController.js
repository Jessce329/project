const express = require('express');


exports.getIndexPage = (req, res) => {
    res.render('index.ejs');
}
exports.getDetailPage = (req, res) => {
    res.render('datail.ejs');
}
exports.getListPage = (req, res) => {
    res.render('list.ejs');
}

//后台页面管理
exports.getAdminIndexPage = (req, res) => {
    //进行登录状态的验证
    if (req.session.isLogin && req.session.isLogin == 'true') {
        res.render('admin/index.ejs');
    } else {
        res.writeHeader(301, {
            'location': '/admin/login',
        })
        res.render('admin/index.ejs');
    }

}
exports.getAdmincCategoriesPage = (req, res) => {
    res.render('admin/categories.ejs');
}
exports.getAdminCommentsPage = (req, res) => {
    res.render('admin/comments.ejs');
}
exports.getAdminLoginPage = (req, res) => {
    res.render('admin/login.ejs');
}
exports.getAdminNavMenusPage = (req, res) => {
    res.render('admin/nav-menus.ejs');
}
exports.getAdminPasswordResetPage = (req, res) => {
    res.render('admin/password-reset.ejs');
}
exports.getAdminPostAddPage = (req, res) => {
    res.render('admin/post-add.ejs');
}
exports.getAdminPostsPage = (req, res) => {
    res.render('admin/posts.ejs');
}
exports.getAdminProfilePage = (req, res) => {
    res.render('admin/profile.ejs');
}
exports.getAdminSettingsPage = (req, res) => {
    res.render('admin/settings.ejs');
}
exports.getAdminSlidesPage = (req, res) => {
    res.render('admin/slides.ejs');
}
exports.getAdminUsersPage = (req, res) => {
    res.render('admin/users.ejs');
}