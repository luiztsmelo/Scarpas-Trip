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
    isMobile: false,
    scrollY: 0,
    authUser: null,
    isSignIn: true,
    showNavbar: true,
    showMenu: false,
    showFoobar: true,
    showShare: false,
    showProprietario: false,
    menuIconAnime: false,
    loader: false,
    offFoobar1: true,
    offFoobar2: true,
    offFoobar3: true,
    offFoobar4: true,
    offFoobar5: true,
    googleMapsInitialized: false,
    /*
    -------------------- USER --------------------
    */
    user: {
      userID: null,
      firstName: null,
      fullName: null,
      email: null,
      photoURL: null,
      isAcomodHost: false,
      isPasseioHost: false,
      isRestauranteHost: false
    },
    message: {
      timestamp: null,
      from: null,
      to: null,
      totalHospedes: '1',
      startDate: null,
      endDate: null,
      text: '',
      about: null,
      id: null
    },
    /*
    -------------------- CONFIGS --------------------
    */
    serviceFeeAcomod: 0.03,
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Acomodação ##########
    */
    acomodCreated: false,
    showReservaAcomod: false,
    acomodID: null,
    acomods: null,
    acomod: null,
    acomodMap: null,
    acomodProgressBar: 0,
    acomodPlace: null,
    blobAcL1: null,
    blobAcH1J: null,
    blobAcH1W: null,
    blobAcL2: null,
    blobAcH2J: null,
    blobAcH2W: null,
    blobAcL3: null,
    blobAcH3J: null,
    blobAcH3W: null,
    creditCard: {
      cardNumber: '',
      cardHolderName: '',
      cardExpirationMonth: 'MM',
      cardExpirationYear: 'AA',
      cardCVV: ''
    },
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
      valorDiariaNormal: 0,
      valorDiariaFeriado: 0,
      totalHospedes: '1',
      totalQuartos: '1',
      totalSuites: '1',
      totalBanheiros: '1',
      totalGaragem: '1',
      hasRoupasCama: false,
      hasPiscina: false,
      hasChurrasqueira: false,
      hasCozinha: false,
      hasWifi: false,
      hasArCond: false,
      hasCaixaSom: false,
      hasBarracas: false,
      hasPier: false,
      positionLAT: -20.6141320,
      positionLNG: -46.0478760,
      address: null,
      imageL1: null,
      imageH1J: null,
      imageH1W: null,
      imageL2: null,
      imageH2J: null,
      imageH2W: null,
      imageL3: null,
      imageH3J: null,
      imageH3W: null
    },
    reservaAcomod: {/* Atualizar Action */
      reservaID: null,
      acomodID: null,
      requested: null,
      totalHospedes: 1,
      periodoReserva: null,
      startDate: null,
      endDate: null,
      noites: null,
      valorNoitesTotal: null,
      serviceFeeTotal: null,
      valorReservaTotal: null,
      mensagem: null,
      hostID: null,
      guestID: null,
      hostName: null,
      guestName: null,
      hostEmail: null,
      guestEmail: null
    },
    clickedReservaAcomod: false,
    clickedAskAcomod: false,
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
    cadastroAcomod11: false,
    reservaAcomod0: false,
    reservaAcomod1: false,
    reservaAcomod2: false,
    reservaAcomod3: false,
    reservaAcomod4: false,
    reservaAcomodDesktop1: true,
    reservaAcomodDesktop2: false,
    reservaAcomodDesktop3: false,
    etapaReserva1ok: true,
    etapaReserva2ok: false,
    etapaReserva3ok: false,
    /*
    ########## Evento ##########
    */
    eventoID: null,
    eventos: null,
    evento: null,
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
      capacidade: '1',
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
    cadastroPasseio11: false,
    /*
    ########## Atração ##########
    */
    atracaoID: null,
    atracoes: null,
    atracao: null,
    atracaoProgressBar: 16.6666,
    blobAtL1: null,
    blobAtH1J: null,
    blobAtH1W: null,
    blobAtL2: null,
    blobAtH2J: null,
    blobAtH2W: null,
    atracaoData: {/* Atualizar a action */
      atracaoID: null,
      email: null,
      tipoAtracao: 'Cachoeira',
      positionLAT: -20.6141320,
      positionLNG: -46.0478760,
      rota: [],
      title: '',
      subtitle: '',
      imageL1: null,
      imageH1J: null,
      imageH1W: null,
      imageL2: null,
      imageH2J: null,
      imageH2W: null
    },
    cadastroAtracao1: true,
    cadastroAtracao2: false,
    cadastroAtracao3: false,
    cadastroAtracao4: false,
    cadastroAtracao5: false,
    cadastroAtracao6: false
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
    m_isMobile (state, payload) {
      state.isMobile = payload
    },
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
    m_showProprietario (state, payload) {
      state.showProprietario = payload
    },
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Acomodação ##########
    */
    m_acomodCreated (state, payload) {
      state.acomodCreated = payload
    },
    m_showReservaAcomod (state, payload) {
      state.showReservaAcomod = payload
    },
    m_acomodID (state, payload) {
      state.acomodID = payload
      state.acomodData.acomodID = payload
    },
    m_valorNoitesTotal (state, payload) {
      state.reservaAcomod.valorNoitesTotal = payload
    },
    m_serviceFeeTotal (state, payload) {
      state.reservaAcomod.serviceFeeTotal = payload
    },
    m_valorReservaTotal (state, payload) {
      state.reservaAcomod.valorReservaTotal = payload
    },
    m_creditCard (state, payload) {
      state.creditCard = payload
    },
    m_acomodData (state, payload) {
      state.acomodData = payload
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
    m_imageAcL3 (state, payload) {
      state.acomodData.imageL3 = payload
    },
    m_imageAcH3J (state, payload) {
      state.acomodData.imageH3J = payload
    },
    m_imageAcH3W (state, payload) {
      state.acomodData.imageH3W = payload
    },
    m_acomodPlace (state, payload) {
      state.acomodPlace = payload
    },
    m_acomods (state, payload) {
      state.acomods = payload
    },
    m_acomod (state, payload) {
      state.acomod = payload
    },
    m_acomodMap (state, payload) {
      state.acomodMap = payload
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
    m_cadastroAcomod11 (state, payload) {
      state.cadastroAcomod11 = payload
    },
    m_reservaAcomod0 (state, payload) {
      state.reservaAcomod0 = payload
    },
    m_reservaAcomod1 (state, payload) {
      state.reservaAcomod1 = payload
    },
    m_reservaAcomod2 (state, payload) {
      state.reservaAcomod2 = payload
    },
    m_reservaAcomod3 (state, payload) {
      state.reservaAcomod3 = payload
    },
    m_reservaAcomod4 (state, payload) {
      state.reservaAcomod4 = payload
    },
    m_reservaAcomodDesktop1 (state, payload) {
      state.reservaAcomodDesktop1 = payload
    },
    m_reservaAcomodDesktop2 (state, payload) {
      state.reservaAcomodDesktop2 = payload
    },
    m_reservaAcomodDesktop3 (state, payload) {
      state.reservaAcomodDesktop3 = payload
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
    m_eventoPlace (state, payload) {
      state.eventoPlace = payload
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
    /*
    ########## Passeio ##########
    */
    m_passeioID (state, payload) {
      state.passeioID = payload
      state.passeioData.passeioID = payload
    },
    m_passeioData (state, payload) {
      state.passeioData = payload
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
    },
    /*
    ########## Atração ##########
    */
    m_atracaoID (state, payload) {
      state.atracaoID = payload
      state.atracaoData.atracaoID = payload
    },
    m_atracaoData (state, payload) {
      state.atracaoData = payload
    },
    m_addRota (state, payload) {
      state.atracaoData.rota.push(payload)
    },
    m_resetRota (state, payload) {
      state.atracaoData.rota = payload
    },
    m_removePointRota (state) {
      state.atracaoData.rota.splice(-1, 1)
    },
    m_imageAtL1 (state, payload) {
      state.atracaoData.imageL1 = payload
    },
    m_imageAtH1J (state, payload) {
      state.atracaoData.imageH1J = payload
    },
    m_imageAtH1W (state, payload) {
      state.atracaoData.imageH1W = payload
    },
    m_imageAtL2 (state, payload) {
      state.atracaoData.imageL2 = payload
    },
    m_imageAtH2J (state, payload) {
      state.atracaoData.imageH2J = payload
    },
    m_imageAtH2W (state, payload) {
      state.atracaoData.imageH2W = payload
    },
    m_atracoes (state, payload) {
      state.atracoes = payload
    },
    m_atracao (state, payload) {
      state.atracao = payload
    },
    m_atracaoProgressBar (state, payload) {
      state.atracaoProgressBar = payload
    },
    m_cadastroAtracao1 (state, payload) {
      state.cadastroAtracao1 = payload
    },
    m_cadastroAtracao2 (state, payload) {
      state.cadastroAtracao2 = payload
    },
    m_cadastroAtracao3 (state, payload) {
      state.cadastroAtracao3 = payload
    },
    m_cadastroAtracao4 (state, payload) {
      state.cadastroAtracao4 = payload
    },
    m_cadastroAtracao5 (state, payload) {
      state.cadastroAtracao5 = payload
    },
    m_cadastroAtracao6 (state, payload) {
      state.cadastroAtracao6 = payload
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
        commit('m_creditCard', {
          cardNumber: '',
          cardHolderName: '',
          cardExpirationMonth: 'MM',
          cardExpirationYear: 'AA',
          cardCVV: ''
        })
        commit('m_acomodData', {
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
          valorDiariaNormal: 0,
          valorDiariaFeriado: 0,
          totalHospedes: '1',
          totalQuartos: '1',
          totalSuites: '1',
          totalBanheiros: '1',
          totalGaragem: '1',
          hasRoupasCama: false,
          hasPiscina: false,
          hasChurrasqueira: false,
          hasCozinha: false,
          hasWifi: false,
          hasArCond: false,
          hasCaixaSom: false,
          hasBarracas: false,
          hasPier: false,
          positionLAT: -20.6141320,
          positionLNG: -46.0478760,
          address: null,
          imageL1: null,
          imageH1J: null,
          imageH1W: null,
          imageL2: null,
          imageH2J: null,
          imageH2W: null,
          imageL3: null,
          imageH3J: null,
          imageH3W: null
        })
        commit('m_cadastroAcomod11', false)
        commit('m_cadastroAcomod0', true)
        commit('m_loader', false)
      })
    },
    a_newReservaAcomod ({ state, commit }) {
      state.reservaAcomod.requested = new Date().getTime()
      state.reservaAcomod.reservaID = Math.ceil(Math.exp(Math.random() * (Math.log(99999999) - Math.log(10000000))) * 10000000)
      state.reservaAcomod.acomodID = state.acomod.acomodID
      state.reservaAcomod.hostName = state.acomod.proprietario
      state.reservaAcomod.hostEmail = state.acomod.email
      state.reservaAcomod.hostID = state.acomod.userID
      /* Corrigir datas para enviar para o Airtable */
      let yyyyStart = state.reservaAcomod.startDate.slice(6, 10)
      let mmStart = state.reservaAcomod.startDate.slice(3, 5)
      let ddStart = state.reservaAcomod.startDate.slice(0, 2)
      let startDate = yyyyStart + '-' + mmStart + '-' + ddStart
      let yyyyEnd = state.reservaAcomod.endDate.slice(6, 10)
      let mmEnd = state.reservaAcomod.endDate.slice(3, 5)
      let ddEnd = state.reservaAcomod.endDate.slice(0, 2)
      let endDate = yyyyEnd + '-' + mmEnd + '-' + ddEnd
      /* Criar reserva no Firebase */
      firebase.database().ref('reservas/acomods/' + state.reservaAcomod.reservaID).set(state.reservaAcomod).then(() => {
        /* Criar reserva no Airtable */
        this.$axios.$post('https://api.airtable.com/v0/appfQX2S7rMRlBWoh/Acomods?api_key=keyoOJ1ERQwpa2EIg', {
          'fields': {
            'reservaID': state.reservaAcomod.reservaID,
            'acomodID': state.reservaAcomod.acomodID,
            'requested': state.reservaAcomod.requested,
            'startDate': startDate,
            'endDate': endDate,
            'noites': state.reservaAcomod.noites,
            'valorNoitesTotal': state.reservaAcomod.valorNoitesTotal,
            'serviceFeeTotal': state.reservaAcomod.serviceFeeTotal,
            'valorReservaTotal': state.reservaAcomod.valorReservaTotal,
            'totalHospedes': state.reservaAcomod.totalHospedes,
            'hostName': state.acomod.proprietario,
            'hostEmail': state.acomod.email,
            'hostID': state.acomod.userID
          }
        })
      })
    },
    a_resetReservaAcomodDesktop ({ state }) { /* Resetar dados quando usuário for p/ outra acomod (evitar bugs) */
      state.reservaAcomod = {
        reservaID: null,
        acomodID: null,
        requested: null,
        totalHospedes: '1',
        periodoReserva: null,
        startDate: null,
        endDate: null,
        noites: null,
        valorNoitesTotal: null,
        serviceFeeTotal: null,
        valorReservaTotal: null,
        mensagem: null,
        hostID: null,
        guestID: null,
        hostName: null,
        guestName: null,
        hostEmail: null,
        guestEmail: null
      }
      state.reservaAcomodDesktop1 = true
      state.reservaAcomodDesktop2 = false
      state.reservaAcomodDesktop3 = false
      state.etapaReserva1ok = true
      state.etapaReserva2ok = false
      state.etapaReserva3ok = false
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
          capacidade: '1',
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
    ########## Atracões ##########
    */
    a_uploadAtracao ({ state, commit }) {
      firebase.database().ref('atracoes/' + state.atracaoID).set(state.atracaoData).then(() => {
        /* Resetar states */
        commit('m_atracaoData', {
          atracaoID: null,
          email: null,
          tipoAtracao: 'Cachoeira',
          positionLAT: -20.6141320,
          positionLNG: -46.0478760,
          rota: [],
          title: '',
          subtitle: '',
          imageL1: null,
          imageH1J: null,
          imageH1W: null,
          imageL2: null,
          imageH2J: null,
          imageH2W: null
        })
        commit('m_loader', false)
        commit('m_cadastroAtracao6', false)
        commit('m_cadastroAtracao1', true)
        commit('m_atracaoProgressBar', 16.6666)
      })
    },
    /*
    ########## GOOGLE SIGN IN ##########
    */
    a_googleSignIn ({ commit, dispatch }, user) {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then().catch(error => {
          console.log(error)
        })
      dispatch('a_authStateObserver')
    },
    /*
    ########## FACEBOOK SIGN IN ##########
    */
    a_facebookSignIn ({ commit, dispatch }, user) {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then().catch(error => {
          console.log(error)
        })
      dispatch('a_authStateObserver')
    },
    /*
    ########## AUTH STATE OBSERVER ##########
    */
    a_authStateObserver ({ dispatch, state }) {
      firebase.auth().onAuthStateChanged(user => {
        state.user.firstName = user.displayName.split(' ')[0]
        state.user.fullName = user.displayName
        state.user.userID = user.uid
        state.user.email = user.email
        state.user.photoURL = user.photoURL
        state.acomodData.proprietario = user.displayName
        state.acomodData.email = user.email
        state.acomodData.photoURL = user.photoURL
        state.acomodData.userID = user.uid
        state.passeioData.proprietario = user.displayName
        state.passeioData.email = user.email
        state.passeioData.photoURL = user.photoURL
        state.passeioData.userID = user.uid
        state.reservaAcomod.reservante = user.displayName
        state.reservaAcomod.email = user.email
        state.reservaAcomod.photoURL = user.photoURL
        state.reservaAcomod.userID = user.uid
        state.atracaoData.email = user.email
        dispatch('a_setUser')
      })
    },
    /*
    ########## SET USER ##########
    */
    a_setUser ({ state }) {
      /* Chechar se usuário já existe */
      firebase.database().ref('users/' + state.user.userID).once('value', snapshot => {
        const userID = snapshot.val()
        if (!userID) { /* Se não existir: */
          /* 1) Criar usuário no Firebase */
          firebase.database().ref('users/' + state.user.userID).set(state.user)
          .then(() => {
            /* 2) Criar usuário no Airtable */
            this.$axios.$post('https://api.airtable.com/v0/app2VZONmWdcr8ybJ/Users?api_key=keyoOJ1ERQwpa2EIg', {
              'fields': {
                'userID': state.user.userID,
                'firstName': state.user.firstName,
                'fullName': state.user.fullName,
                'email': state.user.email,
                'photoURL': state.user.photoURL
              }
            })
            /* 3) Criar contato no SendinBlue */
            const configSendinBlue = {
              headers: {
                'content-type': 'application/json',
                'api-key': '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'
              }
            }
            this.$axios.post('https://api.sendinblue.com/v3/contacts', {
              'email': state.user.email,
              'attributes': {
                'USERID': state.user.userID,
                'FULLNAME': state.user.fullName,
                'FIRSTNAME': state.user.firstName
              }
            }, configSendinBlue).then(() => {
              /* 4) Enviar e-mail de Boas-Vindas */
              this.$axios.post('https://api.sendinblue.com/v3/smtp/email', {
                'sender.email': 'luiztsmelo@gmail.com',
                'to': [{
                  'email': state.user.email,
                  'name': state.user.firstName
                }],
                'replyTo.email': 'luiztsmelo@gmail.com',
                'templateId': 7
              }, configSendinBlue)
            })
          })
        }
      })
    },
    /*
    ########## SEND MESSAGE ##########
    */
    a_sendMessage ({ state, route }, routeName) {
      state.message.timestamp = new Date().getTime()
      state.message.from = state.user.userID
      state.message.to = routeName === 'acomodacoes-id' ? state.acomod.userID : ''
      state.message.about = routeName === 'acomodacoes-id' ? 'acomod' : ''
      state.message.id = routeName === 'acomodacoes-id' ? state.acomod.acomodID : ''
      /* Enviar mensagem para o Firebase */
      firebase.database().ref('messages/').push(state.message)
    },
    /*
    ########## SIGN OUT ##########
    */
    a_signOut ({ state }) {
      firebase.auth().signOut().then(() => {
        state.user.userID = null
        state.user.firstName = null
        state.user.fullName = null
        state.user.email = null
        state.user.photoURL = null
      })
    }
  }
})

export default store
