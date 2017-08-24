<template>
  <div class="list_item">
      <div v-for="(item , index) in items" :key="index" @click='addPlay(items)'>
        <span class="index">{{index+1}}</span>
        <div class="cont">
          <h3>{{item.name}}</h3>
          <p>{{item.ar[0].name}}</p>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props:['items'],
    methods:{
      addPlay(item){
        console.log(item)
        this.$store.commit('addList',item);
      },
    }
  }
</script>
<style scoped>
  .list_item{
    height:41px;
    line-height:40px;
  }
  .list_item .index{
    float: left;
    color: #666;
  }
  .list_item .cont{
    margin-left: 20px;
    line-height:15px;
    font-size: 14px;
    color: #474747;
    padding:5px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .list_item .cont p{
    font-size: 12px;
    color: #999;
  }
</style>
