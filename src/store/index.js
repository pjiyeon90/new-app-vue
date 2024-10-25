import { createStore } from 'vuex'

export default createStore({
   // 값을 정의하고
   state: {
    data:[{id:0, name:'홍길동', tel:'01039408962'}]
  },
  //데이터 가공
  getters: {
    total(state){
      return state.data.length;
    }
  },
  //데이터 처리
  mutations: {
    join(state,d){
      state.data.push(d);
    }
  },
  actions: {
    actionJoin({commit}, action){
      switch(action.type){
        case 'insert': commit('join', action.d); break;
      }
     
    }
  },
  modules: {
  }
})
