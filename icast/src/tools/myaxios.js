// 这个文件封装与axios相关的文件
import axios from 'axios'
// 这是基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

export default axios
