<template>
	<div>
		<header-tab :title="'账号'" :play='true' :back='false'></header-tab>
	</div>
</template>
<script>
	import headerTab from '../components/header'
	export default{
		components:{
			headerTab
		},
		mounted(){
			this.getUser();

		},
		methods:{
			getUser(){
				var uid=localStorage.getItem('uid');
				this.$http.get('/api/user/subcount?uid=32953014').then(function(response){
					console.log(response);
				})
			}
		}
	}
</script>