import axios from '@/tools/myaxios.js'

export const getAllGoodsList = (params) => {
  return axios({
    url: `goods`,
    params
  })
}
