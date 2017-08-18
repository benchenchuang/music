<template>
	<div>
		<!-- 广告图 -->
		<slide-bar :data='slide_data'></slide-bar>
		<!-- 私人推荐 -->
		<recommend-person></recommend-person>
		<!-- 推荐歌单 -->
		<recommend-item :title="'推荐歌单'" :data="songList" :count='true' :shape="'music'"></recommend-item>
		<!-- 独家放送 -->
		<recommend-item :title="'独家放送'" :data="exclusive" :count='false'></recommend-item>
		<!-- 最新音乐 -->
		<recommend-item :title="'最新音乐'" :data="newest" :count='false'></recommend-item>
		<!-- 推荐Mv -->
		<recommend-item :title="'推荐MV'" :data="mv" :count='true' :shape="'mv'"></recommend-item>
		<!-- 推荐电台 -->
		<recommend-item :title="'推荐电台'" :data="radios" :count='false'></recommend-item>

	</div>
</template>
<script>
	import slideBar from '../components/slide'
	import recommendPerson from '../components/recommend-person'
	import recommendItem from '../components/recommend-item'
	export default{
		components:{
			slideBar,
			recommendPerson,
			recommendItem
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
				this.$http.get('/api/recommend/resource').then((response)=>{
					this.songList=response.body.recommend;
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
