// 这个是获取所有角色的axios请求
import axios from '@/tools/myaxios.js'

export const getAllRoleList = () => {
  return axios({
    url: 'roles',
    method: 'get'
  })
}

// 删除角色指定的权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 根据id配置权限
export const grantRoleById = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}
// 添加用户
export const addRoles = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data
  })
}

// 删除用户
export const delRoles = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}

// 编辑用户
export const editRoles = (id, data) => {
  return axios({
    url: `roles/${id}`,
    method: 'put',
    data
  })
}
