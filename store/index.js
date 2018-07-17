import Vuex from 'vuex'
import * as firebase from 'firebase'
require('firebase/firestore')
import createPersistedState from 'vuex-persistedstate'

const store = () => new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],

  /* ________________________________________________ STATE ________________________________________________ */
  state: {
    /*
    -------------------- GERAL --------------------
    */
    isOnline: true,
    isMobile: false,
    isSignIn: true,
    showNavbar: true,
    showMenu: false,
    showFoobar: true,
    showShare: false,
    showProprietario: false,
    menuIconAnime: false,
    loader: false,
    miniLoader: false,
    offFoobar1: true,
    offFoobar2: true,
    offFoobar3: true,
    offFoobar4: true,
    offFoobar5: true,
    heightImageBox: null,
    googleMapsInitialized: false,
    fromWithoutAddress: false,
    bankAccount: {
      bankCode: '',
      type: 'conta_corrente',
      agencia: '',
      agenciaDV: '',
      conta: '',
      contaDV: '',
      legalName: '',
      docNumber: ''
    },
    creditCard: {
      cardNumber: '',
      cardHolderName: '',
      cardExpirationDate: '',
      cardCVV: ''
    },
    /*
    -------------------- ERRORS --------------------
    */
    error: false,
    reservaPageError: false,
    acomodPageError: false,
    acomodRef: null,
    /*
    -------------------- USER --------------------
    */
    user: {
      userID: null,
      firstName: null,
      fullName: null,
      email: null,
      photoURL: null
    },
    message: {
      timestamp: null,
      from: null,
      to: null,
      text: '',
      about: null,
      id: null,
      checkIn: null,
      checkOut: null,
      totalHospedes: null
    },
    /*
    -------------------- CONFIGS --------------------
    */
    serviceFeeAcomod: 0.08,
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Acomodação ##########
    */
    showReservaAcomod: false,
    isReservar: false,
    visitID: null,
    acomods: null,
    acomod: null,
    acomodMap: null,
    acomodProgressBar: 0,
    acomodPlace: null,
    imageCountAc: 0,
    disabledDatesAcomod: null,
    acomodData: {/* Atualizar action */
      acomodID: null,
      userID: null,
      recipientID: null,
      proprietario: null,
      email: null,
      celular: '',
      celular2: '',
      photoURL: null,
      tipoAcomod: 'Casa',
      title: '',
      subtitle: '',
      valorNoite: 0,
      limpezaFee: 0,
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
      checkInTime: '14:00',
      checkOutTime: 'Horário Flexível',
      allowFestas: false,
      allowPets: false,
      allowBabys: false,
      allowFumar: false,
      regrasAdicionais: [],
      images: []
    },
    reservaAcomod: {/* Atualizar Action */
      reservaID: null,
      acomodID: null,
      airtableID: null,
      requested: null,
      paymentMethod: 'credit_card',
      parcelas: '1',
      status: 'pending',
      isRunning: true,
      totalHospedes: 1,
      periodoReserva: null,
      noites: null,
      valorNoitesTotal: null,
      limpezaFee: null,
      serviceFeeTotal: null,
      valorReservaTotal: null,
      message: '',
      hostID: null,
      hostEmail: null,
      hostName: null,
      hostCelular: null,
      guestID: null,
      guestEmail: null,
      guestName: null,
      guestCPF: null,
      guestCelular: null,
      billing: {
        zipcode: '',
        street: '',
        street_number: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    },
    clickedReservaAcomod: false,
    concludedReservaAcomod: false,
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
    cadastroAcomod12: false,
    reservaAcomod1: true,
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
    passeioCreated: false,
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
      recipientID: null,
      proprietario: null,
      email: null,
      celular: '',
      celular2: '',
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
  /* ________________________________________________ GETTERS ________________________________________________ */
  getters: {
  },
  /* _______________________________________________ MUTATIONS _______________________________________________ */
  mutations: {
    /*
    -------------------- GERAL --------------------
    */
    m_isOnline (state, payload) {
      state.isOnline = payload
    },
    m_isMobile (state, payload) {
      state.isMobile = payload
    },
    m_resetUser (state) {
      state.user.userID = null
      state.user.firstName = null
      state.user.fullName = null
      state.user.email = null
      state.user.photoURL = null
    },
    m_resetMessage (state) {
      state.message.timestamp = null
      state.message.from = null
      state.message.to = null
      state.message.text = ''
      state.message.about = null
      state.message.id = null
      state.message.checkIn = null
      state.message.checkOut = null
      state.message.totalHospedes = null
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
    m_miniLoader (state, payload) {
      state.miniLoader = payload
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
    m_disabledDatesAcomod (state, payload) {
      state.disabledDatesAcomod = payload
    },
    m_showReservaAcomod (state, payload) {
      state.showReservaAcomod = payload
    },
    m_isReservar (state, payload) {
      state.isReservar = payload
    },
    m_acomodID (state, payload) {
      state.acomodData.acomodID = payload
    },
    m_imageCountAc (state) {
      state.imageCountAc++
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
    m_resetCreditCard (state) {
      state.creditCard.cardNumber = ''
      state.creditCard.cardHolderName = ''
      state.creditCard.cardExpirationDate = ''
      state.creditCard.cardCVV = ''
    },
    m_bankAccount (state, payload) {
      state.bankAccount = payload
    },
    m_acomodData (state, payload) {
      state.acomodData = payload
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
    m_cadastroAcomod12 (state, payload) {
      state.cadastroAcomod12 = payload
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
    m_passeioCreated (state, payload) {
      state.passeioCreated = payload
    },
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
  /* ________________________________________________ ACTIONS ________________________________________________ */
  actions: {
    /*
    ########## Error ##########
    */
    a_resetError ({ state }) {
      state.error = false
      state.reservaPageError = false
      state.acomodPageError = false
      state.acomodRef = null
    },
    /*
    ########## Acomodações ##########
    */
    a_resetAcomodData ({ state, commit }) {
      /* Resetar valores */
      state.acomodPlace = null
      state.imageCountAc = 0
      /* Resetar bankAccount */
      commit('m_bankAccount', {
        bankCode: '',
        type: 'conta_corrente',
        agencia: '',
        agenciaDV: '',
        conta: '',
        contaDV: '',
        legalName: '',
        docNumber: ''
      })
      /* Resetar acomodData */
      commit('m_acomodData', {
        acomodID: null,
        userID: null,
        recipientID: null,
        proprietario: null,
        email: null,
        celular: '',
        celular2: '',
        photoURL: null,
        tipoAcomod: 'Casa',
        local: null,
        title: '',
        subtitle: '',
        valorNoite: 0,
        limpezaFee: 0,
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
        checkInTime: '14:00',
        checkOutTime: 'Horário Flexível',
        allowFestas: false,
        allowPets: false,
        allowBabys: false,
        allowFumar: false,
        regrasAdicionais: [],
        images: []
      })
    },
    a_resetReservaAcomod ({ state }) { /* Resetar dados quando usuário for p/ outra acomod (evitar bugs) */
      state.reservaAcomod = {
        reservaID: null,
        acomodID: null,
        airtableID: null,
        requested: null,
        paymentMethod: 'credit_card',
        parcelas: '1',
        status: 'pending',
        isRunning: true,
        totalHospedes: 1,
        periodoReserva: null,
        noites: null,
        valorNoitesTotal: null,
        limpezaFee: null,
        serviceFeeTotal: null,
        valorReservaTotal: null,
        message: '',
        hostID: null,
        hostEmail: null,
        hostName: null,
        hostCelular: null,
        guestID: null,
        guestEmail: null,
        guestName: null,
        guestCPF: null,
        guestCelular: null,
        billing: {
          zipcode: '',
          street: '',
          street_number: '',
          neighborhood: '',
          city: '',
          state: ''
        }
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
      firebase.firestore().collection('eventos').doc(state.eventoID).set(state.eventoData).then(() => {
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
      firebase.firestore().collection('passeios').doc(state.passeioID).set(state.passeioData).then(() => {
        /* Resetar states */
        commit('m_passeioData', {
          passeioID: null,
          userID: null,
          proprietario: null,
          email: null,
          celular: '',
          celular2: '',
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
      firebase.firestore().collection('atracoes').doc(state.atracaoID).set(state.atracaoData).then(() => {
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
    a_googleSignIn ({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      dispatch('a_authStateObserver')
    },
    /*
    ########## FACEBOOK SIGN IN ##########
    */
    a_facebookSignIn ({ dispatch }) {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
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
        state.atracaoData.email = user.email
        dispatch('a_setUser')
      })
    },
    /*
    ########## SET USER ##########
    */
    a_setUser ({ state }) {
      /* Chechar se user já existe */
      firebase.firestore().collection('users').doc(state.user.userID).get().then(doc => {
        if (!doc.exists) {
          /* 1) Set User Firestore */
          firebase.firestore().collection('users').doc(state.user.userID).set(state.user)
          .then(() => {
            /* 2) Set User Airtable */
            this.$axios.$post('https://api.airtable.com/v0/app2VZONmWdcr8ybJ/Users?api_key=keyoOJ1ERQwpa2EIg', {
              'fields': {
                'userID': state.user.userID,
                'firstName': state.user.firstName,
                'fullName': state.user.fullName,
                'email': state.user.email,
                'photoURL': state.user.photoURL
              }
            })
          })
        }
      })
    },
    /*
    ########## SIGN OUT ##########
    */
    a_signOut ({ commit }) {
      firebase.auth().signOut().then(() => commit('m_resetUser'))
    }
  }
})

export default store
