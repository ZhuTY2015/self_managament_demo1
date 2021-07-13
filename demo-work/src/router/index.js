import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main.vue'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  { path:'/', name:'Login', component:() => import('@/page/Login')},
  { path:'/Login', name:'Login', component:() => import('@/page/Login')},
  {
    path: '/HomePage',
    name: 'HomePage',
    component: Main,
    meta: {
      icon:'',
      title: '首页'
    },
    children:[
      {
        path:'/HomePage',
        meta: {
          icon:'',
          title: '首页'
        },
        // component:Index,
        component:() => import('@/page/HomePage')
      },
    ]
  },
  {
    path: '/System',
    name: 'System',
    component: Main,
    meta: {
      icon: '',
      title: '系统设置'
    },
    children: [
      {
        path:'/User',
        meta: {
          icon:'',
          title: '用户管理'
        },
        // component:Index,
        component:() => import('@/page/SystemManagement/User')
      },
      {
        path:'/Role',
        meta: {
          icon:'',
          title: '角色管理'
        },
        // component:Index,
        component:() => import('@/page/SystemManagement/Role')
      },
      {
        path:'/Power',
        meta: {
          icon:'',
          title: '权限管理'
        },
        // component:Index,
        component:() => import('@/page/SystemManagement/Power')
      },
    ]
  },
  {
    path: '/Report',
    name: 'Report',
    component: Main,
    meta: {
      icon: '',
      title: '报表查询'
    },
    children: [
      {
        path:'/FaultAnalysis',
        meta: {
          icon:'',
          title: '故障分析'
        },
        component:() => import('@/page/reportQuery/FaultAnalysis.vue')
      }
    ]
  }
]


const router = new Router({
  mode:"history",
  routes: routes
})



export default router
