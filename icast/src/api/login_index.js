// 引入axios
import axios from '@/tools/myaxios.js'

// 登录
export const login = (data) => {
  // axios返回了一个promise对象
  return axios({
    // 请求路径
    url: 'login',
    // 请求默认的方式
    method: 'post',
    // post传递的数据
    data
  })
}
