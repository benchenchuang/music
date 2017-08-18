<template>
	<div>
		<header-tab :title="'登录'" :play='false' :back='true'></header-tab>
		<div class="user_login">
			<div class="login_item">
				<i class="iconfont icon-phone"></i>
				<input type="num" placeholder="请输入手机号" v-model='user_name'>
			</div>
			<div class="login_item">
				<i class="iconfont icon-password"></i>
				<input type="password" placeholder="请输入密码" v-model='user_pwd'>
			</div>
			<div class="login_item" style="margin-top:30px;">
				<div class='btn'  @click="getLogin">登 录</div>
			</div>
			<p class="tip">仅限注册网易云音乐用户登录</p>
		</div>
	</div>
</template>
<script>
	import headerTab from '../components/header'
	export default{
		components:{
			headerTab
		},
		data(){
			return{
				user_name:'',
				user_pwd:''
			}
		},
		methods:{
			getLogin(){
				localStorage.setItem('uid', 123);
				var patten=/^1[3|5|7|8|]\d{9}/;
				try{
					if(!patten.test(this.user_name)){
						throw new Error('手机号不正确');
					}
					if(this.user_name.lnegth<6){
						throw new Error('密码不能少于6位');
					}
				}catch(e){
					this.$toast.center(e.message);
					return;
				}
				this.$toast.center('登录中...')
				this.$http.get('/api/login/cellphone?phone='+this.user_name+'&password='+this.user_pwd).then((response)=>{
					console.log(response)
					// if(response.body.code==200){
					// 	localStorage.setItem('uid', response.body.account.id);
					// 	window.location.href='/'
					// }else{
					// 	this.$toast.center('手机号或密码不正确');
					// }
					
				})
			}
		}
	}
</script>
<style scoped>
	.user_login{
		padding:20px;
	}
	.user_login .login_item{
		position: relative;
		margin-top: 10px;
		font-size: 18px;
	}
	.login_item input{
		display: block;
		width: 100%;
		height: 44px;
		line-height: 44px;
		padding:5px 0 5px 30px;
		font-size: 14px;
		box-sizing: border-box;
		border-bottom: 1px solid #f1f1f1;
	}
	.login_item .iconfont{
		position: absolute;
		left: 3px;
		top: 50%;
		color: #999;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.btn{
		display: block;
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align:center;
		color: #fff;
		background: #d43c33;
		border-radius: 22px;
	}
	.tip{
		margin-top: 10px;
		font-size: 12px;
		text-align: center;
		color: #999;
	}
</style>