import Vuex from 'vuex'
/* import * as firebase from 'firebase' */
/* import createPersistedState from 'vuex-persistedstate' */

const store = () => new Vuex.Store({
  /* plugins: [createPersistedState()], */
  /*
  ******************** STATE ********************
  */
  state: {
    showMenu: false,
    showFoobar: true,
    menuIconAnime: false,
    /*
    ** Anúncios
    */
    cadastroEvento0: true,
    cadastroEvento1: false,
    cadastroEvento2: false,
    cadastroEvento3: false,
    isPlanoEventoCasual: false,
    isPlanoEventoPro: false
  },
  /*
  ******************** GETTERS ********************
  */
  getters: {
  },
  /*
  ******************** MUTATIONS ********************
  */
  mutations: {
    m_showMenu (state, payload) {
      state.showMenu = payload
    },
    m_showFoobar (state, payload) {
      state.showFoobar = payload
    },
    m_menuIconAnime (state, payload) {
      state.menuIconAnime = payload
    },
    /*
    ** Anúncios
    */
    m_cadastroEvento0 (state, payload) {
      state.cadastroEvento0 = payload
    },
    m_cadastroEvento1 (state, payload) {
      state.cadastroEvento1 = payload
    },
    m_cadastroEvento2 (state, payload) {
      state.cadastroEvento2 = payload
    },
    m_cadastroEvento3 (state, payload) {
      state.cadastroEvento2 = payload
    },
    m_isPlanoEventoCasual (state, payload) {
      state.isPlanoEventoCasual = payload
    },
    m_isPlanoEventoPro (state, payload) {
      state.isPlanoEventoPro = payload
    }
  },
  /*
  ******************** ACTIONS ********************
  */
  actions: {
  }
})

export default store
