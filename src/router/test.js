import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/loginmobile',
    component: () => import('@/views/login/indexmb'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forget',
    name: 'hello',
    component: () => import('@/views/forget/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '我的主页', icon: 'dashboard', affix: true }
      }
    ]
  }
   
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [ 
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: '我的工作',
    meta: {
      title: '我的工作',
      icon: 'lock' 
    },
    children: [ 
      {
        path: 'yxtable',
        component: () => import('@/views/table/yx-complex-table'),
        name: 'yxtable',
        meta: {
          title: '批改作业',
          roles: ['批改作业'] 
        }

      },

      {
        path: 'libhw',
        component: () => import('@/views/table/hwlib-complex-table'),
        name: 'libhomework',
        meta: {
          title: '题库',
          roles: ['题库']
           
        }

      },
      {
        path: 'hwexamlib',
        component: () => import('@/views/table/hwexamlib-complex-table'),
        name: 'hwexamlib',
        meta: {
          title: '任务生成',
          roles: ['任务生成']
          
        }

      },
      {
        path: 'libexp',
        component: () => import('@/views/table/lib-experiment'),
        name: 'libexperiment',
        meta: {
          title: '实验库',
          roles: ['实验库']
          // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: 'stuexps',
        component: () => import('@/views/table/stu-experiment'),
        name: 'stuexperiment',
        meta: {
          title: '学生实验详细信息',
          roles: ['学生实验详细信息']
          // if do not set roles, means: this page does not require permission
        },
        hidden: true
      },
      {
        path: 'quesbase',
        component: () => import('@/views/table/quesBase'),
        name: 'questionlib',
        meta: {
          title: '题库详细信息',
          roles: ['题库详细信息']
          // if do not set roles, means: this page does not require permission
        },
        hidden: true
      },
      {
        path: 'stuhw',
        component: () => import('@/views/table/stu-homework'),
        name: 'stuhomework',
        meta: {
          title: '学生作业详细信息',
          roles: ['学生作业详细信息']
          // if do not set roles, means: this page does not require permission
        },
        hidden: true
      },
       
      {
        path: 'studirective',
        component: () => import('@/views/permission/stu-markdown'),
        name: 'stuDirectivePermission',
        meta: {
          title: '我的作业',
          roles: ['我的作业']
          // if do not set roles, means: this page does not require permission
        }
      },
      
      {
        path: 'stuexam',
        component: () => import('@/views/permission/stu-exam'),
        name: 'stuexamination',
        meta: {
          title: '我的考场',
          roles: ['我的考场']
        }
      },
      {
        path: 'kejian',
        component: () => import('@/views/table/my-kejian'),
        name: 'mykejian',
        meta: {
          title: '课堂内容',
          roles: ['课堂内容']
          // if do not set roles, means: this page does not require permission
        }
      
      },
      {
        path: 'libknow',
        component: () => import('@/views/table/know-complex-table'),
        name: 'libknowledge',
        meta: {
          title: '知识点库',
          roles: ['知识点库']
          // if do not set roles, means: this page does not require permission
        }

      },
     
      {
        path: 'kgedit',
        component: () => import('@/views/table/my-knowledge'),
        name: 'kgedit',
        meta: {
          title: '课程图谱',
          roles: ['课程图谱']
          // if do not set roles, means: this page does not require permission
        }

      }

    ]
  },
 
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/role/role'),
        name: 'role',
        meta: { title: '权限管理', icon: 'icon',roles: ['权限管理'] }
      }
    ]
  },
  {
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
  },
 
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
