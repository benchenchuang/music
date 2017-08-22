<template>
  <div class="recommend-item" v-if="data">
    <h2 class="item-head" v-if='title'>{{title}}</h2>
    <div>
      <ul>
        <router-link tag="li" :to="{name:type,params:{id:item.id}}" class="item-third" v-for="item in data" :key="1">
          <div class="pic">
            <img v-lazy="item.picUrl" lazy="loading">
            <div class="play_author">
              <p class="cut_txt">{{item.category}}</p>
            </div>
          </div>
          <p class="desc">{{item.name}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    props:['title','data','look','count','shape','category','type'],
    data(){
      return{
      }
    },
    filters:{
      getMillons(value){
        var num=value/10000;
        if(num<1){
          return num.toFixed(1)+'万'
        }else{
          return parseInt(num)+'万'
        }

      }
    }
  }
</script>
