import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import welcome from '@/views/welcome.vue'
import users from '@/views/user/users.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // 默认路由页面
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    // 登录页面
    {
      name: 'login',
      path: '/login',
      component: login
    },
    // 主页
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'users',
          path: 'users',
          component: users
        }
      ]
    }
  ]
})
