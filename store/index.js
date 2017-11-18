import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'

const store = () => new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  /*
  ***************************************************************************************
  **************************************** STATE ****************************************
  ***************************************************************************************
  */
  state: {
    /*
    -------------------- GERAL --------------------
    */
    authUser: null,
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
    ########## Evento ##########
    */
    eventoID: null,
    eventos: null,
    evento: null,
    getEventoID: null,
    eventoMap: null,
    eventoProgressBar: 0,
    eventoPlace: null,
    blobEvL1: null,
    blobEvH1J: null,
    blobEvH1W: null,
    eventoData: {/* Atualizar a action */
      eventoID: null,
      planoCasual: false,
      planoPro: false,
      title: '',
      subtitle: '',
      date: '',
      hour: '',
      positionLAT: -20.6141320,
      positionLNG: -46.0478760,
      address: null,
      valorIngresso: 0,
      imageH1W: null,
      imageH1J: null,
      imageL1: null
    },
    cadastroEvento0: true,
    cadastroEvento1: false,
    cadastroEvento2: false,
    cadastroEvento3: false,
    cadastroEvento4: false,
    cadastroEvento5: false,
    cadastroEvento6: false,
    cadastroEvento7: false,
    /*
    ########## Passeio ##########
    */
    passeioID: null,
    passeios: null,
    passeio: null,
    passeioProgressBar: 0,
    blobPasL1: null,
    blobPasH1J: null,
    blobPasH1W: null,
    passeioData: {/* Atualizar a action */
      passeioID: null,
      userID: null,
      proprietario: null,
      email: null,
      celular: '',
      photoURL: null,
      tipoPasseio: null,
      localSaida: null,
      title: '',
      subtitle: '',
      valorPasseio: 0,
      lotacao: null,
      duracao: null,
      pontosVisitados: null,
      imageH1W: null,
      imageH1J: null,
      imageL1: null
    },
    cadastroPasseio0: true,
    cadastroPasseio1: false,
    cadastroPasseio2: false,
    cadastroPasseio3: false,
    cadastroPasseio4: false,
    cadastroPasseio5: false,
    cadastroPasseio6: false,
    cadastroPasseio7: false,
    cadastroPasseio8: false,
    cadastroPasseio9: false,
    cadastroPasseio10: false,
    cadastroPasseio11: false
  },
  /*
  *****************************************************************************************
  **************************************** GETTERS ****************************************
  *****************************************************************************************
  */
  getters: {
  },
  /*
  *******************************************************************************************
  **************************************** MUTATIONS ****************************************
  *******************************************************************************************
  */
  mutations: {
    /*
    -------------------- GERAL --------------------
    */
    m_authUser (state, payload) {
      state.authUser = payload
    },
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
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Evento ##########
    */
    m_eventoID (state, payload) {
      state.eventoID = payload
      state.eventoData.eventoID = payload
    },
    m_eventoData (state, payload) {
      state.eventoData = payload
    },
    m_eventoPlace (state, payload) {
      state.eventoPlace = payload
    },
    m_eventoMap (state, payload) {
      state.eventoMap = payload
    },
    m_imageEvL1 (state, payload) {
      state.eventoData.imageL1 = payload
    },
    m_imageEvH1J (state, payload) {
      state.eventoData.imageH1J = payload
    },
    m_imageEvH1W (state, payload) {
      state.eventoData.imageH1W = payload
    },
    m_eventos (state, payload) {
      state.eventos = payload
    },
    m_evento (state, payload) {
      state.evento = payload
    },
    m_getEventoID (state, payload) {
      state.getEventoID = payload
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
    },
    /*
    ########## Passeio ##########
    */
    m_passeioID (state, payload) {
      state.passeioID = payload
      state.passeioData.passeioID = payload
    },
    m_localSaida (state, payload) {
      state.passeioData.localSaida = payload
    },
    m_imagePasL1 (state, payload) {
      state.passeioData.imageL1 = payload
    },
    m_imagePasH1J (state, payload) {
      state.passeioData.imageH1J = payload
    },
    m_imagePasH1W (state, payload) {
      state.passeioData.imageH1W = payload
    },
    m_passeios (state, payload) {
      state.passeios = payload
    },
    m_passeio (state, payload) {
      state.passeio = payload
    },
    m_passeioProgressBar (state, payload) {
      state.passeioProgressBar = payload
    },
    m_cadastroPasseio0 (state, payload) {
      state.cadastroPasseio0 = payload
    },
    m_cadastroPasseio1 (state, payload) {
      state.cadastroPasseio1 = payload
    },
    m_cadastroPasseio2 (state, payload) {
      state.cadastroPasseio2 = payload
    },
    m_cadastroPasseio3 (state, payload) {
      state.cadastroPasseio3 = payload
    },
    m_cadastroPasseio4 (state, payload) {
      state.cadastroPasseio4 = payload
    },
    m_cadastroPasseio5 (state, payload) {
      state.cadastroPasseio5 = payload
    },
    m_cadastroPasseio6 (state, payload) {
      state.cadastroPasseio6 = payload
    },
    m_cadastroPasseio7 (state, payload) {
      state.cadastroPasseio7 = payload
    },
    m_cadastroPasseio8 (state, payload) {
      state.cadastroPasseio8 = payload
    },
    m_cadastroPasseio9 (state, payload) {
      state.cadastroPasseio9 = payload
    },
    m_cadastroPasseio10 (state, payload) {
      state.cadastroPasseio10 = payload
    },
    m_cadastroPasseio11 (state, payload) {
      state.cadastroPasseio11 = payload
    }
  },
  /*
  *****************************************************************************************
  **************************************** ACTIONS ****************************************
  *****************************************************************************************
  */
  actions: {
    /*
    ########## Eventos ##########
    */
    a_uploadEvento ({ state, commit }) {
      firebase.database().ref('eventos/' + state.eventoID).set(state.eventoData).then(() => {
        /* Resetar states */
        commit('m_eventoData', {
          eventoID: null,
          title: '',
          subtitle: '',
          date: '',
          hour: '',
          positionLAT: -20.6141320,
          positionLNG: -46.0478760,
          address: null,
          valorIngresso: 0,
          imageH1W: null,
          imageH1J: null,
          imageL1: null
        })
        commit('m_loader', false)
        commit('m_cadastroEvento7', false)
        commit('m_cadastroEvento0', true)
        commit('m_eventoPlace', null)
      })
    },
    /*
    ########## Passeios ##########
    */
    a_uploadPasseio ({ state, commit }) {
      firebase.database().ref('passeios/' + state.passeioID).set(state.passeioData).then(() => {
        /* Resetar states */
        commit('m_passeioData', {
          passeioID: null,
          userID: null,
          proprietario: null,
          email: null,
          celular: '',
          photoURL: null,
          tipoPasseio: null,
          localSaida: null,
          title: '',
          subtitle: '',
          valorPasseio: 0,
          lotacao: null,
          duracao: null,
          pontosVisitados: null,
          imageH1W: null,
          imageH1J: null,
          imageL1: null
        })
        commit('m_loader', false)
        commit('m_cadastroPasseio7', false)
        commit('m_cadastroPasseio0', true)
      })
    },
    /*
    ########## Google Sign in ##########
    */
    a_googleSignIn ({ commit, dispatch }, user) {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then().catch(error => {
          console.log(error)
        })
      dispatch('a_authStateObserver')
    },
    a_authStateObserver ({ commit, state }) {
      firebase.auth().onAuthStateChanged(user => {
        state.passeioData.proprietario = user.displayName
        state.passeioData.email = user.email
        state.passeioData.photoURL = user.photoURL
        state.passeioData.userID = user.uid
      })
    }
  }
})

export default store
