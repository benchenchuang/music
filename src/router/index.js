import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
//首页
const Home =resolve => require(['@/views/home'],resolve)
const Quality=resolve => require(['@/views/quality'],resolve)

const Search =resolve => require(['@/views/search'],resolve)
//我的音乐
const Music=resolve => require(['@/views/my-music'],resolve)
const Friend=resolve => require(['@/views/my-friend'],resolve)
//我的
const Mine=resolve => require(['@/views/mine'],resolve)
const Login=resolve => require(['@/views/login'],resolve)

//音乐列表
const PlayList=resolve => require(['@/views/play_list'],resolve)
const Album=resolve => require(['@/views/album_list'],resolve)



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name:'main',
      component: Main,
      children:[
      	{//首页
      		path:'/',
      		name:'home',
      		component:Home
      	},
        {//我的音乐
          path:'/music',
          name:'music',
          component:Music
        },{//我的朋友
          path:'/friend',
          name:'friend',
          component:Friend
        },{//我的
          path:'mine',
          name:'mine',
          component:Mine
        }
      ]
    },{
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/song/quality',
      name:'quality',
      component:Quality
    },
    {
      path:'/search',
      name:'search',
      component:Search
    },{
      path:'/playlist/:id',
      name:'playlist',
      component:PlayList
    },{
      path:'/album/:id',
      name:'album',
      component:Album
    }
  ]
})
