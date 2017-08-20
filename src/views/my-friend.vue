<template>
	<div>
		<common-header :title="'我的朋友'" :play='true'></common-header>
		<loader v-if='loading'></loader>
		<p v-else class="tip">暂无相关接口</p>
	</div>
</template>
<script>
	import commonHeader from '../components/header'
	export default{
		components:{
			commonHeader
		},
		data(){
			return{
				loading:true
			}
		},
		mounted(){
			setTimeout(()=>{
				this.loading=false
			},2000)
		}
	}
</script>
<style>
	.tip{
		margin-top: 20px;
		text-align: center;
		font-size: 13px;
		color: #999;
	}
</style>