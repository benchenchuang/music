<template>
  <div>
      <sing-top v-if="is_top" :data="playlist"></sing-top>
      <loader v-if="!is_top"></loader>
  </div>
</template>
<script>
  import singTop from '../components/sing/sing-top.vue'
  export  default{
    components:{
      singTop
    },
    data(){
      return{
        playlist:[],
        is_top:false
      }
    },
    watch:{
      $route(){
        this.playlist=[];
        this.getSongs();
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.playlist=[];
        this.getSongs();
      })
    },
    methods:{
      getSongs(){
        this.playlist=[];
        this.is_top=false;
        this.$http.get('/api/playlist/detail?id='+this.$route.params.id).then((response)=>{
          this.playlist=response.body.playlist;
          this.is_top=true;
          console.log(response)
        });
      }
    }
  }
</script>
