<template>
  <div>
      <album-top v-if="is_top" :data="albums"></album-top>
      <loader v-if="!is_top"></loader>
  </div>
</template>
<script>
  import albumTop from '../components/sing/album-top.vue'
  export  default{
    components:{
      albumTop
    },
    data(){
      return{
        albums:[],
        is_top:false
      }
    },
    watch:{
      $route(){
        this.albums=[];
        this.getSongs();
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.albums=[];
        this.getSongs();
      })
    },
    methods:{
      getSongs(){
        this.is_top=false;
        this.$http.get('/api/album?id='+this.$route.params.id).then((response)=>{
          this.albums=response.body.album;
          this.is_top=true;
          console.log(response)
        });
      }
    }
  }
</script>
