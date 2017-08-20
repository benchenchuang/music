<template>
	<div class="set_item">
		<i class="iconfont" :class="'icon-'+icon"></i>
		<div class="item">
			<span>{{name}}</span>
			<i class="iconfont icon-right"></i>
		</div>
	</div>
</template>
<script>
	export default{
		props:['name','icon']
	}
</script>
<style scoped>
	.set_item{
		padding:1px 20px;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
	}
	.set_item .iconfont{
		color: #999;
	}
	.set_item > .iconfont{
		float: left;
		font-size: 22px;
	}
	.set_item .item{
		margin-left:36px;
		font-size: 14px;
		color: #474747;
		border-bottom: 1px solid #f1f1f1;
	}
	.set_item .item .iconfont{
		float: right;
		font-size: 13px;
	}
</style>