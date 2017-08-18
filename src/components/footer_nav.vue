<template>
	<div class="footer">
		<ul class="flex-box">
			<router-link tag='li' :to="{name:'home'}" class="flex-item"><i class="iconfont icon-logo"></i><p>发现音乐</p></router-link>
			<router-link tag='li' :to="{name:'home'}" class="flex-item"><i class="iconfont icon-music_nav"></i><p>我的音乐</p></router-link>
			<router-link tag='li' :to="{name:'home'}" class="flex-item"><i class="iconfont icon-friends"></i><p>朋友</p></router-link>
			<router-link tag='li' :to="{name:'mine'}" class="flex-item"><i class="iconfont icon-me"></i><p>我的</p></router-link>
		</ul>
	</div>
</template>
<script>
	
</script>
<style scoped>
	.footer{
		width: 100%;
		height: 44px;
	}
	.footer ul{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 44px;
		border-top: 1px solid #f1f1f1;
		background: #fff;
	}
	.footer ul li{
		padding:3px 0;
		height: 44px;
		line-height: 1.2;
		font-size: 10px;
		text-align: center;
		color: #888;
		box-sizing: border-box;
	}
	.footer ul li .iconfont{
		display: inline-block;
		font-size: 20px;
	}
	.footer ul li.router-link-exact-active{
		color: #d43c33;
	}
</style>