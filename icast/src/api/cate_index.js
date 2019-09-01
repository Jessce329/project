import axios from '@/tools/myaxios'

export const getAllCateList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
