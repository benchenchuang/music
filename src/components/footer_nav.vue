<template>
	<div class="footer">
		<ul>
			<li><i class="iconfont icon-logo"></i><p>发现音乐</p></li>
			<li><i class="iconfont icon-music_nav"></i><p>我的音乐</p></li>
			<li><i class="iconfont icon-friends"></i><p>朋友</p></li>
			<li><i class="iconfont icon-me"></i><p>我的</p></li>
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
		display:-moz-box;    
		display:-webkit-box;
		-webkit-box-orient: horizontal;
		display:box;
		box-orient: horizontal;
		display: -webkit-box;
    	display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 44px;
		width: 100%;
		border-top: 1px solid #f1f1f1;
		background: #fff;
	}
	.footer ul li{
		-webkit-box-flex: 1;
		box-flex:1;
		flex: 1;
		flex-grow:1;
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