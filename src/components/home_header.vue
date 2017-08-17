<template>
	<div class="header">
		<div class="header_box">
			<router-link tag='div' :to="{name:'home'}" class="logo"><img src="../assets/images/logo.png"></router-link>
				<div class="search_box">
					<input type="search" placeholder="搜索音乐、歌词、电台">
					<i class="iconfont icon-search"></i>
				</div>
			<play-music></play-music>
		</div>
	</div>
</template>
<script>
	import playMusic from './play_music'
	export default{
		components:{
			playMusic
		}
	}
</script>
<style scoped>
	.header_box{
		border-bottom: none;
	}
	.header_box .logo{
		float: left;
		width: 30px;
		height: 34px;
		padding: 5px 20px 5px 10px;
	}
	.search_box{
		position: relative;
		margin-left: 60px;
		margin-right: 50px;
	}
	.search_box input{
		width: 100%;
		padding-left: 40px;
		padding-right: 10px;
		height: 32px;
		line-height: 32px;
		background: #f1f1f1;
		border-radius: 16px;
		box-sizing: border-box;
	}
	.search_box .icon-search{
		position: absolute;
		top: 0;
		left: 10px;
		color: #aaa;
	}
</style>