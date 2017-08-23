<template>
  <div class="wrap">
    <div class="music_wrap">
      <i class="iconfont icon-del" @click="hidePanel"></i>
      <div class="music_bg" :style="'background:url('+song.al.picUrl+');opacity: 1;'">
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
          <li class="flex-item"><i class="iconfont icon-love"></i></li>
          <li class="flex-item"><i class="iconfont icon-prevvideo"></i></li>
          <li class="flex-item big"><i class="iconfont icon-play_music" v-if="!is_play" @click="play"></i><i class="iconfont icon-pause" v-else @click="pause"></i> </li>
          <li class="flex-item"><i class="iconfont icon-nextvideo"></i></li>
          <li class="flex-item" @click="play_list=true"><i class="iconfont icon-duoxuan"></i></li>
        </ul>
      </div>
      <audio :src="music" id="music"></audio>
      <div class="play_wrap" v-show="play_list">
        <i class="iconfont icon-del" @click="play_list=false"></i>
        <ul>
          <li v-for="song in songs" @click="playMusic(song.id)">{{song.name}}</li>
        </ul>
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
        setPlay:''
      }
    },
    computed:{
        is_play(){
          return this.$store.state.is_play
        },
        songs(){
          return this.$store.state.songList
        },
        currentIndex(){
          return this.$store.state.currentIndex
        }
    },
    mounted(){
      console.log(this.songs);
      this.getMusic(this.songs[0].id);
      this.getSongs(this.songs[0].id);
      this.play();
    },
    methods:{
      playMusic(id){
        this.play_list=false;
        this.getMusic(id);
        this.getSongs(id);
        console.log(this.play_list)
      },
      getMusic(id){
        this.$http.get('/api/music/url?id='+id).then(response=>{
          this.pause();
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
        this.setPlay= setInterval(()=>{
          if(this.song.dt<=music.currentTime*1000){
            this.pause();
            clearInterval(this.setPlay);
          }
        },1000)
      },
      pause(){
        this.$store.commit('pause');
        document.getElementById('music').pause()
      },
      ...mapMutations([
        'hidePanel'
      ])
    }
  }
</script>
<style scoped>
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
  .play_wrap .icon-del{
    position: absolute;
    right:20px;
    top:10px;
    color: #999;
    z-index: 99;
  }
  .play_wrap{
    padding-top: 20px;
    position: absolute;
    width:100%;
    left:0;
    bottom: 0;
    background: #fff;
  }
  .play_wrap ul{
    margin-top: 20px;
    width: 100%;
    height:300px;
    z-index: 9999;
    padding:20px;
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
