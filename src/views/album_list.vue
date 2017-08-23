<template>
  <div>
      <album-top v-if="is_top" :data="albums"></album-top>
      <loader v-if="!is_top"></loader>

      <div class="music_box" v-if="is_top">
        <div class="play_item">
          <i class="iconfont icon-play_music" @click="addPlay"></i><span style="margin-left: 5px">播放全部</span><em>(共{{songs.length}}首)</em>
        </div>

        <music-item :items="songs"></music-item>

      </div>

  </div>
</template>
<script>
  import albumTop from '../components/sing/album-top'
  import musicItem from '../components/sing/music-item'
  export  default{
    components:{
      albumTop,
      musicItem
    },
    data(){
      return{
        albums:[],
        songs:[],
        is_top:false
      }
    },
    watch:{
      $route(){
        this.albums=[];
        this.songs=[];
        this.getSongs();
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getSongs();
      })
    },
    methods:{
      addPlay(){
        this.$store.commit('addList',this.songs);
      },
      getSongs(){
        this.is_top=false;
        this.$http.get('/api/album?id='+this.$route.params.id).then((response)=>{
          this.albums=response.body.album;
          this.songs=response.body.songs;
          this.is_top=true;
          console.log(response)
        });
      }
    }
  }
</script>
<style scoped>
  .music_box{
    padding:0 20px;
  }
  .play_item{
    width:100%;
    height:40px;
    font-size: 15px;
    color: #474747;
    line-height:40px;
    border-bottom: 1px solid #f1f1f1;
  }
  .play_item em{
    margin-left: 5px;
    font-size: 12px;
    color: #999;
  }
</style>
