<template>
	<div>
		<div class="single" v-for="item in data">
			<div class="avatar"><img v-lazy="item.avatarUrl"></div>
			<div class="desc">
				<h3>{{item.nickname}}</h3>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['data']
	}
</script>
<style scoped>
	.single{
		overflow: hidden;
		margin-top: 5px;
		padding:0 10px;
	}
	.avatar{
		float: left;
		width: 50px;
		height: 70px;
	}
	.avatar img{
		border-radius: 50%;
	}
	.desc{
		padding:5px 0;
		line-height: 2;
		margin-left: 80px;
		height: 60px;
		border-bottom: 1px solid #f1f1f1;
	}
	.desc h3{
		margin-top: 10px;
		font-size: 16px;
		color: #474747;
	}
	.desc p{
		color: #999;
	}
</style>