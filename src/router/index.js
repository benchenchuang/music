import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
//首页
const Home =resolve => require(['@/views/home'],resolve)
const Recommend=resolve => require(['@/views/recommend'],resolve)
const RecommendSong=resolve => require(['@/views/song_list'],resolve)
const RecommendFm=resolve => require(['@/views/recommend_fm'],resolve)
const RecommendRank=resolve => require(['@/views/ranks'],resolve)

//我的
const Mine=resolve => require(['@/views/mine'],resolve)
const Login=resolve => require(['@/views/login'],resolve)

Vue.use(Router)

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
      		component:Home,
      		children:[
            {
              path:'/',
              name:'recommend',
              component:Recommend
            },
      			{
      				path:'/recommend_song',
      				name:'recommend_song',
      				component:RecommendSong
      			},
      			{
      				path:'/recommend_fm',
      				name:'recommend_fm',
      				component:RecommendFm
      			},
      			{
      				path:'/recommend_rank',
      				name:'recommend_rank',
      				component:RecommendRank
      			}
      		]
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
    }
  ]
})
