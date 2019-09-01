import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import welcome from '@/views/welcome.vue'
import users from '@/views/user/users.vue'
import rights from '@/views/rights/rightList.vue'
import roles from '@/views/rights/roleList.vue'
import goods from '@/views/goods/goods.vue'
import list from '@/views/goods/list.vue'
import add from '@/views/goods/add.vue'
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
        },
        {
          name: 'rights',
          path: 'rights',
          component: rights
        },
        {
          name: 'roles',
          path: 'roles',
          component: roles
        },
        {
          name: 'goods',
          path: 'goods',
          component: goods,
          redirect: { name: 'list' },
          children: [
            {
              name: 'list',
              path: 'list',
              component: list
            },
            {
              name: 'add',
              path: 'add',
              component: add
            }
          ]
        }
      ]
    }
  ]
})
