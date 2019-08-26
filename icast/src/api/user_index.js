import axios from '@/tools/myaxios.js'

export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    method: 'get',
    params
  })
}

// 1.添加用户
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
// 2.编辑用户
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
// 3.获取用户的角色列表
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}

// 实现用户状态设置
export const updateUserState = (uid, type) => {
  return axios({
    method: 'put',
    url: `users/${uid}/state/${type}`
  })
}

// 实现删除
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
