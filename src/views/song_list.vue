<template>
	<div>
		<router-link tag='div' :to="{name:'quality'}" class="quality_ad">
			<div class="quality_img fl">
				<img v-lazy='quality.coverImgUrl' lazy="loading">
			</div>
			<div class="quality_desc">
				<div class="title"><i class="iconfont icon-huiyuan"></i>精品歌单<i class="iconfont icon-right"></i></div>
				<p class="txt cut_txt">{{quality.name}}</p>
				<p class="cut_txt">{{quality.copywriter}}</p>
			</div>
		</router-link>

		<div class="song_tab">
			<ul class="flex-box">
				<li class="flex-item new" :class="{on:is_new}" @click="is_new=true">最新</li>
				<li class="flex-item hot" :class="{on:!is_new}" @click="is_new=false">最热</li>
			</ul>
		</div>

		<div v-if="is_new" v-infinite-scroll="getNewList" infinite-scroll-distance="100">
			<keep-alive><recommend-item :title="''" :look='2' :data="newList" :count='false'></recommend-item></keep-alive>
			<loader v-if="is_loading"></loader>
		</div>
		<div v-if="!is_new" v-infinite-scroll="getHotList" infinite-scroll-distance="100">
			<keep-alive><recommend-item :title="''" :look='2' :data="hotList" :count='true' :shape="'music'"></recommend-item></keep-alive>
			<loader v-if="is_loading"></loader>
		</div>
	</div>
</template>
<script>
	import recommendItem from '../components/recommend-item'
	import Vue from 'vue';
	  //滚动
	import infiniteScroll from 'vue-infinite-scroll'
	Vue.use(infiniteScroll);
	export default{
		components:{
			recommendItem
		},
		data(){
			return{
				quality:[],
				newList:[],
				hotList:[],
				is_new:true,
				new_count:20,
				hot_count:20,
				is_loading:true
			}
		},
		mounted(){
			this.getSongList();
			this.getNewList();
			this.getHotList();
		},
		methods:{
			getSongList(){
				this.$http.get('/api/top/playlist/highquality?limit=20').then((response)=>{
					this.quality=response.body.playlists[0];
				})
			},
			getNewList(){
				var total;
				if(this.new_count>=total){
					this.is_loading=false;
					return;
				}
				this.is_loading=true
				this.$http.get('/api/top/playlist?limit='+this.new_count+'&order=new').then((response)=>{
					total=response.body.total;
					this.is_loading=false
					this.newList=response.body.playlists;
					this.new_count+=20;
				})
			},
			getHotList(){
				var total;
				if(this.hot_count>=total){
					this.is_loading=false;
					return;
				}
				this.is_loading=true
				this.$http.get('/api/top/playlist?limit='+this.hot_count+'&order=hot').then((response)=>{
					total=response.body.total;
					this.is_loading=false
					this.hotList=response.body.playlists;
					this.hot_count+=20;
				})
			}
		}
	}
</script>
<style scoped>
	.quality_ad{
		padding: 20px;
		background: #666;
		overflow: hidden;
	}
	.quality_img,
	.quality_img img{
		width: 90px;
	}
	.quality_desc{
		margin-left:100px;
	}
	.title{
		font-size: 18px;
		color: #fff;
	}
	.title .icon-huiyuan{
		font-size: 20px;
		color: #eb994c;
		margin-right: 5px;
	}
	.title .icon-right{
		font-size: 14px;
		color: #ccc;
		margin-left:5px;
		vertical-align: text-bottom;
	}
	.quality_desc p{
		line-height: 1.8;
		font-size: 12px;
		color: #999;
	}
	.quality_desc .txt{
		font-size: 15px;
		color: #fff;
	}
	.song_tab{
		padding:20px 40px 0;
	}
	.song_tab .flex-item{
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #666;
		border-radius: 15px;
		border:1px solid #d43c33;
	}
	.flex-item.new{
		border-top-right-radius: 0;
		border-bottom-right-radius: 0
	}
	.flex-item.hot{
		border-left: 0;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0
	}
	.flex-item.on{
		color: #fff;
		background: #d43c33
	}
</style>