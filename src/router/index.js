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
 /* ,
   { 
       
       path : "/perinfo", 
       component : Layout, 
       name : "个人信息", 
       meta : {
   
       }, 
	   alwaysShow:false, 
       hidden : false, 
       children : [
           {
               path : "perinfo", 
               component : () => import('@/views/perinfo/index'), 
               name : "个人信息", 
			   alwaysShow:false, 
               meta : {
                   title : "个人信息", 
                   icon : "icon", 
                   noCache : true
               }
           }
       ]
   } */
     
     
 /* { 
      "_id" : ObjectId("5f92df06dfbc9746824c7bfe"), 
      "path" : "/stu", 
      "component" : "Layout", 
      "redirect" : "/dashboard", 
      "name" : "学生主页", 
      "children" : [
          {
              "path" : "tea", 
              "component" : "/dashboard/stu/index", 
              "name" : "学生主页", 
              "meta" : {
                  "title" : "学生主页", 
                  "icon" : "dashboard", 
                  "affix" : true
              }
          }
      ]
  } */
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]
export const asyncRoutes = [ ]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
/* export const asyncRoutes = [ */
  // {
  //   path: '/classroom',
  //   component: Layout,
  //   children: [{
  //     path: 'classroom',
  //     component: () => import('@/views/classroom/index'),
  //     name: 'classroom',
  //     meta: {
  //       title: '我的课堂',
  //       icon: 'lock',
  //       roles: ['editor', 'tea']
  //     }
  //   }]
  // },
  /* {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '我的工作',
      icon: 'lock',
      roles: ['admin', 'editor', 'tea'] // you can set roles in root nav
    },
    children: [ */
      // {
      //   path: 'page',
      //   component: () => import('@/views/permission/page'),
      //   name: 'PagePermission',
      //   meta: {
      //     title: 'Page Permission',
      //     roles: ['admin', 'tea'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'hwtable',
      //   component: () => import('@/views/table/hw-complex-table'),
      //   name: 'hwtable',
      //   meta: {
      //     title: '预习检查',
      //     roles: ['tea']
      //     // if do not set roles, means: this page does not require permission
      //   }

      // },
     /* {
        path: 'yxtable',
        component: () => import('@/views/table/yx-complex-table'),
        name: 'yxtable',
        meta: {
          title: '批改作业',
          roles: ['tea']
          // if do not set roles, means: this page does not require permission
        } */

     /* },

      {
        path: 'libhw',
        component: () => import('@/views/table/hwlib-complex-table'),
        name: 'libhomework',
        meta: {
          title: '题库',
          roles: ['tea']
          // if do not set roles, means: this page does not require permission
        }

      },
      {
        path: 'hwexamlib',
        component: () => import('@/views/table/hwexamlib-complex-table'),
        name: 'hwexamlib',
        meta: {
          title: '任务生成',
          roles: ['tea']
          // if do not set roles, means: this page does not require permission
        }

      },
      {
        path: 'libexp',
        component: () => import('@/views/table/lib-experiment'),
        name: 'libexperiment',
        meta: {
          title: '实验库',
          roles: ['tea']
          // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: 'stuexps',
        component: () => import('@/views/table/stu-experiment'),
        name: 'stuexperiment',
        meta: {
          title: '学生实验详细信息',
          roles: ['tea']
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
          roles: ['tea']
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
          roles: ['tea']
          // if do not set roles, means: this page does not require permission
        },
        hidden: true
      },
      // {
      //   path: 'stuexamfortea',
      //   component: () => import('@/views/table/stu-exam-fortea'),
      //   name: 'stuexamation',
      //   meta: {
      //     title: '解答详细信息',
      //     roles: ['tea']
      //     // if do not set roles, means: this page does not require permission
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: '学生作业',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //     // if do not set roles, means: this page does not require permission
      //   }
      // },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: '学生实验',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //     // if do not set roles, means: this page does not require permission
      //   }
      // },
      // {
      //   path: 'stuyuxi',
      //   component: () => import('@/views/permission/stu-yuxi'),
      //   name: 'stuyuxi',
      //   meta: {
      //     title: '课前预习',
      //     roles: ['editor']
      //     // if do not set roles, means: this page does not require permission
      //   }
      // },
      {
        path: 'studirective',
        component: () => import('@/views/permission/stu-markdown'),
        name: 'stuDirectivePermission',
        meta: {
          title: '我的作业',
          roles: ['editor']
          // if do not set roles, means: this page does not require permission
        }
      },
      // {
      //   path: 'stuexp',
      //   component: () => import('@/views/permission/stuexp-markdown'),
      //   name: 'stuexperiment',
      //   meta: {
      //     title: '课程实践',
      //     roles: ['editor']
      //   }
      // },
      {
        path: 'stuexam',
        component: () => import('@/views/permission/stu-exam'),
        name: 'stuexamination',
        meta: {
          title: '我的考场',
          roles: ['editor']
        }
      },
      {
        path: 'kejian',
        component: () => import('@/views/table/my-kejian'),
        name: 'mykejian',
        meta: {
          title: '课堂内容',
          roles: ['tea', 'editor']
          // if do not set roles, means: this page does not require permission
        }
      
      },
      {
        path: 'libknow',
        component: () => import('@/views/table/know-complex-table'),
        name: 'libknowledge',
        meta: {
          title: '知识点库',
          roles: ['tea', 'editor']
          // if do not set roles, means: this page does not require permission
        }

      },
      // {
      //   path: 'knowgraph',
      //   component: () => import('@/views/table/knowledge-graph'),
      //   name: 'knowgraph',
      //   meta: {
      //     title: '课程图谱',
      //     roles: ['tea']
      //     // if do not set roles, means: this page does not require permission
      //   }

      // },
      {
        path: 'kgedit',
        component: () => import('@/views/table/my-knowledge'),
        name: 'kgedit',
        meta: {
          title: '课程图谱',
          roles: ['tea', 'editor']
          // if do not set roles, means: this page does not require permission
        }

      }

    ]
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true, roles: ['editor'] }
  //     }
  //   ]
  // },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/role/role'),
        name: 'role',
        meta: { title: '权限管理', icon: 'icon',roles: ['tea'] }
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

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
/*  { path: '*', redirect: '/404', hidden: true }
] */
 
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
