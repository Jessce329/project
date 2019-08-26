// 这个文件封装与axios相关的文件
import axios from 'axios'
// 这是基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let mytoken = localStorage.getItem('itcast_token')
  if (mytoken) {
    // 2.通过请求头的方式设置token的传递,通过config获得请求头
    config.headers['Authorization'] = mytoken
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
