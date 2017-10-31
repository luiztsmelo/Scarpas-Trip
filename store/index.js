import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'

const store = () => new Vuex.Store({
  plugins: [createPersistedState()],
  /*
  **************************************** STATE ****************************************
  */
  state: {
    /*
    -------------------- GERAL --------------------
    */
    showNavbar: true,
    showMenu: false,
    showFoobar: true,
    showShare: false,
    menuIconAnime: false,
    loader: false,
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    .......... Evento ..........
    */
    eventoID: null,
    eventos: null,
    evento: null,
    eventoData: {/* Lembrar de atualizar a action */
      eventoID: null,
      planoCasual: false,
      planoPro: false,
      title: '',
      subtitle: '',
      date: '',
      hour: '',
      position: {lat: -20.6141320, lng: -46.0478760},
      valorIngresso: 0,
      imageH1: null,
      imageL1: null
    },
    eventoProgressBar: 0,
    place: null,
    cadastroEvento0: true,
    cadastroEvento1: false,
    cadastroEvento2: false,
    cadastroEvento3: false,
    cadastroEvento4: false,
    cadastroEvento5: false,
    cadastroEvento6: false,
    cadastroEvento7: false
  },
  /*
  **************************************** GETTERS ****************************************
  */
  getters: {
  },
  /*
  **************************************** MUTATIONS ****************************************
  */
  mutations: {
    m_showNavbar (state, payload) {
      state.showNavbar = payload
    },
    m_showMenu (state, payload) {
      state.showMenu = payload
    },
    m_showFoobar (state, payload) {
      state.showFoobar = payload
    },
    m_showShare (state, payload) {
      state.showShare = payload
    },
    m_menuIconAnime (state, payload) {
      state.menuIconAnime = payload
    },
    m_loader (state, payload) {
      state.loader = payload
    },
    /*
    ---------- ANÚNCIOS ----------
    */
    /*
    .......... Evento ..........
    */
    m_eventoID (state, payload) {
      state.eventoID = payload
      state.eventoData.eventoID = payload
    },
    m_eventoData (state, payload) {
      state.eventoData = payload
    },
    m_imageH1 (state, payload) {
      state.eventoData.imageH1 = payload
    },
    m_imageL1 (state, payload) {
      state.eventoData.imageL1 = payload
    },
    m_eventos (state, payload) {
      state.eventos = payload
    },
    m_evento (state, payload) {
      state.evento = payload
    },
    m_eventoProgressBar (state, payload) {
      state.eventoProgressBar = payload
    },
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
      state.cadastroEvento3 = payload
    },
    m_cadastroEvento4 (state, payload) {
      state.cadastroEvento4 = payload
    },
    m_cadastroEvento5 (state, payload) {
      state.cadastroEvento5 = payload
    },
    m_cadastroEvento6 (state, payload) {
      state.cadastroEvento6 = payload
    },
    m_cadastroEvento7 (state, payload) {
      state.cadastroEvento7 = payload
    },
    m_planoCasual (state, payload) {
      state.eventoData.planoCasual = payload
    },
    m_planoPro (state, payload) {
      state.eventoData.planoPro = payload
    }
  },
  /*
  **************************************** ACTIONS ****************************************
  */
  actions: {
    a_uploadEvento ({ state, commit }) {
      firebase.database().ref('eventos/' + state.eventoID).set(state.eventoData).then(() => {
        commit('m_eventoData', {
          eventoID: null,
          position: {lat: -20.6141320, lng: -46.0478760},
          title: '',
          subtitle: '',
          date: '',
          hour: '',
          valorIngresso: 0,
          imageH1: null,
          imageL1: null
        })
        commit('m_cadastroEvento7', false)
        commit('m_cadastroEvento0', true)
        commit('m_loader', false)
      })
    }
  }
})

export default store
