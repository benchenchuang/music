<template>
	<div>
		<home-header></home-header>
		<tabs :items='items'></tabs>
		<router-view></router-view>
		<footer-nav></footer-nav>
	</div>
</template>
<script>
	import homeHeader from '../components/home_header'
	import tabs from '../components/tabs'
	import footerNav from '../components/footer_nav'
	export default{
		components:{
			homeHeader,
			tabs,
			footerNav
		},
		data(){
			return {
				items:[
					{
						title:'个性推荐',
						name:'home'
					},
					{
						title:'歌单',
						name:'recommend_song'
					},
					{
						title:'主播电台',
						name:'recommend_fm'
					},
					{
						title:'排行榜',
						name:'recommend_rank'
					}
				]
			}
		},
		mounted(){
			console.log(this.Api.getApi())
		}
	}
</script>
<style>
	
</style>