<template>
	<div>
		<!-- 广告图 -->
		<slide-bar :data='slide_data'></slide-bar>
		<!-- 私人推荐 -->
		<recommend-person></recommend-person>
		<!-- 推荐歌单 -->
		<play-list :title="'推荐歌单'" :type="'playlist'" :look="3" :data="songList" :count="true"></play-list>
		<!-- 独家放送 -->
		<only-list :title="'独家放送'" :data="exclusive"></only-list>
		<!-- 最新音乐 -->
		<new-list :title="'最新音乐'" :type="'album'" :data="newest"></new-list>
		<!-- 推荐Mv -->
		<mv-list :title="'推荐MV'" :data="mv"></mv-list>
		<!-- 推荐电台 -->
		<dj-list :title="'推荐电台'" :data="radios"></dj-list>

	</div>
</template>
<script>
	import slideBar from '../components/slide'
	import recommendPerson from '../components/recommend-person'
	import playList from '../components/recommend/play_list.vue'
	import onlyList from '../components/recommend/only_list.vue'
	import newList from '../components/recommend/new_list.vue'
	import mvList from '../components/recommend/mv_list.vue'
	import djList from '../components/recommend/dj_list.vue'
	export default{
		components:{
			slideBar,
			recommendPerson,
      playList,
      onlyList,
      newList,
      mvList,
      djList
		},
		data(){
			return{
				slide_data:[],
				songList:[],
				exclusive:[],
				newest:[],
				mv:[],
				radios:[]
			}
		},
		mounted(){
			this.getSlide();
			this.getSongList();
			this.getExclusive();
			this.getNewest();
			this.getMv();
			this.getRadio();
		},
		methods:{
			getSlide(){
				this.$http.get('/api/banner').then((response)=>{
					this.slide_data=response.body.banners;
				})
			},
			getSongList(){
				this.$http.get('/api/personalized').then((response)=>{
					this.songList=response.body.result;
				})
			},
			getExclusive(){
				this.$http.get('/api/personalized/privatecontent').then((response)=>{
					this.exclusive=response.body.result;
				})
			},
			getNewest(){
				this.$http.get('/api/personalized/newsong').then((response)=>{
					this.newest=response.body.result.slice(0,9);
				})
			},
			getMv(){
				this.$http.get('/api/personalized/mv').then((response)=>{
					this.mv=response.body.result;
				})
			},
			getRadio(){
				this.$http.get('/api/personalized/djprogram').then((response)=>{
					this.radios=response.body.result;
				})
			}
		}
	}
</script>
