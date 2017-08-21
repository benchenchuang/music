<template>
	<div>
		<div class="single" v-for="item in data">
			<div class="avatar"><img v-lazy="item.coverImgUrl"></div>
			<div class="desc">
				<h3 class="cut_txt">{{item.name}}</h3>
				<p>by{{item.creator.nickname}} ,播放 {{item.playCount | getMillion}}万次</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['data'],
		filters:{
			getMillion(value){
				return (value/10000).toFixed(1)
			}
		}
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
		width: 70px;
	}
	.desc{
		padding:5px 0;
		line-height: 2;
		margin-left: 80px;
		height: 60px;
		border-bottom: 1px solid #f1f1f1;
	}
	.desc h3{
		font-size: 16px;
		color: #474747;
	}
	.desc p{
		color: #999;
	}
</style>