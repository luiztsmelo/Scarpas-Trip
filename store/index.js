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
    scrollY: 0,
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
    ########## Acomodação ##########
    */
    acomodID: null,
    acomods: null,
    acomod: null,
    acomodProgressBar: 0,
    blobAcL1: null,
    blobAcH1J: null,
    blobAcH1W: null,
    blobAcL2: null,
    blobAcH2J: null,
    blobAcH2W: null,
    acomodData: {/* Atualizar a action */
      acomodID: null,
      userID: null,
      proprietario: null,
      email: null,
      celular: '',
      photoURL: null,
      tipoAcomod: 'Casa',
      local: null,
      title: '',
      subtitle: '',
      valorAluguel: 0,
      totalHospedes: '1',
      totalSuites: '1',
      totalQuartos: '1',
      totalBanheiros: '1',
      duracao: null,
      imageL1: null,
      imageH1J: null,
      imageH1W: null,
      imageL2: null,
      imageH2J: null,
      imageH2W: null
    },
    cadastroAcomod0: true,
    cadastroAcomod1: false,
    cadastroAcomod2: false,
    cadastroAcomod3: false,
    cadastroAcomod4: false,
    cadastroAcomod5: false,
    cadastroAcomod6: false,
    cadastroAcomod7: false,
    cadastroAcomod8: false,
    cadastroAcomod9: false,
    cadastroAcomod10: false,
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
    blobEvL2: null,
    blobEvH2J: null,
    blobEvH2W: null,
    eventoData: {/* Atualizar a action */
      eventoID: null,
      title: '',
      subtitle: '',
      date: '',
      hour: '',
      positionLAT: -20.6141320,
      positionLNG: -46.0478760,
      address: null,
      valorIngresso: 0,
      imageL1: null,
      imageH1J: null,
      imageH1W: null,
      imageL2: null,
      imageH2J: null,
      imageH2W: null
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
    blobPasL2: null,
    blobPasH2J: null,
    blobPasH2W: null,
    passeioData: {/* Atualizar a action */
      passeioID: null,
      userID: null,
      proprietario: null,
      email: null,
      celular: '',
      photoURL: null,
      tipoPasseio: 'Lancha',
      localSaida: null,
      title: '',
      subtitle: '',
      valorPasseio: 0,
      capacidade: null,
      duracao: null,
      pontosVisitados: null,
      imageL1: null,
      imageH1J: null,
      imageH1W: null,
      imageL2: null,
      imageH2J: null,
      imageH2W: null
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
    ########## Acomodação ##########
    */
    m_AcomodID (state, payload) {
      state.acomodID = payload
      state.acomodData.acomodID = payload
    },
    m_imageAcL1 (state, payload) {
      state.acomodData.imageL1 = payload
    },
    m_imageAcH1J (state, payload) {
      state.acomodData.imageH1J = payload
    },
    m_imageAcH1W (state, payload) {
      state.acomodData.imageH1W = payload
    },
    m_imageAcL2 (state, payload) {
      state.acomodData.imageL2 = payload
    },
    m_imageAcH2J (state, payload) {
      state.acomodData.imageH2J = payload
    },
    m_imageAcH2W (state, payload) {
      state.acomodData.imageH2W = payload
    },
    m_acomods (state, payload) {
      state.acomods = payload
    },
    m_acomod (state, payload) {
      state.acomod = payload
    },
    m_acomodProgressBar (state, payload) {
      state.acomodProgressBar = payload
    },
    m_cadastroAcomod0 (state, payload) {
      state.cadastroAcomod0 = payload
    },
    m_cadastroAcomod1 (state, payload) {
      state.cadastroAcomod1 = payload
    },
    m_cadastroAcomod2 (state, payload) {
      state.cadastroAcomod2 = payload
    },
    m_cadastroAcomod3 (state, payload) {
      state.cadastroAcomod3 = payload
    },
    m_cadastroAcomod4 (state, payload) {
      state.cadastroAcomod4 = payload
    },
    m_cadastroAcomod5 (state, payload) {
      state.cadastroAcomod5 = payload
    },
    m_cadastroAcomod6 (state, payload) {
      state.cadastroAcomod6 = payload
    },
    m_cadastroAcomod7 (state, payload) {
      state.cadastroAcomod7 = payload
    },
    m_cadastroAcomod8 (state, payload) {
      state.cadastroAcomod8 = payload
    },
    m_cadastroAcomod9 (state, payload) {
      state.cadastroAcomod9 = payload
    },
    m_cadastroAcomod10 (state, payload) {
      state.cadastroAcomod10 = payload
    },
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
    m_imageEvL2 (state, payload) {
      state.eventoData.imageL2 = payload
    },
    m_imageEvH2J (state, payload) {
      state.eventoData.imageH2J = payload
    },
    m_imageEvH2W (state, payload) {
      state.eventoData.imageH2W = payload
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
    m_imagePasL2 (state, payload) {
      state.passeioData.imageL2 = payload
    },
    m_imagePasH2J (state, payload) {
      state.passeioData.imageH2J = payload
    },
    m_imagePasH2W (state, payload) {
      state.passeioData.imageH2W = payload
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
    ########## Acomodações ##########
    */
    a_uploadAcomod ({ state, commit }) {
      firebase.database().ref('acomodacoes/' + state.acomodID).set(state.acomodData).then(() => {
        /* Resetar states */
        commit('m_acomodData', {
          acomodID: null,
          userID: null,
          proprietario: null,
          email: null,
          celular: '',
          photoURL: null,
          tipoAcomod: '',
          local: null,
          title: '',
          subtitle: '',
          valorAluguel: 0,
          capacidade: null,
          duracao: null,
          imageL1: null,
          imageH1J: null,
          imageH1W: null,
          imageL2: null,
          imageH2J: null,
          imageH2W: null
        })
        commit('m_loader', false)
        commit('m_cadastroAcomod10', false)
        commit('m_cadastroAcomod0', true)
      })
    },
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
          imageL1: null,
          imageH1J: null,
          imageH1W: null,
          imageL2: null,
          imageH2J: null,
          imageH2W: null
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
          tipoPasseio: 'Lancha',
          localSaida: null,
          title: '',
          subtitle: '',
          valorPasseio: 0,
          capacidade: null,
          duracao: null,
          pontosVisitados: null,
          imageL1: null,
          imageH1J: null,
          imageH1W: null,
          imageL2: null,
          imageH2J: null,
          imageH2W: null
        })
        commit('m_loader', false)
        commit('m_cadastroPasseio11', false)
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
