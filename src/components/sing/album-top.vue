<template>
  <div>
    <div class="top">
      <song-head :title="'专辑'" :back="true" :play="true" :bg="bg" id="tab"></song-head>
      <div class="top_box">
        <div class="top-con">
          <div class="avatar" @click="showDesc">
            <img v-lazy="data.picUrl">
          </div>
          <div class="txt">
            <h3 class="head">{{data.name}} ({{data.alias[0]}})</h3>
            <p class="creator">歌手：{{data.artist.name}}<i class="iconfont icon-right"></i></p>
            <p class="creator">发行时间：{{data.publishTime | getDate}}</p>
          </div>
        </div>
      </div>
      <top-count :info="data.info"></top-count>
      <img class="top_bg" v-lazy="data.blurPicUrl">
    </div>
    <cover-mask :desc="data" v-show="mask" v-on:cancel="cancel_mask"></cover-mask>
  </div>
</template>
<script>
  import songHead from '../header'
  import coverMask from './cover'
  import topCount from './top_count'
  export  default {
    props:['data'],
    components:{
      songHead,
      coverMask,
      topCount
    },
    data(){
      return{
        mask:false,
        bg:true
      }
    },
    filters:{
      getDate(value){
        var getTimes=new Date(value);
        return getTimes.getFullYear()+'-'+(getTimes.getMonth()+1)+'-'+getTimes.getDate()
      }
    },
    mounted(){
      window.addEventListener('scroll', this.needToTop);
    },
    methods:{
      cancel_mask(){
        this.mask=false;
      },
      showDesc(){
        this.mask=true;
      },
      needToTop(){
        var curHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if(curHeight>=190){
          this.bg=false
        }else{
          this.bg=true
        }
      }
    }

  }
</script>
<style scoped>
  .creator{
    margin-top: 10px;
  }
  .creator img{
    width:30px;
    height:30px;
    border-radius: 50%;
  }
  .creator,
  .creator i{
    margin-right: 5px;
    font-size: 12px;
    line-height:1.3;
    color: #fff;
  }
  .txt{
    margin-left: 115px;
  }
  .txt .head{
    font-size:15px;
    color: #fff;
  }
  .avatar{
    float: left;
    width:100px;
  }
  .top-con{
    margin:20px 0;
    overflow: hidden;
  }
  .top{
    padding:0 20px;
    position: relative;
    overflow: hidden;
    background: rgba(0,0,0,.3);
  }
  .top .top_bg,
  .fix_top img{
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }
  .top_bg{
    position: absolute;
    left:0;
    top:0;
    z-index: -1;
  }
</style>
