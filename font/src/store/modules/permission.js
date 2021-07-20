/*
 * @Author: your name
 * @Date: 2020-07-04 19:33:55
 * @LastEditTime: 2020-10-07 15:20:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tecsys\tecsys\src\store\modules\permission.js
 */ 
import { asyncRoutes, constantRoutes } from '@/router'
import {getroute} from '../../api/user'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data){
  data.forEach(item=>{
    var a=item.component
    item.component=() => import(`../../../src/views/${a}.vue`)
  })
  
  routes[0].children=data
  // console.log(routes)
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
        const loadMenuData = []
        getroute().then(response=>{
        let data=response.data
        Object.assign(loadMenuData,data)
        const tempRoute=Object.assign([],asyncRoutes)
        generaMenu(tempRoute,loadMenuData)
        let accessedRoutes
        // console.log("dsd"+roles)
        // console.log(tempRoute)
      if (roles.includes('admin')) {
        // console.log(JSON.stringify(tempRoute))
        accessedRoutes = tempRoute || []
      } else {
        accessedRoutes = filterAsyncRoutes(tempRoute, roles)
      }
      // console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
        // console.log(data)
      })
      
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
