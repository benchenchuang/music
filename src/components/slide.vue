<template>
	<div>
		<swiper :options="swiperOption" class='swiper'>
	        <swiper-slide  v-for="item in data" :key='1'>
	        		<a :href="item.url"><img :src="item.pic"></a>
	        </swiper-slide>
	        <div class="swiper-pagination" slot="pagination"></div>
	     </swiper>
	</div>
</template>
<script>
	require('../assets/css/swiper-3.4.2.min.css')
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		props:['data'],
		components:{
			swiper,
			swiperSlide
		},
		data(){
			return{
				swiperOption: {
		          pagination: '.swiper-pagination',
		          autoplay: 3000,
		          slidesPerView: 1,
		          paginationClickable: true,
		          spaceBetween: 0
		          // loop:true
		        }
			}
		}
	}
</script>
<style>
	.swiper-pagination{
		bottom:5px!important;
	}
	.swiper-pagination-bullet{
		background: #fff!important;
	}
</style>
