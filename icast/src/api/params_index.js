import axios from '@/tools/myaxios'

export const getAllParamsList = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
