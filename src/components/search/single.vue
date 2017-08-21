<template>
	<div>
		<div class="single" v-for="item in singles">
			<h3>{{item.name}}</h3>
			<p><span v-for="author in item.artists">{{author.name}} </span> - {{item.album.name}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		props:['singles']
	}
</script>
<style scoped>
	.single{
		margin:0 20px;
		padding:10px 0;
		border-bottom: 1px solid #f1f1f1;
	}
	.single h3{
		font-size: 15px;
		color: #0c73c2;
	}
	.single p{
		font-size: 12px;
		color: #999;
	}
</style>