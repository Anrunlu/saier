import request from '@/utils/request'
 
// 更新权限
export function updateRight(data){
  return request({
    url:'http://39.104.151.240:5000/updateRight',
    method: 'post',
    data
  })
}

export function removeRight(data){
  return request({
    url:'http://39.104.151.240:5000/remove',
    method:"post",
    data
  })
}
export function getRight(){
  return request({
    url:'http://39.104.151.240:5000/getRight',
    method:"get"
  })
}
export function getRoute(){
  return request({
    url:'http://39.104.151.240:5000/getRoute',
    method:"get"
  })
}
//新增角色
export function addRole(data){
  return request({
    url:'http://39.104.151.240:5000/addRole',
    method:"post",
	data
  })
} 
//分配权限 
export function allotRight(data){
  return request({
    url:'http://39.104.151.240:5000/allotRight',
    method:"post",
	data
  })
}
//查询用户
export function getAlluser(data){
  return request({
    url:'http://39.104.151.240:5000/getAlluser',
    method:"post",
	data
  })
}
//分配角色
export function changeRoles(data){
  return request({
    url:'http://39.104.151.240:5000/changeRoles',
    method:"post",
	data
  })
}
//删除角色
export function removeRole(data){
  return request({
    url:'http://39.104.151.240:5000/removeRole',
    method:"post",
	data
  })
}