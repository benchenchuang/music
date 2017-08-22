<template>
	<div>
		<h2 class="item-head mt_20">云音乐官方版</h2>
		<div>
			<ul>
				<li class="official_item" v-for="item in official">
					<div class="avatar"><img v-lazy="item.coverImgUrl" lazy="loading"/></div>
					<div class="top_3" >
						<p class="cut_txt" v-for="(music,index) in item.tracks.slice(0,3)">{{index+1}}.{{music.name}}--{{music.artists[0].name}}</p>
					</div>
				</li>
			</ul>
		</div>
		<loader v-if="official.length<4"></loader>
    <rank-list :title="'云音乐全球版'" :data="globals"></rank-list>
		<loader v-if="globals.length<18"></loader>
	</div>
</template>
<script>
	import rankList from '../components/recommend/rank_list.vue'
	export default{
		components:{
      rankList
		},
		data(){
			return{
				official:[],
				globals:[]
			}
		},
		mounted(){
			this.getOfficalRank();
			this.getGlobalRank();
		},
		methods:{
			getOfficalRank(){
				this.getRank(1);
				this.getRank(2);
				this.getRank(0);
				this.getRank(3);
			},
			getGlobalRank(){
				this.getGlobal(4);
				this.getGlobal(5);
				this.getGlobal(6);
				this.getGlobal(7);
				this.getGlobal(8);
				this.getGlobal(9);
				this.getGlobal(10);
				this.getGlobal(11);
				this.getGlobal(12);
				this.getGlobal(13);
				this.getGlobal(14);
				this.getGlobal(15);
				this.getGlobal(16);
				this.getGlobal(17);
				this.getGlobal(18);
				this.getGlobal(19);
				this.getGlobal(20);
				this.getGlobal(21);
			},
			getRank(value){
				this.$http.get('/api/top/list?idx='+value).then((response)=>{
					this.official.push(response.body.result);
				})
			},
			getGlobal(value){
				this.$http.get('/api/top/list?idx='+value).then((response)=>{
					this.globals.push(response.body.result);
					console.log(response)
				})
			}
		}
	}
</script>
<style scoped>
	.item-head{
		height: 20px;
		line-height: 20px;
		padding-left: 10px;
		font-size: 15px;
		color:#666;
		border-left: 3px solid #d43c33;
	}
	.mt_20{
		margin:20px 0 10px;
	}
	.official_item{
		padding:5px 20px 0 0;
		overflow: hidden;
		border-bottom: 1px solid #f1f1f1;
	}
	.official_item .avatar{
		float: left;
		width: 120px;
	}
	.official_item .top_3{
		margin-top: 16px;
		margin-left:130px;
	}
	.top_3 p{
		font-size: 13px;
		color: #666;
		line-height: 2;
	}
</style>
