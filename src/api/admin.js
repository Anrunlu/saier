import request from '@/utils/request'
//获得用户类型
export function getusertype() {
  return request({
    url: 'http://39.104.151.240:5000/getusertype',
    method: 'post'
   
  })
}