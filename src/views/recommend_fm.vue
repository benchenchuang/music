<template>
	<div>
		<keep-alive><recommend-item :title="'精选电台'" :look='3' :data="recommends" :count='false' :category="true"></recommend-item></keep-alive>
		<div class="fm_category">
			<h2 class="item-head" v-if="categories.length">电台分类</h2>
			<ul>
				<li class="category" v-for='category in categories'>
					<div class="cate">
						<img v-lazy="category.pic56x56Url"><p class="name">{{category.name}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import recommendItem from '../components/recommend-item'
	export default{
		components:{
			recommendItem
		},
		data(){
			return{
				recommends:[],
				categories:[]
			}
		},
		mounted(){
			this.getRecommend();
			this.getCategory();
		},
		methods:{
			getRecommend(){
				this.$http.get('/api/dj/recommend').then((response)=>{
					this.recommends=response.body.djRadios.slice(0,6);
				})
			},
			getCategory(){
				this.$http.get('/api/dj/catelist').then((response)=>{
					console.log(response)
					this.categories=response.body.categories;
				})
			}
		}
	}
</script>
<style>
	.fm_category ul{
		margin-top: 10px;
		overflow: hidden;
	}
	.category:nth-child(1),
	.category:nth-child(2){
		border-top: 1px solid #f1f1f1;
	}
	.category:nth-child(2n-1) .cate{
		border-right: 1px solid #f1f1f1;
	}
	.category{
		padding: 10px 20px;
		float: left;
		width: 50%;
		border-bottom: 1px solid #f1f1f1;
		box-sizing: border-box;
	}
	.cate{
		height: 28px;
		line-height: 28px;
	}
	.cate .name{
		font-size: 14px;
		color: #474747;
		margin-left:45px;
	}
	.cate img{
		margin-left:5px;
		float: left;
		width: 28px;
	}
</style>