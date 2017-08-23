<template>
	<div class="play_music" @click="showPanel">
		<i class="iconfont icon-music"></i>
	</div>
</template>
<script>
	export default{
		name:'musicing',
    methods:{
      showPanel(){
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
