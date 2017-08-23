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
      music:''
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
      state.workman=true;
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
    }
  }
});
