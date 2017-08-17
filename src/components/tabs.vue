<template>
	<div class="tabs">
		<ul>
			<router-link tag='li' v-for="item in items" :to="{name:item.name}" :key='0'>{{item.title}}</router-link>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'tabs',
		props:['items']
	}
</script>
<style>
	.tabs{
		width: 100%;
		height: 40px;
	}
	.tabs ul{
		display:-moz-box;    
		display:-webkit-box;
		-webkit-box-orient: horizontal;
		display:box;
		box-orient: horizontal;
		display: -webkit-box;
    	display: flex;
		position: fixed;
		left: 0;
		top: 44px;
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #f1f1f1;
		background: #fff;
		z-index: 99;
		overflow: hidden;
	}

	.tabs ul li{
		-webkit-box-flex: 1;
		box-flex:1;
		flex: 1;
		flex-grow:1;
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
	.tabs ul li.router-link-exact-active{
		color: #d43c33;
		height: 38px;
		line-height: 38px;
		border-bottom: 2px solid #d43c33;
	}
</style>