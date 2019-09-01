import axios from '@/tools/myaxios'

// 获取权限列表
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`,
    method: 'get'
  })
}

export const getMenu = () => {
  return axios({
    url: 'menus'
  })
}
