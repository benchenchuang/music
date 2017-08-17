<template>
	<div>
		<!-- <swiper :options="swiperOption" class='swiper-top'>
	        <swiper-slide  v-for="cast in detail.casts" :key='1'>
	        	<router-link :to="{name:'celebrity',params:{id:cast.id}}">
	        		<img :src="cast.avatars.small">
	        		<p>{{cast.name}}</p>
	        	</router-link>
	        </swiper-slide>
	        <div class="swiper-pagination" slot="pagination"></div>
	     </swiper> -->
	     tem
	</div>
</template>
<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)

	export default{
		components:{
			// swiper,
			// swiperSlide
		},
		data(){
			return{
				swiperOption: {
		          pagination: '.swiper-pagination',
		          slidesPerView: 4,
		          paginationClickable: true,
		          spaceBetween: 10,
		          freeMode: true
		        }
			}
		},
		mounted(){
			this.getSlide();
		},
		methods:{
			getSlide(){
				console.log()
				this.$http.get('/api/program/recommend').then(function(response){
					console.log(response)
				})
			}
		}
	}
</script>
<style>
	
</style>