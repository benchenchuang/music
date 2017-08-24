<template>
  <div id="app">
    <div v-show="!panel"><router-view></router-view></div>
    <div v-if="workman">
      <div v-show="panel">
        <music-panel></music-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import musicPanel from './views/music_panel'
  export default {
    name: 'app',
    components:{
      musicPanel
    },
    computed:{
      panel(){
        return this.$store.state.music_panel
      },
      workman(){
        return this.$store.state.workman
      },
      songs(){
        return this.$store.state.songList
      }
    }
  }
</script>

<style>

</style>
