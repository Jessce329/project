// 引入信息提示
import { Message } from 'element-ui'

// 封装拦截器
export default ({ $axios }) => {
  // 错误拦截,用onError拦截
  $axios.onError((err) => {
    // 返回的res是一个错误对象,
    // console.log(err)
    const { message, statusCode } = err.response.data
    if (statusCode === 400) {
      Message.errer({ message })
    }
  })
}
