<template>
	<div>
		<router-link tag="div" :to="{name:'playlist',params:{id:item.id}}" class="quality_item" v-for="item in items" :key="1">
			<div class="avatar">
				<img v-lazy="item.coverImgUrl" lazy="loading">
				<i class="iconfont icon-huiyuan"></i>
				<div class="count"><i class="iconfont icon-erji"></i>{{item.playCount | getMillons}}</div>
			</div>
			<div class="desc">
				<h3>{{item.name}}</h3>
				<p>by {{item.creator.nickname}}</p>
				<p><span class="tag">{{item.tag}}</span>{{item.copywriter}}</p>
			</div>
		</router-link>
	</div>
</template>
<script>
	export default{
		props:['items'],
		filters:{
			getMillons(value){
				var num=value/10000;
				if(num<1){
					return num.toFixed(1)+'万'
				}else{
					return parseInt(num)+'万'
				}
			}
		}
	}
</script>
<style scoped>
	.quality_item{
		position: relative;
		margin-top: 5px;
		border-bottom: 1px solid #f1f1f1;
		overflow: hidden;
	}
	.avatar{
		position: relative;
		float: left;
		width: 100px;
	}
	.icon-huiyuan{
		position: absolute;
	    left: -18px;
	    top: -4px;
	    font-size: 12px;
	    color: #fff;
	    padding: 5px 20px 1px;
	    background: #eb994c;
		-webkit-transform:rotate(-45deg);
		transform:rotate(-45deg);
	}
	.count{
		position: absolute;
		right: 3px;
		top: 2px;
		font-size: 12px;
		color: #fff;
	}
	.quality_item .desc{
		position: absolute;
		left: 110px;
		right: 10px;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.desc h3{
		font-size: 14px;
		color: #474747;
	}
	.desc p{
		margin-top:3px;
		font-size: 12px;
		color: #999;
	}
	.desc .tag{
		margin-right: 5px;
		padding:0 3px;
		color: #d43c33;
		border:1px solid #d43c33;
	}
</style>
