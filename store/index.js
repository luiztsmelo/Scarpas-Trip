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
    showMenu: false,
    showFoobar: true,
    menuIconAnime: false,
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    .......... Evento ..........
    */
    eventoID: null,
    eventos: null,
    eventoData: {
      eventoID: null,
      position: {lat: -20.6141320, lng: -46.0478760},
      title: '',
      subtitle: '',
      date: '',
      hour: '',
      valorIngresso: 0,
      imgUrlH1: null,
      imgUrlL1: null
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
    cadastroEvento7: false,
    eventoPlanoCasual: false,
    eventoPlanoPro: false
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
    m_imgUrlH1 (state, payload) {
      state.eventoData.imgUrlH1 = payload
    },
    m_imgUrlL1 (state, payload) {
      state.eventoData.imgUrlL1 = payload
    },
    m_eventos (state, payload) {
      state.eventos = payload
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
    m_eventoPlanoCasual (state, payload) {
      state.eventoPlanoCasual = payload
    },
    m_eventoPlanoPro (state, payload) {
      state.eventoPlanoPro = payload
    }
  },
  /*
  **************************************** ACTIONS ****************************************
  */
  actions: {
    a_uploadEvento ({ state, commit }) {
      firebase.database().ref('eventos/' + state.eventoID).set(state.eventoData)/* .then(() => {
        commit('m_eventoData', null)
      }) */
    }
  }
})

export default store
