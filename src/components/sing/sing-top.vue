<template>
  <div>
    <div class="top">
      <song-head :title="'歌单'" :back="true" :play="true" :bg="bg"></song-head>
      <div class="fix_top">
        <img v-lazy="data.coverImgUrl">
      </div>
      <div class="top_box">
        <div class="top-con">
          <div class="avatar" @click="showDesc">
            <img v-lazy="data.picUrl">
          </div>
          <div class="txt">
            <h3 class="head">{{data.name}}</h3>
            <div class="creator">
              <img v-lazy="data.creator.avatarUrl"/><span>{{data.creator.nickname}}</span><i class="iconfont icon-right"></i>
            </div>
          </div>
        </div>
      </div>
      <top-count :info="data"></top-count>
      <img class="top_bg" v-lazy="data.coverImgUrl">

      <div></div>

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
  .creator span,
  .creator i{
    height:30px;
    line-height:30px;
    margin-left: 5px;
    font-size: 12px;
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
  .fix_top{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:44px;
    overflow: hidden;
    display: none;
  }
  .top .top_bg,
  .fix_top img{
    -webkit-filter: blur(40px);
    filter: blur(40px);
  }
  .top_bg{
    position: absolute;
    left:0;
    top:0;
    z-index: -1;
  }
</style>
