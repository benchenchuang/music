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
				        <swiper-slide  :class="{on:index==0}"  @click.native="getSingleResource">单曲</swiper-slide>
				        <swiper-slide  :class="{on:index==1}"  @click.native="getAlbumResource">专辑</swiper-slide>
				        <swiper-slide  :class="{on:index==2}"  @click.native="getSingerResource">歌手</swiper-slide>
				        <swiper-slide  :class="{on:index==3}"  @click.native="getPlayListResource">歌单</swiper-slide>
				        <swiper-slide  :class="{on:index==4}"  @click.native="getUserResource">用户</swiper-slide>
				        <swiper-slide  :class="{on:index==5}"  @click.native="getMvResource">MV</swiper-slide>
				        <swiper-slide  :class="{on:index==6}"  @click.native="getDjprograms">电台</swiper-slide>
				    </swiper>
				</div>
			</div>
			<div v-show="index==0" v-infinite-scroll="getSingleResource" infinite-scroll-distance="100">
				<single :singles="song" v-for="song in songs" :key='1'></single>
			</div>
			<div v-show="index==1" v-infinite-scroll="getAlbumResource" infinite-scroll-distance="100">
				<album-list :data="album" v-for="album in albums" :key='2'></album-list>
			</div>
			<loader v-if="is_loading"></loader>
		</div>

	</div>
</template>
<script>
	require('../assets/css/swiper-3.4.2.min.css')
	import single from '../components/single'
	import albumList from '../components/album-list'
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
			swiperSlide
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
				start1:0,
				start2:0,
				start3:0,
				start4:0,
				start5:0,
				start6:0,
				start7:0,
				swiperOption: {
		          pagination: '.swiper-pagination',
		          slidesPerView: 4.5,
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
		 	// this.goSearch(this.keywords);
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
			 initSearchList () {
			 	this.songs=[];
				this.albums=[];
				this.singers=[];
				this.playlists=[];
				this.users=[];
				this.mvs=[];
				this.djs=[];
		        this.getSingleResource(); //  获取搜索单曲
		        this.getAlbumResource(); //  获取搜索专辑
		        this.getSingerResource(); //  获取搜索歌手
		        this.getPlayListResource(); //  获取搜索歌单
		        this.getUserResource(); //  获取搜索用户
		        this.getMvResource(); // 获取搜索MV
		        this.getDjprograms();//获取电台
		     },
		     getSingleResource(){
		     	this.index=0;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=1&offset='+this.start1).then((response)=>{
		     		this.songs.push(response.body.result.songs);
		     		this.start1+=1;
		     		this.is_loading=false;
		     	})
		     },
		     getAlbumResource(){
		     	this.index=1;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=10&offset='+this.start2).then((response)=>{
		     		this.albums.push(response.body.result.albums);
		     		this.start2+=1;
		     		this.is_loading=false;
		     		console.log(response)
		     	})
		     },
		     getSingerResource(){
		     	this.index=2;
		     	this.is_loading=true;
		     	this.$http.get('/api/search?keywords='+this.keywords+'&type=100').then((response)=>{
		     		this.singers=response.body.result.singers;
		     		this.is_loading=false;
		     		console.log(response.body)
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