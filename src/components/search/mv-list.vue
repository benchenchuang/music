<template>
	<div class="mv_box">
		<div class="mv-item" v-for='item in data'>
			<div class="mv-pic">
				<img v-lazy="item.cover"/>
				<div class="play_label">
					<i class="iconfont icon-cameravideo"></i><span>{{item.playCount}}</span>
				</div>
				<div class="play_time">
					{{item.duration | getMinutes}}
				</div>
			</div>
			<h3 class="cut_txt">{{item.name}}</h3>
			<p>{{item.artistName}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		props:['data'],
		filters:{
			getMinutes(value){
				var seconds=(value/1000);
				var getMinute=parseInt(seconds/60);
				var getSecond=(seconds%60);
				return getDouble(getMinute)+':'+getDouble(getSecond);

				function getDouble(value){
					return value<10 ? '0'+value : value;
				}
			}
		},
		methods:{
			
		}
	}
</script>
<style scoped>
	.mv_box{
		overflow: hidden;
	}
	.mv-pic{
		position: relative;
		z-index: -1;
	}
	.mv-pic img{
		width: 100%;
		height: 25vw;
	}
	.mv-item{
		margin-bottom: 15px;
		float: left;
		width: 50%;
		padding-right: 2px;
		box-sizing: border-box;
	}
	.mv-item:nth-child(2n){
		padding-left: 2px;
		padding-right: 0;
	}
	.play_label{
		position: absolute;
		right: 6px;
		top: 1px;
		color: #fff
	}
	.mv-item:nth-child(2n) .play_label{
		right: 3px;
	}
	.play_label .iconfont{
		margin-right:3px;
	}
	.play_time{
		position: absolute;
		left: 3px;
		bottom: 2px;
		color: #fff;
	}
	.mv-item:nth-child(2n) .play_time{
		left: 6px;
	}
	.mv-item h3,
	.mv-item p{
		text-indent: 5px;
	}
	.mv-item h3{
		font-size: 14px;
		color: #474747;
	}
	.mv-item p{
		color: #999;
	}
</style>