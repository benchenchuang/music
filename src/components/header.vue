<template>
	<div class="header_wrap">
		<div class="header_box" :class="{'unbg':bg}">
			<i v-if='back' @click='goBack()' class="iconfont icon-left"></i>
			<h3>{{title}}</h3>
			<!-- 是否需要显示播放 -->
			<i v-if='play' @click="showPanel" class="iconfont icon-music"></i>
		</div>
	</div>
</template>
<script>
	export default{
		props:['title','play','back','bg'],
		methods:{
			goBack(){
				window.history.back();
			},
      showPanel(){
			  this.$store.commit('showPanel')
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
  .header_box.unbg{
    background: none;
    border-bottom: none;
  }
  .header_box.unbg i,
  .header_box.unbg h3{
    color: #fff;
  }
</style>
