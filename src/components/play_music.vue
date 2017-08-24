<template>
	<div class="play_music" @click="showPanel">
		<i class="iconfont icon-music"></i>
	</div>
</template>
<script>
	export default{
		name:'musicing',
		computed:{
			songs(){
        return this.$store.state.songList
      }
		},
    methods:{
      showPanel(){
				if(!this.songs.length){
						return this.$toast.center('未添加音乐');
				}
        this.$store.commit('showPanel')
      }
    }
	}
</script>
<style scoped>
	.play_music{
		position: absolute;
		top: 0;
		right: 5px;
	}
	.play_music .icon-music{
		font-size: 20px;
		padding:0 10px;
		color: #666;
	}
</style>
