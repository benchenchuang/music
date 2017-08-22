<template>
  <div class="cover">
      <i class="iconfont icon-del" @click="delMask"></i>
      <div class="head">
        <img v-lazy="desc.picUrl">
      </div>
      <h3 class="name">{{desc.name}}</h3>
      <p class="description">{{desc.description}}</p>
      <p class="tag">标签：<span v-for="label in desc.tags">{{label}}</span></p>
     <img v-if="desc.coverImgUrl" class="mask" v-lazy="desc.coverImgUrl">
     <img v-if="desc.picUrl" class="mask" v-lazy="desc.picUrl">
  </div>
</template>
<script>
  export default{
    props:['desc'],
    methods:{
      delMask(){
        this.$emit('cancel')
      }
    }
  }
</script>
<style scoped>
  .cover .name{
    margin-top: 10px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .cover .description{
    margin-top: 10px;
  }
  .cover .tag{
    margin-top: 10px;
  }
  .tag span{
    margin:0 5px;
    padding:2px 10px;
    border:1px solid #fff;
    border-radius:11px;
  }
  .cover{
    position: fixed;
    top:0;
    left: 0;
    padding:0 20px 10px;
    width:100%;
    height:100%;
    overflow-y: scroll;
    z-index: 999;
    color: #fff;
    background: #000;
    box-sizing: border-box;
  }
  .cover .icon-del{
    position: absolute;
    right:20px;
    top:10px;
    font-size: 20px;
  }
  .cover .mask{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    height:100%;
    -webkit-filter: blur(60px);
    filter: blur(60px);
    z-index: -1;
  }
  .head{
    padding-top: 50px;
    width:180px;
    margin:0 auto;
  }
</style>
