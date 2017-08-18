<template>
	<div class="header_wrap">
		<div class="header_box">
			<i v-if='back' @click='goBack()' class="iconfont icon-left"></i>
			<h3>{{title}}</h3>
			<!-- 是否需要显示播放 -->
			<i v-if='play' class="iconfont icon-music"></i>
		</div>
	</div>
</template>
<script>
	export default{
		props:['title','play','back'],
		methods:{
			goBack(){
				window.history.back();
			}
		}
	}
</script>
<style scoped>
	.header_wrap{
		width: 100%;
		height: 45px;
	}
	.header_box .iconfont{
		position: absolute;
		top: 0;
		padding: 0 10px;
		color: #666;
	}
	.header_box .icon-left{
		font-size: 16px;
		left: 8px;
	}
	.header_box .icon-music{
		font-size: 18px;
		right: 8px;
	}
	.header_box h3{
		font-size: 16px;
		color: #333;
	}
</style>