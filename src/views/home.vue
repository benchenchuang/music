<template>
	<div>
		<home-header></home-header>
		<!-- <tabs :items='items'></tabs> -->
		<div class="tabs">
			<ul class="flex-box">
				<li class="flex-item" :class="{on:type==1}" @click="type=1">个性推荐</li>
				<li class="flex-item" :class="{on:type==2}" @click="type=2">歌单</li>
				<li class="flex-item" :class="{on:type==3}" @click="type=3">主播电台</li>
				<li class="flex-item" :class="{on:type==4}" @click="type=4">排行榜</li>
			</ul>
		</div>
		<div>
			<recommend v-if="type==1"></recommend>
			<song-list v-if="type==2"></song-list>
			<recommend-fm v-if="type==3"></recommend-fm>
			<ranks v-if="type==4"></ranks>
		</div>
	</div>
</template>
<script>
	import homeHeader from '../components/home_header'
	import recommend from '../views/recommend'
	import songList from '../views/song_list'
	import recommendFm from '../views/recommend_fm'
	import ranks from '../views/ranks'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		components:{
			homeHeader,
			recommend,
			songList,
			recommendFm,
			ranks,
			swiper,
			swiperSlide
		},
		data(){
			return {
				type:1
			}
		},
		mounted(){
			console.log(this.Api.getApi())
		}
	}
</script>
<style>
	.tabs{
		width: 100%;
		height: 40px;
	}
	.tabs ul{
		position: fixed;
		left: 0;
		top: 44px;
		height: 40px;
		border-bottom: 1px solid #f1f1f1;
		background: #fff;
		z-index: 99;
		overflow: hidden;
	}

	.tabs ul li{
		height: 38px;
		line-height: 38px;
		font-size: 14px;
		text-align: center;
		color: #666;
	}
	/*.tabs ul li{
		float: left;
		width: 25%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #666;
	}*/
	.tabs ul li.on{
		color: #d43c33;
		height: 38px;
		line-height: 38px;
		border-bottom: 2px solid #d43c33;
	}
</style>
