<template>
	<div>
		<router-view></router-view>
		<footer-nav></footer-nav>
	</div>
</template>
<script>
	import footerNav from '../components/footer_nav'
	export default{
		components:{
			footerNav
		},
	}
</script>
<style>
	
</style>