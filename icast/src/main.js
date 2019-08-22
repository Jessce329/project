import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义样式
import '@/styles/index.less'
import router from '@/routers/router.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  // 判断用户是否登录过或者是否跳转到login页面,如果是,就继续跳转
  let token = localStorage.getItem('itcast_token')
  if (token || to.path === '/login') {
    next()
  } else {
    // 否则重定向到登录页面
    next({ name: 'login' })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
