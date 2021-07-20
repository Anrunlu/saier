import { asyncRoutes, constantRoutes } from '@/router'
const _import = require('@/store/_import_development.js')//获取组件的方法
import Layout from '@/layout/index.vue'
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
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
/* export function filterAsyncRoutes(routes, roles) {
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
} */
  /* function filterAsyncRoutes(routes) {
	 
  const accessedRoutes = routes.filter(route=>{
	  
	if(route.component){
	  if(route.component === 'Layout'){
		   
		  route.component = Layout
		  
	  }else{
		  try{ 
			  alert("4")
			  route.component = () => import('@/views/' + route.component + '.vue')
			  alert("5")
		  }catch(err){
			  route.component=_import("errorPage/404")
			  return true
		  }
	  }
	 } 
	  if (route.children&&route.children.length){
		  alert("1")
		  route.children = filterAsyncRoutes(route.children)
	  }
	   console.log(route)
	  return true
  })
return accessedRoutes 
}
 */
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
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
   
 export function generaMenu( data) {
	const routes = []
  data.forEach(item => { 
    const menu = {
     path: item.path, 
     component: item.component === 'Layout' ? Layout : () => import(`@/views${item.component}`),
     hidden: false,
	 redirect: item.hasOwnProperty("redirect") ? item.redirect : '',
     children:  [],
     name:  item.name,
     meta:  item.hasOwnProperty("meta") ? item.meta : {}
	 //alwaysShow : item.hasOwnProperty("alwaysShow") ? true : false
    }
	if(item.hidden===true)
		menu.hidden=true
    if (item.children) {
      menu.children = generaMenu(item.children )
    }
	
   routes.push(menu)
	 
  })
 return routes
} 

/* const actions = { 
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
       
          let data = JSON.parse(localStorage.getItem('router')) 
		 // data = JSON.parse(data);
         // Object.assign(loadMenuData, data) 
          generaMenu(asyncRoutes, data)
		  
          let accessedRoutes
          if (roles.includes('admin')) {
            // alert(JSON.stringify(asyncRoutes))
            accessedRoutes = asyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
         } 
        // generaMenu(asyncRoutes, data)
     }).catch(error => {
        console.log(error)
      }) 
    })
  }
}
 */

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
	  let data = JSON.parse(localStorage.getItem('router'))  
      let accessedRoutes  
      accessedRoutes = generaMenu(data)
	  accessedRoutes.push( {
    path: '/perinfo',
    component: Layout,
    children: [
      {
        path: 'perinfo',
        component: () => import('@/views/perinfo/index'),
        name: 'Infos',
        meta: { title: '个人信息', icon: 'icon', noCache: true }
      }
    ]
  }
 )
	  console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
} 

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
