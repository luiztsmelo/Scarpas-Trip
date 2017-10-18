import Vuex from 'vuex'
/* import * as firebase from 'firebase' */

const store = () => new Vuex.Store({
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
    planoEventoSelecionado: false,
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
    m_planoEventoSelecionado (state, payload) {
      state.planoEventoSelecionado = payload
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
