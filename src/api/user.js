import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://39.104.151.240:5000/login',
    method: 'post',
    data
  })
}
// 注册信息
export function register(data) {
  return request({
    url: 'http://39.104.151.240:5000/register',
    method: 'post',
    data
  })
}
// 注册时邮箱验证码
export function registerSms(data) {
  return request({
    url: 'http://39.104.151.240:5000/registerSms',
    method: 'post',
    data
  })
}
// 忘记密码时获取验证码
export function forgetSms(data) {
  return request({
    url: 'http://39.104.151.240:5000/forgetSms',
    method: 'post',
    data
  })
}
// 忘记密码页发送用户名和验证码到后台
export function forget(data) {
  return request({
    url: 'http://39.104.151.240:5000/forget',
    method: 'post',
    data
  })
}
// 忘记密码页修改密码
export function newPassword(data) {
  return request({
    url: 'http://39.104.151.240:5000/newPassword',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://39.104.151.240:5000/getinfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://39.104.151.240:5000/logout',
    method: 'post'
  })
}
 