<template>
  <div class="wrap">
    <div class="music_wrap">
      <i class="iconfont icon-del" @click="hidePanel"></i>
      <div class="music_bg" v-lazy:background-image.container="song.al.picUrl">
      </div>
      <div class="song_box">
        <div class="song_disc" :class="{needle:!is_play}">
          <div class="song_turn" :class="{turn:is_play}">
            <div class="song_img">
              <img class="img" v-lazy="song.al.picUrl"/>
            </div>
          </div>
        </div>
      </div>

      <div class="music_info">
        <h3>{{song.name}}</h3>
        <p>作曲：{{song.ar[0].name}}</p>
      </div>

      <div class="play_control">
        <ul class="flex-box">
          <li class="flex-item" @click='currentType'><i class="iconfont" :class="{'icon-xunhuan':type==1,'icon-suijibofang':type==2,'icon-yinpindanquxunhuan':type==3}"></i></li>
          <li class="flex-item" @click='playPrev'><i class="iconfont icon-prevvideo"></i></li>
          <li class="flex-item big"><i class="iconfont icon-play_music" v-if="!is_play" @click="play"></i><i class="iconfont icon-pause" v-else @click="pause"></i> </li>
          <li class="flex-item" @click='playNext'><i class="iconfont icon-nextvideo"></i></li>
          <li class="flex-item" @click="play_list=true"><i class="iconfont icon-duoxuan"></i></li>
        </ul>
      </div>
      <audio :src="music" id="music"></audio>
      <div class="play_mask" v-show="play_list">
        <div class="play_wrap">
          <ul>
            <li class="cut_txt" v-for="(song,index) in songs" @click="playMusic(song.id,index)" :key='index' :class="{on:currentIndex==index}">{{index+1}} - {{song.name}} -- {{song.ar[0].name}}</li>
          </ul>
        </div>
        <div class="mask" @click="play_list=false"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default{
    data(){
      return{
        song:[],
        music:'',
        play_list:false,
        setPlay:'',
        getPlay:null
      }
    },
    computed:{
       type(){
            return this.$store.state.type
        },
        is_play(){
          return this.$store.state.is_play
        },
        songs(){
          return this.$store.state.songList
        },
        currentIndex(){
          return this.$store.state.currentIndex
        },
        audio(){
          return this.$store.state.audio
        }
    },
    watch:{
      audio(){
        this.getMusic(this.audio.id);
        this.getSongs(this.audio.id);
        this.play();
      },
      currentIndex(){
          return this.$store.state.currentIndex
      }
    },
    mounted(){
      // console.log(this.audio);
      this.getMusic(this.audio.id);
      this.getSongs(this.audio.id);
      this.play();
    },
    methods:{
      playMusic(id,index){
        this.$store.commit('currentIndex',index)
        this.play_list=false;
        this.getMusic(id);
        this.getSongs(id);
      },
      getMusic(id){
        this.$http.get('/api/music/url?id='+id).then(response=>{
          this.music=response.body.data[0].url;
          setTimeout(()=>{
            this.play();
          },500)
        })
      },
      getSongs(id){
        this.$http.get('/api/song/detail?ids='+id).then(response=>{
          this.song=response.body.songs[0];
        })
      },
      play(){
        this.pause();
        this.$store.commit('play');
        var music=document.getElementById('music');
        music.play();
        clearInterval(this.getPlay);
        this.getPlay=setInterval(()=>{
            if(this.song.dt<=Math.ceil(music.currentTime)*1000){
              this.playNext();
              clearInterval(this.getPlay);
            }
        },1000)
      },
      pause(){
        this.$store.commit('pause');
        document.getElementById('music').pause()
      },
      playNext(){
        this.$store.commit('playNext')
        if(this.type==3){
          console.log(this.currentIndex);
          console.log(this.songs.length-1)
          if (this.currentIndex == this.songs.length-1) {
            this.pause();
          }
        }
      },
      playPrev(){
        this.$store.commit('playPrev')
        if(this.type==3){
          console.log(this.currentIndex);
          console.log(this.songs.length-1)
          if (this.currentIndex ==0) {
            this.pause();
          }
        }
      },
      ...mapMutations([
        'hidePanel',
        // 'playNext',
        // 'playPrev',
        'currentType'
      ])
    }
  }
</script>
<style scoped>
  .play_mask{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .play_mask .mask{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,.5);
  }
  .music_info{
    margin-top: 20px;
    position: relative;
    font-size:18px;
    color: #fff;
    text-align: center;
    z-index: 999;
  }
  .music_info p{
    font-size: 14px;
  }
  .play_wrap{
    position: absolute;
    width:100%;
    left:0;
    bottom: 0;
    background: #fff;
    z-index: 999;
  }
  .play_set{
    padding:0 20px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #474747;
    background: #f5f5f5;
    box-sizing: border-box;
  }
  .play_wrap ul{
    width: 100%;
    height:300px;
    z-index: 9999;
    padding:0 20px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .play_wrap li{
    height:40px;
    line-height:40px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #f1f1f1;
  }
  .play_wrap li.on{
    color: #d43c33
  }
  .play_control{
    position: absolute;
    width:100%;
    left:0;
    bottom: 30px;
    color: #fff;
  }
  .play_control .iconfont{
    font-size: 24px;
    line-height:54px;
  }
  .big .iconfont{
    font-size: 36px;
  }
  .music_wrap>.icon-del{
    position: absolute;
    left:20px;
    top:20px;
    font-size: 20px;
    color: #fff;
    z-index: 999;
  }
  .wrap{
    height:100vh;
  }
  .music_wrap{
    height: 100%;
    min-width: 320px;
    position: relative;
    overflow: hidden;
    background-color: rgba(0,0,0,.2);
    transition: opacity .3s linear;
  }
  .music_bg{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: .75;

  }
  .song_box{
    padding-top: 60px;
  }
  .song_disc{
    position: relative;
    width: 248px;
    height: 248px;
    margin: 0 auto;
  }
  .song_disc:after {
    content: " ";
    position: absolute;
    top: -63px;
    left: 107px;
    z-index: 0;
    width: 84px;
    height: 122px;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    background: url(../assets/images/needle.png) no-repeat;
    background-size: contain;
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
  }
  .song_disc.needle:after{
    top:-75px;
    transform:rotate(-25deg);
  }
  .song_turn{
    width: 100%;
    height: 100%;
  }
  .song_turn:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:0;
    background: url(../assets/images/disc.png) no-repeat;
    background-size: contain;
  }
  .song_img{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    z-index: 0;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    overflow: hidden;
    background: url(../assets/images/disc_default.png) no-repeat;
    background-size: contain;
  }
  .song_turn.turn{
    -webkit-animation: circling 20s infinite linear;
    animation: circling 20s infinite linear;
  }
  .img{
    width: 100%;
    vertical-align: middle;
  }
  @keyframes circling{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
    to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
  }
</style>
