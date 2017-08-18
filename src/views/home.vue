<template>
	<div>
		<home-header></home-header>
		<tabs :items='items'></tabs>
		<keep-alive><router-view></router-view></keep-alive>
	</div>
</template>
<script>
	import homeHeader from '../components/home_header'
	import tabs from '../components/tabs'
	
	export default{
		components:{
			homeHeader,
			tabs
		},
		data(){
			return {
				items:[
					{
						title:'个性推荐',
						name:'recommend'
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