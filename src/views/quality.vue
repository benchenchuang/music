<template>
	<div>
		<header-tab :title="'精品歌单'" :back="true" :play="true"></header-tab>
		<div v-infinite-scroll="getQuality" infinite-scroll-distance="100">
			<quality-item :items="items"></quality-item>
		</div>
		<loader v-if='loading'></loader>
	</div>
</template>
<script>
	import headerTab from '../components/header'
	import qualityItem from '../components/quality_item'
	import Vue from 'vue';
	  //滚动
	import infiniteScroll from 'vue-infinite-scroll'
	Vue.use(infiniteScroll);
	export default{
		components:{
			headerTab,
			qualityItem
		},
		data(){
			return{
				count:20,
				items:[],
				loading:true,
				over:false
			}
		},
		mounted(){
			this.getQuality();
		},
		methods:{
			getQuality(){
				this.loading=true;
				this.$http.get('/api/top/playlist/highquality?limit='+this.count).then((response)=>{
					this.loading=false;
					this.items=response.body.playlists;
					this.count+=20;
				})
			}
		}
	}
</script>
<style>
	
</style>