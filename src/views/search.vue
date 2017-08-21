<template>
	<div>
		<div class="search_wrap">
			<div class="search_header">
				<div class="cancle" @click='goBack'>取消</div>
				<div class="serach_box">
					<input type="search" @keyup="searchTip(keywords)" @keyup.enter="goSearch(keywords)" v-focus.inserted placeholder="搜索音乐、歌词、电台" v-model="keywords">
					<i class="iconfont icon-search"></i>
				</div>
			</div>
		</div>
		<!-- 热门搜索 -->
		<div class="search_hot" v-if="!keywords">
			<h3 class="s_title">热门搜索</h3>
			<ul class="hot_box">
				<li @click="goSearch(hot)" v-for='hot in hots'>{{hot}}</li>
			</ul>
		</div>
		<!-- 搜索建议 -->
		<div class="suggest" v-if="keywords && is_suggest">
			<h3 class="s_title tip">搜索："{{keywords}}"</h3>
			<ul class="suggest_box">
				<li @click="goSearch(item.name)" v-for="item in suggest.albums">{{item.name}}</li>
				<li @click="goSearch(item.name)" v-for="item in suggest.artists">{{item.name}}</li>
				<li @click="goSearch(item.name)" v-for="item in suggest.mvs">{{item.name}}</li>
				<li @click="goSearch(item.name)" v-for="item in suggest.playlists">{{item.name}}</li>
				<li @click="goSearch(item.name)" v-for="item in suggest.songs">{{item.name}}</li>
			</ul>
		</div>
		<!-- 搜索结果 -->
		<div v-if="keywords && !is_suggest">
			<div class="search_tab">
				<div class='swiper-head'>
					<swiper :options="swiperOption" >
				        <swiper-slide :class="{on:index==0}" @click.native="getSingleResource">单曲</swiper-slide>
				        <swiper-slide :class="{on:index==1}" @click.native="getAlbumResource">专辑</swiper-slide>
				        <swiper-slide :class="{on:index==2}" @click.native="getSingerResource">歌手</swiper-slide>
				        <swiper-slide :class="{on:index==3}" @click.native="getPlayListResource">歌单</swiper-slide>
				        <swiper-slide :class="{on:index==4}" @click.native="getUserResource">用户</swiper-slide>
				        <swiper-slide :class="{on:index==5}" @click.native="getMvResource">MV</swiper-slide>
				        <swiper-slide :class="{on:index==6}" @click.native="getDjprograms">电台</swiper-slide>
				    </swiper>
				</div>
			</div>
			<div v-if="index==0">
				<single :singles="songs"></single>
			</div>
			<div v-if="index==1">
				<album-list :data="albums"></album-list>
			</div>
			<div v-if="index==2">
				<singer-list :data="singers"></singer-list>
			</div>
			<div v-if="index==3">
				<play-list :data="playlists"></play-list>
			</div>
			<div v-if="index==4">
				<user-list :data="users"></user-list>
			</div>
			<div v-if="index==5">
				<mv-list :data="mvs"></mv-list>
			</div>
			<div v-if="index==6">
				<radio-list :data="djs"></radio-list>
			</div>
			<loader v-if="is_loading"></loader>
		</div>

	</div>
</template>
<script>
	require('../assets/css/swiper-3.4.2.min.css')
	import single from '../components/search/single'
	import albumList from '../components/search/album-list'
	import singerList from '../components/search/singer-list'
	import playList from '../components/search/play-list'
	import userList from '../components/search/user-list'
	import radioList from '../components/search/radio-list'
	import mvList from '../components/search/mv-list'
	import Vue from 'vue';
	  //滚动
	import infiniteScroll from 'vue-infinite-scroll'
	Vue.use(infiniteScroll);
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		components:{
			single,
			albumList,
			swiper,
			swiperSlide,
			singerList,
			playList,
			userList,
			radioList,
			mvList
		},
		data(){
			return{
				keywords:this.$route.query.keywords,
				suggest:[],
				is_suggest:true,
				hots:['林俊杰','陈奕迅','中国新歌声','毛不易','薛之谦','周杰伦','郭德纲'],
				songs:[],
				albums:[],
				singers:[],
				playlists:[],
				users:[],
				mvs:[],
				djs:[],
				index:0,
				swiperOption: {
		          pagination: '.swiper-pagination',
		          slidesPerView: 4.7,
		          paginationClickable: true,
		          spaceBetween: 20
		        },
		        is_loading:true
			}
		},
		 directives: {
		    focus: {
		      inserted: function (el) {
		        el.focus()
		      }
		    }
		 },
		 created(){
		 	this.goSearch(this.keywords);
		 },
		 methods:{
			goBack(){
				this.$router.push({
		          path: '/'
		        });
		        this.keywords='';
			},
			goSearch(keywords){
				this.keywords = keywords;
		        if (this.keywords.trim()) {
				  this.is_suggest=false;
		          this.$router.push({
		            path: '/search',
		            query: {
		              keywords: keywords
		            }
		          });
		          // this.initSearchList();
		          this.getSingleResource();
		        }
			},
			searchTip(value){
				if(!value){
					this.suggest=[];
					this.result=[];
					this.$router.push({
		            path: '/search',
		            query: {
		              keywords:''
		            }
		          });
					return;
				}
				this.is_suggest=true;
				this.$router.push({
		            path: '/search',
		            query: {
		              keywords:value
		            }
		          });
				this.$http.get('/api/search/suggest?keywords='+value).then((response)=>{
					this.suggest=response.body.result;
					// console.log(this.suggest)
				})
			},
		     getSingleResource(){
		     	this.index=0;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1&offset=0').then((response)=>{
		     		this.songs=response.body.result.songs;
		     		this.is_loading=false;
		     	})
		     },
		     getAlbumResource(){
		     	this.index=1;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=10&offset=0').then((response)=>{
		     		this.albums=response.body.result.albums;
		     		this.is_loading=false;
		     	})
		     },
		     getSingerResource(){
		     	this.index=2;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=100').then((response)=>{
		     		this.singers=response.body.result.artists;
		     		this.is_loading=false;
		     	})
		     },
		     getPlayListResource(){
		     	this.index=3;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1000').then((response)=>{
		     		this.playlists=response.body.result.playlists;
		     		this.is_loading=false;
		     		console.log(response.body)
		     	})
		     },
		     getUserResource(){
		     	this.index=4;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1002').then((response)=>{
		     		this.users=response.body.result.userprofiles;
		     		this.is_loading=false;
		     		console.log(response.body)
		     	})
		     },
		     getMvResource(){
		     	this.index=5;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1004').then((response)=>{
		     		this.mvs=response.body.result.mvs;
		     		this.is_loading=false;
		     		console.log(response.body)
		     	})
		     },
		     getDjprograms(){
		     	this.index=6;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1009').then((response)=>{
		     		this.djs=response.body.result.djprograms;
		     		this.is_loading=false;
		     		console.log(response.body)
		     	})
		     }

		}
	}
</script>
<style scoped>
	.search_wrap{
		width: 100%;
		height: 45px;
	}
	.search_header{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	.cancle{
		float: right;
		width: 60px;
		text-align: center;
		font-size: 13px;
		color: #999;
	}
	.serach_box{
		position: relative;
		margin: 5px 70px 5px 20px;
	}
	.serach_box input{
		display: block;
		width: 100%;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		padding:3px 10px 3px 40px;
		background: #f5f5f5;
		border-radius: 17px;
	}
	.serach_box .iconfont{
		position: absolute;
		left: 14px;
		top: -5px;
		color: #aaa;
	}
	.search_hot,
	.suggest{
		padding: 20px;
	}
	.s_title{
		font-size: 13px;
		color: #999;
	}
	.hot_box{
		overflow: hidden;
	}
	.hot_box li{
		float: left;
		margin-top: 10px;
		margin-right: 10px;
		padding:0 20px;
		height: 30px;
		line-height: 30px;
		color: #474747;
		border:1px solid #f1f1f1;
		border-radius: 15px;
	}
	.tip{
		color: #d43c33;
	}
	.suggest_box li{
		width: 100%;
		height: 36px;
		line-height: 36px;
		color: #999;
		padding-left: 10px;
		border-bottom: 1px solid #f1f1f1;
		box-sizing: border-box;
	}
	.search_tab{
		height: 41px;
		width: 100%;
	}
	.swiper-head{
		position: fixed;
		width: 100%;
		left: 0;
		top: 45px;
		height: 40px;
		line-height: 40px;
		font-size: 13px;
		color: #666;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
		text-align: center;
	}
	.swiper-head .on{
		color: #d43c33;
		border-bottom: 2px solid #d43c33;
	}
</style>