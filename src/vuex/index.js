import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store=new Vuex.Store({
  state:{
      allPlay:[],
      workman:false,
      music_panel:false,
      is_play:false,
      songList:[],
      currentIndex:0,
      music:'',
      audio:[]
    },
  // getters:{
  //   doneList:state=>{
  //     return state.todos.filter(todo=>todo.done)
  //   },
  //   count:state=>{
  //     return state.count;
  //   }
  // },
  mutations:{
    addList(state,songs){
      state.currentIndex=0;
      state.music_panel=true;
      state.songList=songs;
      state.audio=songs[state.currentIndex];
      state.workman=true;
    },
    currentIndex (state, index) {
      state.audio = state.songList[index];
      state.currentIndex = index;
    },
    showPanel(state){
      state.music_panel=true
    },
    hidePanel(state){
      state.music_panel=false
    },
    play(state){
      state.is_play=true
    },
    pause(state){
      state.is_play=false
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++;
      if (state.currentIndex > state.songList.length-1) {
        state.currentIndex = 0;
      }
      state.audio = state.songList[state.currentIndex];
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--;
      if (state.currentIndex < 0) {
        state.currentIndex = state.songList.length-1;
      }
      state.audio = state.songList[state.currentIndex];
    },
  }
});
