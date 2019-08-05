const express = require('express');
const pageController = require('./controller/pageController');
const userController = require('./controller/userController');
let router = express.Router();

//后台页面
router.get('/admin', pageController.getAdminIndexPage)
    .get('/admin/categories', pageController.getAdmincCategoriesPage)
    .get('/admin/comments', pageController.getAdminCommentsPage)
    .get('/admin/login', pageController.getAdminLoginPage)
    .get('/admin/nav-menus', pageController.getAdminNavMenusPage)
    .get('/admin/password-reset', pageController.getAdminPasswordResetPage)
    .get('/admin/post-add', pageController.getAdminPostAddPage)
    .get('/admin/posts', pageController.getAdminPostsPage)
    .get('/admin/profile', pageController.getAdminProfilePage)
    .get('/admin/settings', pageController.getAdminSettingsPage)
    .get('/admin/slides', pageController.getAdminSlidesPage)
    .get('/admin/users', pageController.getAdminUsersPage)
    //前台页面
    .get('/index', pageController.getIndexPage)
    .get('/datail', pageController.getDetailPage)
    .get('/list', pageController.getListPage)

    //业务处理路由
    .post('/login', userController.login);




module.exports = router;