const express = require('express');
const pageController = require('./controller/pageController');
const userController = require('./controller/userController');
const postController = require('./controller/postController');
const cateController = require('./controller/cateController');
const uploadController = require('./controller/uploadController');
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
    .get('/', pageController.getIndexPage)
    .get('/datail', pageController.getDetailPage)
    .get('/list', pageController.getListPage)

    //业务处理路由
    .post('/login', userController.login)
    .get('/getAllPost', postController.getAllPost)
    .post('/addPost', postController.addPost)
    .get('/getPostById', postController.getPostById)
    .post('/editPostById', postController.editPostById)
    .get('/delPostById', postController.delPostById)

    .get('/getAllCate', cateController.getAllCate)

    // 实现文件上传
    .post('/uploadFile', uploadController.uploadFile)

module.exports = router;