import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const store = () => new Vuex.Store({
  plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
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
    showHost: false,
    showFiltrarAcomods: false,
    menuIconAnime: false,
    loader: false,
    miniLoader: false,
    lastHash: null,
    randomHashs: null,
    offFoobar1: true,
    offFoobar2: true,
    offFoobar3: true,
    offFoobar4: true,
    offFoobar5: true,
    heightImageBox: null,
    fromWithoutAddress: false,
    visitID: null,
    visitsLastMonth: null,
    /*
    -------------------- USER --------------------
    */
    authUser: false,
    user: {
      userID: null,
      firstName: null,
      fullName: null,
      email: null,
      photoURL: null
    },
    /*
    -------------------- PERFIL --------------------
    */
    perfil: {
      reservas: {
        acomods: null
      },
      anuncios: {
        acomods: null
      },
      showReservas: true,
      showAnuncios: false,
      showMessages: false,
      showEdit: false
    },
    bankAccount: { /* !!! REMOVER !!! */
      bankCode: '',
      type: 'conta_corrente',
      agencia: '',
      agenciaDV: '',
      conta: '',
      contaDV: '',
      legalName: '',
      docNumber: ''
    },
    /*
    -------------------- CREDIT CARD --------------------
    */
    creditCard: {
      cardNumber: '',
      cardHolderName: '',
      cardExpirationDate: '',
      cardCVV: ''
    },
    cardType: null,
    cardTypeNice: null,
    /*
    -------------------- CUSTOMER --------------------
    */
    customer: {
      name: '',
      email: '',
      cpf: '',
      celular: '',
      zipcode: '',
      street: '',
      street_number: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    /*
    -------------------- FILTERS --------------------
    */
    filters: {
      date: null,
      local: null,
      hospedes: 0,
      tipoAcomod: null,
      preco: null,
      avaliacao: null
    },
    allAcomods: null,
    filteredAcomods: null,
    /*
    -------------------- GOOGLE MAPS --------------------
    */
    markerUrl: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
    markerUrlPartida: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker-partida.svg?alt=media&token=bd41c89e-33ea-4899-bb5a-4f2fc2d936cb',
    markerUrlChegada: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker-chegada.svg?alt=media&token=b5b52bc5-a65f-4136-9c31-57830b969067',
    markerSize: null,
    /*
    -------------------- ALERT --------------------
    */
    alert: {
      type: '', /* error, warning, info */
      title: '',
      message: '',
      persist: false
    },
    /*
    -------------------- AVALIAÇÕES --------------------
    */
    avaliacaoAcomod: {
      createdAt: null,
      ratings: {
        recepcao: 0,
        limpeza: 0,
        precisao: 0,
        valor: 0
      },
      fullName: '',
      comment: ''
    },
    avaliacaoPasseio: {
      createdAt: null,
      ratings: {
        habilidade: 0,
        seguranca: 0,
        precisao: 0,
        valor: 0
      },
      fullName: '',
      comment: ''
    },
    avaliacaoAcomodEtapa1: true,
    avaliacaoAcomodEtapa2: false,
    avaliacaoPasseioEtapa1: true,
    avaliacaoPasseioEtapa2: false,
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Acomodação ##########
    */
    showReservaAcomod: false,
    isReservar: false,
    acomods: null,
    acomod: null,
    host: null,
    acomodMap: null,
    acomodProgressBar: 0,
    acomodPlace: null,
    imageCountAc: 0,
    acomodData: { /* Atualizar action */
      createdAt: null,
      acomodID: null,
      hostID: '',
      recipientID: null,
      celular: '',
      tipoAcomod: 'Casa',
      title: '',
      subtitle: '',
      valorNoite: 0,
      limpezaFee: 0,
      totalHospedes: 1,
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
      checkOutTime: 'A qualquer hora',
      allowFestas: false,
      allowPets: false,
      allowBabys: false,
      allowFumar: false,
      regrasAdicionais: [],
      images: [],
      avaliacoes: [],
      averageRating: 0,
      averageRating_recepcao: 0,
      averageRating_limpeza: 0,
      averageRating_precisao: 0,
      averageRating_valor: 0,
      iCalendars: {
        airbnb: '',
        booking: ''
      },
      disabledDates_airbnb: [],
      disabledDates_booking: [],
      disabledDates_escarpasTrip: []
    },
    concludedNewAcomod: false,
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
    reservaAcomod: { /* Atualizar Action */
      createdAt: null,
      reservaID: null,
      acomodID: null,
      tipoAcomod: '',
      hostID: null,
      guest: {
        firstName: '',
        fullName: '',
        email: '',
        celular: ''
      },
      totalHospedes: 1,
      startDate: '',
      endDate: '',
      noites: null,
      valorNoitesTotal: null,
      limpezaFee: null,
      valorReservaTotal: null
    },
    reservaAcomod1: true,
    reservaAcomod2: false,
    reservaAcomod3: false,
    reservaAcomod4: false,
    reservaAcomod5: false,
    reservaAcomodPaymentMethod: false,
    reservaAcomodCreditCard: false,
    reservaAcomodBoleto: false,
    reservaAcomodBilling: false,
    reservaAcomodDesktop1: true,
    reservaAcomodDesktop2: false,
    etapaReserva1ok: true,
    etapaReserva2ok: false,
    paymentAdded: false,
    validZipcode: false,
    concludedReservaAcomod: false,
    /*
    ########## Passeio ##########
    */
    passeios: null,
    passeio: null,
    passeioProgressBar: 0,
    imageCountPas: 0,
    passeioData: { /* Atualizar a action */
      createdAt: null,
      passeioID: null,
      hostID: null,
      tipoPasseio: 'Lancha',
      capacidade: 1,
      localPartida: null,
      rotas: [
        {
          valor: 0,
          horarioPartida: '',
          duracao: 1,
          pontosVisitados: []
        }
      ],
      images: [],
      title: '',
      subtitle: '',
      avaliacoes: [],
      averageRating: 0,
      averageRating_habilidade: 0,
      averageRating_seguranca: 0,
      averageRating_precisao: 0,
      averageRating_valor: 0
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
    reservaPasseio: {
      createdAt: null,
      reservaID: null,
      passeioID: null,
      tipoPasseio: '',
      hostID: null,
      guest: {
        firstName: '',
        fullName: '',
        email: '',
        celular: ''
      },
      totalPessoas: 1,
      date: '',
      rota: 1,
      horario: ''
    },
    concludedReservaPasseio: false,
    reservaPasseioDesktop1: true,
    reservaPasseioDesktop2: false,
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
    eventoData: { /* Atualizar a action */
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
    m_avaliacaoAcomodEtapa1 (state, payload) {
      state.avaliacaoAcomodEtapa1 = payload
    },
    m_avaliacaoAcomodEtapa2 (state, payload) {
      state.avaliacaoAcomodEtapa2 = payload
    },
    m_avaliacaoPasseioEtapa1 (state, payload) {
      state.avaliacaoPasseioEtapa1 = payload
    },
    m_avaliacaoPasseioEtapa2 (state, payload) {
      state.avaliacaoPasseioEtapa2 = payload
    },
    m_resetAvaliacaoAcomod (state) {
      state.avaliacaoAcomodEtapa1 = true
      state.avaliacaoAcomod.createdAt = null
      state.avaliacaoAcomod.ratings.recepcao = 0
      state.avaliacaoAcomod.ratings.limpeza = 0
      state.avaliacaoAcomod.ratings.precisao = 0
      state.avaliacaoAcomod.ratings.valor = 0
      state.avaliacaoAcomod.fullName = ''
      state.avaliacaoAcomod.comment = ''
    },
    m_resetAvaliacaoPasseio (state) {
      state.avaliacaoPasseioEtapa1 = true
      state.avaliacaoPasseio.createdAt = null
      state.avaliacaoPasseio.ratings.habilidade = 0
      state.avaliacaoPasseio.ratings.seguranca = 0
      state.avaliacaoPasseio.ratings.precisao = 0
      state.avaliacaoPasseio.ratings.valor = 0
      state.avaliacaoPasseio.fullName = ''
      state.avaliacaoPasseio.comment = ''
    },
    show_alert (state, payload) {
      state.alert = payload
    },
    hide_alert (state) {
      state.alert.type = ''
      state.alert.title = ''
      state.alert.message = ''
      state.alert.persist = false
    },
    m_isOnline (state, payload) {
      state.isOnline = payload
    },
    m_isMobile (state, payload) {
      state.isMobile = payload
    },
    m_authUser (state, payload) {
      state.authUser = payload
    },
    m_user (state, payload) {
      state.user = payload
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
    m_showHost (state, payload) {
      state.showHost = payload
    },
    m_showFiltrarAcomods (state, payload) {
      state.showFiltrarAcomods = payload
    },
    m_visitsLastMonth (state, payload) {
      state.visitsLastMonth = payload
    },
    m_allAcomods (state, payload) {
      state.allAcomods = payload
    },
    m_filteredAcomods (state, payload) {
      state.filteredAcomods = payload
    },
    m_decrementHospedes (state) {
      if (state.filters.hospedes > 0) {
        state.filters.hospedes--
      }
    },
    m_incrementHospedes (state) {
      if (state.filters.hospedes < 25) {
        state.filters.hospedes++
      }
    },
    m_resetFilters (state) {
      state.filteredAcomods = null
      state.filters.date = null
      state.filters.hospedes = 0
      state.filters.tipoAcomod = null
      state.filters.preco = null
      state.filters.avaliacao = null
    },
    m_perfil (state, payload) {
      state.perfil = payload
    },
    m_perfilReservasAcomods (state, payload) {
      state.perfil.reservas.acomods = payload
    },
    m_perfilShowReservas (state, payload) {
      state.perfil.showReservas = payload
    },
    m_perfilShowAnuncios (state, payload) {
      state.perfil.showAnuncios = payload
    },
    m_perfilShowMessages (state, payload) {
      state.perfil.showMessages = payload
    },
    m_perfilShowEdit (state, payload) {
      state.perfil.showEdit = payload
    },
    /*
    -------------------- ANÚNCIOS --------------------
    */
    /*
    ########## Acomodação ##########
    */
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
    m_noites (state, payload) {
      state.reservaAcomod.noites = payload
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
    m_host (state, payload) {
      state.host = payload
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
    m_reservaAcomod5 (state, payload) {
      state.reservaAcomod5 = payload
    },
    m_reservaAcomodPaymentMethod (state, payload) {
      state.reservaAcomodPaymentMethod = payload
    },
    m_reservaAcomodCreditCard (state, payload) {
      state.reservaAcomodCreditCard = payload
    },
    m_reservaAcomodBoleto (state, payload) {
      state.reservaAcomodBoleto = payload
    },
    m_reservaAcomodBilling (state, payload) {
      state.reservaAcomodBilling = payload
    },
    m_reservaAcomodDesktop1 (state, payload) {
      state.reservaAcomodDesktop1 = payload
    },
    m_reservaAcomodDesktop2 (state, payload) {
      state.reservaAcomodDesktop2 = payload
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
      state.passeioData.passeioID = payload
    },
    m_passeioData (state, payload) {
      state.passeioData = payload
    },
    m_addRotaPasseio (state) {
      state.passeioData.rotas.push({
        valor: 0,
        horarioPartida: '',
        duracao: '',
        pontosVisitados: []
      })
    },
    m_removeRotaPasseio (state, index) {
      state.passeioData.rotas.splice(index, 1)
    },
    m_imageCountPas (state) {
      state.imageCountPas++
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
    m_reservaPasseioDesktop1 (state, payload) {
      state.reservaPasseioDesktop1 = payload
    },
    m_reservaPasseioDesktop2 (state, payload) {
      state.reservaPasseioDesktop2 = payload
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
    #################### GERAL ####################
    */
    a_generateRandomHashs ({ state }) {
      let randomHashs = []
      while (randomHashs.length < 15) {
        let randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString()
        if (randomHashs.indexOf(randomNumber) > -1) continue
        randomHashs[randomHashs.length] = randomNumber
      }
      state.randomHashs = randomHashs
    },
    /*
    #################### ACOMODS ####################
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
        createdAt: null,
        acomodID: null,
        hostID: '',
        recipientID: null,
        celular: '',
        tipoAcomod: 'Casa',
        title: '',
        subtitle: '',
        valorNoite: 0,
        limpezaFee: 0,
        totalHospedes: 1,
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
        checkOutTime: 'A qualquer hora',
        allowFestas: false,
        allowPets: false,
        allowBabys: false,
        allowFumar: false,
        regrasAdicionais: [],
        images: [],
        avaliacoes: [],
        averageRating: 0,
        averageRating_recepcao: 0,
        averageRating_limpeza: 0,
        averageRating_precisao: 0,
        averageRating_valor: 0,
        iCalendars: {
          airbnb: '',
          booking: ''
        },
        disabledDates_airbnb: [],
        disabledDates_booking: [],
        disabledDates_escarpasTrip: []
      })
    },
    a_resetReservaAcomod ({ state }) { /* Resetar dados quando usuário for p/ outra acomod (evitar bugs) */
      state.reservaAcomod = {
        createdAt: null,
        reservaID: null,
        acomodID: null,
        hostID: null,
        guest: {
          firstName: '',
          fullName: '',
          email: '',
          celular: ''
        },
        totalHospedes: 1,
        startDate: '',
        endDate: '',
        noites: null,
        valorNoitesTotal: null,
        limpezaFee: null,
        valorReservaTotal: null
      }
      state.reservaAcomodDesktop1 = true
      state.reservaAcomodDesktop2 = false
      state.etapaReserva1ok = true
      state.etapaReserva2ok = false
    },
    /*
    #################### EVENTOS ####################
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
    #################### PASSEIOS ####################
    */
    a_resetPasseioData ({ state, commit }) {
      state.imageCountPas = 0
      commit('m_resetCreditCard')
      commit('m_passeioData', {
        createdAt: null,
        passeioID: null,
        hostID: null,
        tipoPasseio: 'Lancha',
        capacidade: 1,
        localPartida: null,
        rotas: [
          {
            valor: 0,
            horarioPartida: '',
            duracao: 1,
            pontosVisitados: []
          }
        ],
        images: [],
        title: '',
        subtitle: '',
        avaliacoes: [],
        averageRating: 0,
        averageRating_habilidade: 0,
        averageRating_seguranca: 0,
        averageRating_precisao: 0,
        averageRating_valor: 0
      })
    },
    a_resetReservaPasseio ({ state }) { /* Resetar dados quando usuário for p/ outro passeio (evitar bugs) */
      state.reservaPasseio = {
        createdAt: null,
        reservaID: null,
        passeioID: null,
        tipoPasseio: '',
        hostID: null,
        guest: {
          firstName: '',
          fullName: '',
          email: '',
          celular: ''
        },
        totalPessoas: 1,
        date: '',
        rota: 1,
        horario: ''
      }
      state.reservaPasseioDesktop1 = true
      state.reservaPasseioDesktop2 = false
      state.etapaReserva1ok = true
      state.etapaReserva2ok = false
    },
    /*
    #################### ATRAÇÕES ####################
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
    #################### SIGN IN ####################
    */
    async a_googleSignIn ({ dispatch }) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        dispatch('a_authStateObserver')
      } catch (err) {
        console.log(err)
      }
    },
    async a_facebookSignIn ({ dispatch }) {
      try {
        const provider = new firebase.auth.FacebookAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        dispatch('a_authStateObserver')
      } catch (err) {
        console.log(err)
      }
    },
    a_authStateObserver ({ commit, state }) {
      firebase.auth().onAuthStateChanged(async user => {
        /* Se sign-in */
        if (user !== null) {
          try {
            commit('m_user', {
              userID: user.uid,
              firstName: user.displayName.split(' ')[0],
              fullName: user.displayName,
              email: user.email,
              photoURL: user.providerData[0].providerId === 'facebook.com' ? `${user.photoURL}?height=300` : user.photoURL
            })
            commit('m_authUser', true)
            /* Get user para chechar se já existe na Firestore */
            const userDoc = await firebase.firestore().doc(`users/${user.uid}`).get()
            /* Se existir */
            if (userDoc.exists) {
              commit('m_user', userDoc.data())
            } else {
              await firebase.functions().httpsCallable('newUser')({ user: state.user })
            }
          } catch (err) {
            console.log(err)
          }
        }
      })
    },
    async a_signOut ({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('m_authUser', false)
        commit('m_user', {
          userID: null,
          firstName: null,
          fullName: null,
          email: null,
          photoURL: null
        })
        commit('m_perfil', {
          reservas: {
            acomods: null
          },
          anuncios: {
            acomods: null
          },
          showReservas: true,
          showAnuncios: false,
          showMessages: false,
          showEdit: false
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default store
