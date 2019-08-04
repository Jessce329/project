const express = require('express');
const pageController = require('./controller/pageController');

let router = express.Router();

router.get('/admin/index', pageController.getAdminIndexPage)
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


    .get('/index', pageController.getIndexPage)
    .get('/datail', pageController.getDetailPage)
    .get('/list', pageController.getListPage)


module.exports = router;