<template>
	<div class="recommend-person">
		<ul class="flex-box">
			<li class="flex-item">
				<div class="circle">
					<i class="iconfont icon-radio"></i>
				</div>
				<p>私人FM</p>
			</li>
			<li class="flex-item">
				<div class="circle">
					<i class="iconfont icon-date"><span>{{(new Date()).getDate() | toDouble}}</span></i>
				</div>
				<p>每日歌曲推荐</p>
			</li>
			<li class="flex-item">
				<div class="circle">
					<i class="iconfont icon-ranks"></i>
				</div>
				<p>云音乐热榜</p>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		filters:{
			toDouble(value){
				return value<10 ? '0'+value : value;
			}
		}
	}
</script>
<style scoped>
	.recommend-person{
		overflow: hidden;
		border-bottom: 1px solid #f1f1f1;
	}
	.recommend-person ul{
		padding: 20px 0;
	}
	.recommend-person ul li .iconfont{
		font-size: 24px;
		color: #d43c33;
	}
	.recommend-person ul li{
		line-height: 38px;
		font-size: 14px;
		text-align: center;
		color: #666;
	}
	.circle{
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #d43c33;
		margin:0 auto;
	}
	.circle span{
		position: absolute;
		left: 50%;
		top: 56%;
		font-size: 12px;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
	}
	.recommend-person li p{
		margin-top: 7px;
		font-size: 12px;
		line-height: 1.5;
	}
</style>