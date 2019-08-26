// 这个是获取所有角色的axios请求
import axios from '@/tools/myaxios.js'

export const getAllRoleList = () => {
  return axios({
    url: 'roles',
    method: 'get'
  })
}
