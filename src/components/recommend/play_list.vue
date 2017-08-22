<template>
  <div class="recommend-item" v-if="data">
    <h2 class="item-head" v-if='title'>{{title}}</h2>
    <div>
      <ul>
        <router-link tag="li" :to="{name:type,params:{id:item.id}}" :class="{'item-double':look=='2','item-third':look=='3'}" v-for="item in data" :key="1">
          <div class="pic">
            <img v-if="item.picUrl" v-lazy="item.picUrl" lazy="loading">
            <img v-if="item.coverImgUrl" v-lazy="item.coverImgUrl" lazy="loading">
            <div class="play_label" v-if='count'>
              <i class="iconfont icon-erji"></i>
              <span v-if='item.playCount'>{{item.playCount | getMillons}}</span>
              <span v-if='item.playcount'>{{item.playcount | getMillons}}</span>
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
<style>
  .recommend-item {
    margin: 16px 0;
  }
  .item-head{
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    font-size: 15px;
    color:#666;
    border-left: 3px solid #d43c33;
  }
  .recommend-item ul{
    overflow: hidden;
    width: 100%;
  }
  .recommend-item ul li{
    margin-top: 15px;
  }
  .recommend-item ul li .pic{
    position: relative;
  }
  .item-double .pic img{
    width: 100%;
    height: 45vw;
  }
  .item-third .pic img{
    width: 100%;
    height: 33vw;
  }
  .item-third{
    float: left;
    width: 33.33%;
    padding-right: 4px;
    box-sizing: border-box;
  }
  .item-third:nth-child(3n-1){
    padding:0 2px;
  }
  .item-third:nth-child(3n){
    padding-left:4px;
    padding-right: 0;
  }
  .recommend-item ul li .desc,.artist{
    color: #666;
    padding:2px 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recommend-item ul li .play_label{
    position: absolute;
    top: 2px;
    right: 5px;
    line-height: 1;
    color: #fff;
    font-size: 12px;
  }
  .item-third:nth-child(3n) .play_label{
    right: 3px;
  }

  .item-double,
  .exclusive{
    float: left;
    width: 50%;
    padding-right: 4px;
    box-sizing: border-box;
  }
  .item-double:nth-child(2n),
  .exclusive:nth-child(2){
    padding-left: 4px;
    padding-right: 0;
  }
  .item-double:nth-child(2n) .play_label{
    right: 3px;
  }
  .play_label i.iconfont{
    margin-right: 3px;
  }
  .exclusive:nth-child(3){
    width:100%;
  }
  .artist{
    color: #aaa;
  }
  .play_author{
    position: absolute;
    left: 3px;
    bottom: 3px;
    font-size: 12px;
    color: #fff;
  }
</style>
