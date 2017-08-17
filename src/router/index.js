import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
const Home =resolve => require(['@/views/home'],resolve)
const RecommendSong=resolve => require(['@/views/song_list'],resolve)
const RecommendFm=resolve => require(['@/views/recommend_fm'],resolve)
const RecommendRank=resolve => require(['@/views/ranks'],resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children:[
      	{
      		path:'/',
      		name:'home',
      		component:Home,
      		children:[
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
      	}
      ]
    }
  ]
})
