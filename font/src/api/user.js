/*
 * @Author: your name
 * @Date: 2020-08-12 08:12:36
 * @LastEditTime: 2020-09-19 09:34:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \font\src\api\user.js
 */
import request from '@/utils/request'

export function updateRight(data){
  return request({
    url:'http://182.92.231.190:9000/updateRight',
    method: 'post',
    data
  })
}
export function removeRight(data){
  return request({
    url:'http://182.92.231.190:9000/remove',
    method:"post",
    data
  })
}
export function getRight(){
  return request({
    url:'http://182.92.231.190:9000/getRight',
    method:"get"
  })
}
export function getroute(){
  return request({
    url:'http://182.92.231.190:9000/getRoute',
    method:"get"
  })
}

export function login(data) {
  return request({
    url:'http://182.92.231.190:9000/login',
    method: 'post',
    data
  })
}
// 注册信息
export function register(data) {
  return request({
    url: 'http://182.92.231.190:9000/register',
    method: 'post',
    data
  })
}
// 注册时邮箱验证码
export function registerSms(data) {
  return request({
    url: 'http://182.92.231.190:9000/registerSms',
    method: 'post',
    data
  })
}
// 忘记密码时获取验证码
export function forgetSms(data) {
  return request({
    url: 'http://182.92.231.190:9000/forgetSms',
    method: 'post',
    data
  })
}
// 忘记密码页发送用户名和验证码到后台
export function forget(data) {
  return request({
    url: 'http://182.92.231.190:9000/forget',
    method: 'post',
    data
  })
}
// 忘记密码页修改密码
export function newPassword(data) {
  return request({
    url: 'http://182.92.231.190:9000/newPassword',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://182.92.231.190:9000/getinfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://182.92.231.190:9000/logout',
    method: 'post'
  })
}
