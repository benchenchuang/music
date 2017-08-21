<template>
	<div>
		<header-tab :title="'账号'" :play='true' :back='false'></header-tab>
		<div class="user-count">
			<div v-if='login'>
				<div class="check" :class="{'check_in':user.pcSign || user.mobileSign}">
					<div  @click="getLabel" v-if="!user.pcSign && !user.mobileSign"><i class="iconfont icon-jifen"></i> 签到</div>
					<div v-else class="get">已签到</div>
				</div>

				<div class="user-info">
					<div class="avatar">
						<img v-lazy="user.profile.avatarUrl" lazy="loading">
					</div>
					<div class="info">
						<h3>{{user.profile.nickname}}</h3>
						<span>会员等级：{{user.level}}</span>
					</div>
				</div>
			</div>

			<div v-else>
				<p class="tip">登陆网易云音乐</p>
				<router-link tag='div' :to="{name:'login'}" class="login_btn">立即登陆</router-link>
			</div>
		</div>
		<div class="user-profile" v-if='login'>
			<ul class="flex-box">
				<li class="flex-item">
					<i class="label">动态</i>
					<p>{{user.profile.eventCount}}</p>
				</li>
				<li class="flex-item">
					<i class="label">关注</i>
					<p>{{user.profile.follows}}</p>
				</li>
				<li class="flex-item">
					<i class="label">粉丝</i>
					<p>{{user.profile.followeds}}</p>
				</li>
				<li class="flex-item">
					<i class="iconfont icon-edit label"></i>
					<i class="label">我的资料</i>
				</li>
			</ul>
		</div>

		<div class="mine-item">
			<ul>
				<set-item :name="'消息中心'" :icon="'msg'"></set-item>
			</ul>

			<ul>
				<set-item :name="'会员中心'" :icon="'v'"></set-item>
				<set-item :name="'商城中心'" :icon="'mall'"></set-item>
				<set-item :name="'设置中心'" :icon="'setting'"></set-item>
			</ul>
		</div>
		

	</div>
</template>
<script>
	import headerTab from '../components/header'
	import setItem from '../components/set-item'
	export default{
		components:{
			headerTab,
			setItem
		},
		data(){
			return{
				user:[],
				login:true
			}
		},
		mounted(){
			this.getUser();
		},
		methods:{
			getUser(){
				var uid=localStorage.getItem('uid');
				if(!uid){
					return this.login=false;
				}
				this.$http.get('/api/user/detail?uid='+uid).then((response)=>{
					console.log(response)
					this.user=response.body;
				})
			},
			getLabel(){
				this.$http.get('/api/daily_signin?type=1').then((response)=>{
					this.user.pcSign=true;
					this.$toast.center('签到成功 +2');
				})
			}
		}
	}
</script>
<style>
	.check.check_in{
		border-color: #f1f1f1;
		color: #999;
	}
	.user-profile ul{
		padding:10px 0;
		border-bottom: 1px solid #f1f1f1;
	}
	.user-profile .flex-item{
		text-align: center;
		border-right: 1px solid #f1f1f1;
		box-sizing: border-box;
	}
	.user-profile .flex-item:last-child{
		border-right: none;
	}
	.user-profile .flex-item .label{
		line-height: 1;
		display: block;
		font-size: 12px;
		color: #999;
	}
	.flex-item .label.iconfont{
		font-size: 18px;
	}
	.user-profile .flex-item p{
		margin-top: 3px;
		color: #474747;
		font-size: 14px;
		line-height: 1;
	}
	.user-count{
		position: relative;
		padding:30px 20px;
		border-bottom: 1px solid #f1f1f1;
	}
	.user-info{
		margin-right: 70px;
	}
	.info{
		margin-left: 60px;
	}
	.info h3{
		font-size: 16px;
		color: #474747;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.info span{
		font-size: 14px;
		color: #888;
	}
	.check{
		position: absolute;
		right:20px;
		top:50%;
		margin-top: -13px;
		float: right;
		width: 64px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		font-size: 12px;
		color: #d43c33;
		border:1px solid #d43c33;
		border-radius: 20px;
	}
	.check .iconfont{
		font-size: 14px;
		padding-right: 2px;
	}
	.avatar{
		float: left;
	}
	.avatar img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.user-count .tip{
		font-size: 13px;
		text-align: center;
		color: #666;
	}
	.user-count .login_btn{
		margin-top: 10px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border:1px solid #e4e4e4;
		text-align: center;
		font-size: 15px;
		color: #666;
		border-radius: 8px;
	}
	.mine-item{
		border-top:10px solid #f5f5f5;
	}
	.mine-item ul{
		border-bottom:10px solid #f5f5f5;
	}
	.mine-item ul .set_item:last-child .item{
		border-bottom: none;
	}
</style>