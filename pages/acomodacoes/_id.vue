<template>
  <div class="acomods-id">

    <proprietario/>

    <!-- ####### TOPBAR ####### -->
    <div class="topbar" v-scroll="scrollTopbarBg">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar">
        </div>
        
      </div>
    </div><!-- ####### TOPBAR ####### -->
    

    
    <!-- ####### IMAGE ####### -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOption">
        
        <swiper-slide class="slide">
          <progressive-background class="__img" :src="image1H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="2/3"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-background class="__img" :src="image2H(acomod)" :placeholder="acomod.imageL2" :aspect-ratio="2/3"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage3">
          <progressive-background class="__img" :src="image3H(acomod)" :placeholder="acomod.imageL3" :aspect-ratio="2/3"/>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <div class="desktop-view"><!-- Desktop View -->

      

      <div class="desktop-view-info"><!-- Desktop View Info -->

        <h1 class="id-title">{{ acomod.title }}</h1>


        <!-- ####### ANUNCIANTE ####### -->
        <div class="anunciante-box">
          <img class="__anunciante-img" :src="acomod.photoURL" @click="$store.commit('m_showProprietario', true), hashProprietario()">
          <div class="box-flex-column">
            <h3 style="user-select:none">Hospedado por</h3>
            <a class="__anunciante-name" @click="$store.commit('m_showProprietario', true), hashProprietario()">{{ acomod.proprietario }}</a>
          </div>
        </div><!-- ####### ANUNCIANTE ####### -->


        
        <!-- ####### SOBRE ####### -->
        <h1 class="item-title">Sobre {{ tipoAcomodText }}</h1>

        <div class="sobre-box">
          <h3>{{ acomod.subtitle }}</h3>
        </div><!-- ####### SOBRE ####### -->



        <!-- ####### CARACTERÍSTICAS ####### -->
        <h1 class="item-title">Características</h1>

        <div class="caracteristicas-box">
          
          <div class="__item-caracteristica">
            <img class="__img-caracteristica" src="../../assets/img/quarto.svg">
            <h3>
              {{ acomod.totalQuartos }} {{ acomod.totalQuartos == '1' ? 'quarto' : 'quartos' }} ({{ acomod.totalSuites }} {{ acomod.totalSuites == '1' ? 'suíte' : 'suítes' }})
            </h3>
          </div>

          <div class="__item-caracteristica">
            <img class="__img-caracteristica" src="../../assets/img/banheiro.svg" style="transform: scale(1.06)">
            <h3>
              {{ acomod.totalBanheiros }} {{ acomod.totalBanheiros == '1' ? 'banheiro' : 'banheiros' }}
            </h3>
          </div>

          <div class="__item-caracteristica">
            <img class="__img-caracteristica" src="../../assets/img/garagem.svg" style="transform: scale(1.01)">
            <h3>
              {{ acomod.totalGaragem }} {{ acomod.totalGaragem == '1' ? 'vaga' : 'vagas' }} na garagem
            </h3>
          </div>

        </div><!-- ####### CARACTERÍSTICAS ####### -->



        <!-- ####### CAPACIDADE ####### -->
        <h1 class="item-title">Capacidade</h1>

        <div class="capacidade-box">
          <h3>{{ acomod.totalHospedes }} pessoas</h3>
        </div><!-- ####### CAPACIDADE ####### -->



        <!-- ####### COMODIDADES ####### -->
        <h1 class="item-title">Comodidades</h1>

        <div class="comodidades-box" @click="showComods = true, hashComods()">
          <img class="__img-comodidade" v-if="acomod.hasRoupasCama" src="../../assets/img/hasRoupasCama.svg" style="transform: scale(1.01)">
          <img class="__img-comodidade" v-if="acomod.hasPiscina" src="../../assets/img/hasPiscina.svg">
          <img class="__img-comodidade" v-if="acomod.hasChurrasqueira" src="../../assets/img/hasChurrasqueira.svg">
          <img class="__img-comodidade" v-if="acomod.hasCozinha" src="../../assets/img/hasCozinha.svg" style="transform: scale(1.07)">
          <img class="__img-comodidade" v-if="acomod.hasWifi" src="../../assets/img/hasWifi.svg" style="transform: scale(.98)">
          <img class="__img-comodidade" v-if="acomod.hasArCond" src="../../assets/img/hasArCond.svg">
          <img class="__img-comodidade" v-if="acomod.hasCaixaSom" src="../../assets/img/hasCaixaSom.svg" style="transform: scale(.92)">
          <img class="__img-comodidade" v-if="acomod.hasBarracas" src="../../assets/img/hasBarracas.svg" style="transform: scale(1.1)">
          <img class="__img-comodidade" v-if="acomod.hasPier" src="../../assets/img/hasPier.svg">
        </div>

        <transition name="comods-animation">
          <div class="comods-details" v-show="showComods">

            <div class="back-bar">
              <div class="back-box" @click="backBtn">
                <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
              </div>
            </div>

            <div class="comods-body">
      
              <h1 class="__title">Comodidades</h1>

              <div class="comods-item" v-if="acomod.hasRoupasCama">
                <img src="../../assets/img/hasRoupasCama.svg" class="__img" style="transform: scale(1.01)">
                <h3>Roupas de Cama e Toalhas</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasPiscina">
                <img src="../../assets/img/hasPiscina.svg" class="__img">
                <h3>Piscina</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasChurrasqueira">
                <img src="../../assets/img/hasChurrasqueira.svg" class="__img">
                <h3>Churrasqueira</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasCozinha">
                <img src="../../assets/img/hasCozinha.svg" class="__img" style="transform: scale(1.07)">
                <h3>Cozinha Preparada</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasWifi">
                <img src="../../assets/img/hasWifi.svg" class="__img" style="transform: scale(.98)">
                <h3>WiFi</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasArCond">
                <img src="../../assets/img/hasArCond.svg" class="__img">
                <h3>Ar Condicionado</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasCaixaSom">
                <img src="../../assets/img/hasCaixaSom.svg" class="__img" style="transform: scale(.92)">
                <h3>Caixa de Som</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasBarracas">
                <img src="../../assets/img/hasBarracas.svg" class="__img" style="transform: scale(1.1)">
                <h3>Barracas</h3>
              </div>
              <div class="comods-item" v-if="acomod.hasPier">
                <img src="../../assets/img/hasPier.svg" class="__img">
                <h3>Pier</h3>
              </div>

            </div> 
          </div>
        </transition><!-- ####### COMODIDADES ####### -->



        <!-- ####### DISPONIBILIDADE ####### -->
        <h1 class="item-title">Disponibilidade</h1>

        <v-calendar
          is-linked
          is-inline
          is-double-paned
          is-expanded
          :min-date='new Date()'
          mode='single'
          :theme-styles='themeStylesDesktop'
          :attributes='attributes'
          >
        </v-calendar>
        <!-- ####### DISPONIBILIDADE ####### -->



        <!-- ####### LOCALIZAÇÃO ####### -->
        <h1 class="item-title">Local</h1>

        <div class="local-box">

          <h3 class="__adress">{{ acomod.address }}</h3>

          <gmap-map
          :center="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
          :zoom="15"
          :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
          @click="$store.commit('m_acomodMap', acomod), enterFullscreen()">
            <Gmap-Marker
            :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
            :icon="{url: markerUrl, scaledSize: markerSize}"
            ></Gmap-Marker>
          </gmap-map>
        </div><!-- ####### LOCALIZAÇÃO ####### -->


      
        <!-- ####### AVALIAÇÕES ####### -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ####### AVALIAÇÕES ####### -->



      </div><!-- Desktop View Info -->



      <div class="reserva-desktop">
        <form class="reserva-desktop-form">

          <div class="valor-box">
            <h1 class="__valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__valor-dia"> por noite</span></h1>
          </div>

          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
            </select>
          </div>

          <div class="item-form">
            <v-date-picker
              is-double-paned
              is-linked
              ref='datePicker'
              mode='range'
              v-model='$store.state.reservaAcomod.periodoReserva'
              :min-date='new Date()'
              :pane-width='280'
              :disabled-dates='disabledDates'
              :drag-attribute='myAttribute'
              :select-attribute='myAttribute'
              :disabled-attribute='disabledAttribute'
              :theme-styles='themeStylesReserva'
              :formats='formats'
              popover-align='right'
              tint-color='#00D8C7'
              show-caps
              popover-visibility='focus'>
              <div
                slot-scope='{ inputValue, updateValue }'>
                <div>
                  <input
                    type='text'
                    placeholder='Chegada - Partida'
                    :value="inputValue"
                    @change='updateValue($event.target.value)' 
                    class="reserva-input-date"
                  />
                  <img 
                    src="../../assets/img/exit.svg"
                    v-if="$store.state.reservaAcomod.periodoReserva !== null"
                    class="reserva-close-date"
                    @click='$store.state.reservaAcomod.periodoReserva = null'
                  >
                </div>
              </div>
            </v-date-picker>
          </div>

          <div class="reserva-info" v-if="$store.state.reservaAcomod.periodoReserva !== null">
            
            <div class="reserva-info_item" style="padding-bottom: .2rem">
              <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ $store.state.reservaAcomod.noites }} noites</h3>
              <h3 id="valor">R$ {{ valorNoitesTotal.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item" style="padding-bottom: .2rem">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de limpeza</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
                <v-dialog id="limpeza-fee" style="z-index:10000"/>
              </div>
              <h3>R${{ this.acomod.limpezaFee.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item" style="padding-bottom: .4rem">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de serviço</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
                <v-dialog id="service-fee" style="z-index:10000"/>
              </div>
              <h3>R${{ serviceFeeTotal.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item-total" style="padding-top: .3rem">
              <h3>Total</h3>
              <h3>R${{ valorReservaTotal.toLocaleString() }}</h3>
            </div>

            <!-- <div class="reserva-info_item" v-if="$store.state.reservaAcomod.totalHospedes != 1">
              <h3>Dividido para {{ $store.state.reservaAcomod.totalHospedes }}</h3>
              <h3>R${{ valorReservaTotalDividido.toLocaleString() }}</h3>
            </div> -->

          </div>

          <button class="__reserva-desktop-btn" type="button" @click="reservar">Reservar</button>
          <reserva-acomod-desktop/>

          <h4 class="__info">Não se preocupe, você ainda não será cobrado.</h4>

          <button class="__reserva-desktop-btn-ask" type="button" @click="$store.state.user.email === null ? $modal.show('sign-in-modal') : $modal.show('ask-acomod-modal'), $store.state.clickedAskAcomod = true, $store.state.isSignIn = false">Fazer uma Pergunta</button>
          <ask-acomod/>

        </form>
      </div>


    </div><!-- Desktop View -->


    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorNoite }}<span class="__reserva-valor-pessoa">/noite</span></h3>
        <button class="__reserva-btn" @click="$store.commit('m_showReservaAcomod', true), hashReserva()">Reservar</button>
      </div>
    </div>
    <reserva-acomod/><!-- ####### RESERVA ####### -->

    
  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import AskAcomod from '../../components/reserva-acomod/AskAcomod'
import PopoverCalendar from '../../components/reserva-acomod/PopoverCalendar'
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import ReservaAcomod from '../../components/ReservaAcomod'
import ReservaAcomodDesktop from '../../components/reserva-acomod/ReservaAcomodDesktop'
import Proprietario from '../../components/Proprietario'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'

export default {
  components: { ReservaAcomod, ReservaAcomodDesktop, Proprietario, AskAcomod },
  mixins: [mapstyle],
  data () {
    return {
      showComods: false,

      attributes: [
        {
          key: 'disabledDates',
          contentStyle: {
            opacity: .3
          },
          dates: {
            start: null, // From the beginning of time
            end: new Date().setDate(new Date().getDate() - 1) // Until yesterday
          }
        }
      ],
      myAttribute: {
        popover: {
          hideIndicator: true,
          component: PopoverCalendar
        },
        /* contentStyle: {
          color: 'white',
          opacity: 1
        }, */
        /* contentHoverStyle: {
          color: 'white'
        },
        highlight: {
          color: 'white'
        } */
      },
      formats: {
        input: ['D MMM', 'D MMM']
      },
      disabledAttribute: {
        contentStyle: {
          opacity: .3
        },
        contentHoverStyle: {
          cursor: 'default',
          backgroundColor: 'transparent',
        }
      },
      themeStylesDesktop: {
        wrapper: {
          color: 'rgb(42, 42, 42)',
          margin: '10px 0px 0 0px',
          padding: '10px 0px 0 0px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.5rem',
        },
        headerTitle: {
          fontSize: '17px',
          fontWeight: '600'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontSize: '15px',
          fontWeight: '600',
          padding: '14px 5px 6px 5px',
        },
        dayCell: {
          height: '38px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '14px'
        },
        dayCellNotInMonth: {
          opacity: 0
        },
        verticalDivider: {
          borderLeft: 'none',
        }
      },
      themeStylesReserva: {
        wrapper: {
          color: 'rgb(42, 42, 42)',
          borderTop: '8px solid white',
          borderBottom: '8px solid white',
          borderLeft: '15px solid white',
          borderRight: '15px solid white',
          background: 'white',
          boxShadow: '1px 1px 25px 2px rgba(0,0,0,0.1)'
        },
        header: {
          padding: '10px 9px 0px 9px',
        },
        headerArrows: {
          fontSize: '1.45rem',
        },
        headerTitle: {
          fontSize: '16px',
          fontWeight: '600'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontWeight: '600',
          padding: '21px 5px 6px 5px',
        },
        dayCell: {
          height: '34px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '14px'
        },
        dayCellNotInMonth: {
          opacity: 0
        },
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      } 
    }
  },
  head () {
    return {
      title: this.$store.state.acomod.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.acomod.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/acomods/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.acomod.title },
        { property: 'og:description', content: this.$store.state.acomod.subtitle },
        { property: 'og:image', content: this.$store.state.acomod.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  middleware: 'acomodValidate',
  transition: 'id',
  fetch ({ store, params }) {
    return firebase.firestore().collection('acomods').doc(params.id).get().then(doc => {
      store.commit('m_acomod', doc.data())
      if (store.state.isMobile === true) {
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      }
      store.commit('m_loader', false)
      if (doc.exists) {
        firebase.firestore().collection('acomods').doc(params.id).collection('visits').add({ 
          date: new Date().getTime(),
          fromMobile: store.state.isMobile,
          clickedReservaBtn: false,
          wentToReservaPage: false,
          concludedReserva: false
        }).then(doc => store.state.visitedID = doc.id)
      }
    })
  },
  methods: {
    scrollTopbarBg (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "background: white; box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1)")
        : el.removeAttribute("style")
    },
    scrollTopbarBtns (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "filter: invert(90%)")
        : el.removeAttribute("style")
    },
    reservar () {
      firebase.firestore().collection('acomods').doc(this.$route.params.id).collection('visited').doc(this.$store.state.visitedID).update({ 
        clickedReservaBtn: true
      })
      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        this.$nextTick(() => this.$refs.datePicker.$el.focus())
      } else {
        this.$store.state.reservaAcomod.startDate = this.$store.state.reservaAcomod.periodoReserva.start.toLocaleDateString('pt-BR')
        this.$store.state.reservaAcomod.endDate = this.$store.state.reservaAcomod.periodoReserva.end.toLocaleDateString('pt-BR')
        if (this.$store.state.user.email === null) {
          this.$store.state.isSignIn = false
          this.$store.state.clickedReservaAcomod = true
          this.$modal.show('sign-in-modal')
        } else {
          this.$store.commit('m_isReservar', true)
          this.$router.push('/acomodacoes/reservar')
        }
      }
    },
    limpezaFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Limpeza',
        text: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodLimpeza}.`,
        buttons: [{ title: 'OK' }]
      })
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        buttons: [{ title: 'OK' }]
      })
    },
    backBtn () {
      window.history.back(1)
    },
    closeComods () {
      this.showComods = false
      window.history.back(1)
    },
    hashReserva () {
       window.location.hash = "reserva1"
    },
    hashProprietario () {
       window.location.hash = "contato"
    },
    hashComods () {
       window.location.hash = "comodidades"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    image1H (acomod) {
      return supportsWebP ? acomod.imageH1W : acomod.imageH1J
    },
    image2H (acomod) {
      return supportsWebP ? acomod.imageH2W : acomod.imageH2J
    },
    image3H (acomod) {
      return supportsWebP ? acomod.imageH3W : acomod.imageH3J
    },
    enterFullscreen () {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  },
  async mounted () {
    loaded.then(() => {
      this.$store.state.googleMapsInitialized = true
    })
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    valorNoitesTotal () {
      let valorNoitesTotal = Math.round(this.acomod.valorNoite * this.$store.state.reservaAcomod.noites)
      this.$store.commit('m_valorNoitesTotal', valorNoitesTotal)
      return valorNoitesTotal
    },
    serviceFeeTotal () {
      let serviceFeeTotal = Math.round(this.valorNoitesTotal * this.$store.state.serviceFeeAcomod)
      this.$store.commit('m_serviceFeeTotal', serviceFeeTotal)
      return serviceFeeTotal
    },
    valorReservaTotal () {
      let valorReservaTotal = this.valorNoitesTotal + this.acomod.limpezaFee + this.serviceFeeTotal
      this.$store.commit('m_valorReservaTotal', valorReservaTotal)
      return valorReservaTotal
    },
    valorReservaTotalDividido () {
      return Math.round(this.valorReservaTotal/this.$store.state.reservaAcomod.totalHospedes)
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    disabledDates () {
      return 
    },
    swiperOption () {
      if (this.$store.state.isMobile === true) {
        return {
          pagination: '.swiper-pagination',
          dynamicBullets: true,
          autoplay: 2300
        }
      } else {
        return {
          slidesPerView: 2.37,
          spaceBetween: 7,
          pagination: '',
          dynamicBullets: true,
          freeMode: true,
          autoplay: 2300,
          speed: 10000
        }
      }
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(42, 42)
    },
    tipoAcomodText () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'a Casa' 
           : path === 'Apartamento' ? 'o Apartamento'
           : path === 'Rancho' ? 'o Rancho'
           : path === 'Chácara' ? 'a Chácara'
           : path === 'Pousada' ? 'a Pousada'
           : path === 'Camping' ? 'o Camping'
           : path === 'Sítio' ? 'o Sítio'
           : path === 'Fazenda' ? 'a Fazenda'
           : path === 'Hostel' ? 'o Hostel'
           : ''
    },
    tipoAcomodLimpeza () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'da casa' 
           : path === 'Apartamento' ? 'do apartamento'
           : path === 'Rancho' ? 'do rancho'
           : path === 'Chácara' ? 'da chácara'
           : path === 'Pousada' ? 'da pousada'
           : path === 'Camping' ? 'do camping'
           : path === 'Sítio' ? 'do sítio'
           : path === 'Fazenda' ? 'da fazenda'
           : path === 'Hostel' ? 'do hostel'
           : ''
    },
    acomod () {
      return this.$store.state.acomod
    },
    ifImage2 () {
      return this.acomod.imageH2W === null ? '' : supportsWebP ? this.acomod.imageH2W : this.acomod.imageH2J
    },
    ifImage3 () {
      return this.acomod.imageH3W === null ? '' : supportsWebP ? this.acomod.imageH3W : this.acomod.imageH3J
    },
    showShare () {
      return this.$store.state.showShare
    },
    hash () {
      return this.$route.hash
    }
  },
  watch: {
    hash (value) {
      value === '' ? this.showComods = false : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$modal.hide('reserva-desktop-modal') /* Prevenir bug */
      if (vm.$store.state.isMobile === false) {
        vm.$store.commit('m_showNavbar', true)
      } else {
        vm.$store.commit('m_showNavbar', false)
        vm.$store.commit('m_showFoobar', false)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.isReservar === false) {
      this.$store.dispatch('a_resetReservaAcomod')
    }
    if (this.$store.state.showNavbar === false && this.$store.state.showFoobar === false) {
      this.$store.commit('m_showNavbar', true)
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next()
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/pagination.css');
@import url('~/assets/css/_id.css');

.acomods-id {
  background-color: white;
  margin-bottom: 5.3rem;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  

  /* ####### IMAGE BOX ####### */
  & .image-box {
    overflow: hidden;
    & .swiper-container {
      position: relative;
      & .swiper-wrapper {
        display: inline-flex;
        overflow: hidden;
        & .slide {
          & .__img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }/* ####### IMAGE BOX ####### */



  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 2rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      cursor: pointer;
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      user-select: none;
      margin-right: .6rem;
    }
    & .__anunciante-name {
      cursor: pointer;
      color: #00BAAC;
      user-select: none;
    }
  }/* ####### ANUNCIANTE BOX ####### */





  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */





  /* ####### CARACTERÍSTICAS BOX ####### */
  & .caracteristicas-box {
    padding: 0 7%;
    transform: translateY(-.3rem);
    & .__item-caracteristica {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-top: .8rem;
      & .__img-caracteristica {
        width: 1.6rem;
        height: auto;
        margin-right: .7rem;
      }
    }
  }/* ####### CARACTERÍSTICAS BOX ####### */





  /* ####### CAPACIDADE BOX ####### */
  & .capacidade-box {
    padding: 0 7%;
  }/* ####### CAPACIDADE BOX ####### */





  /* ####### COMODIDADES ####### */
  & .comodidades-box {
    padding: 0 4.5%;
    transform: translateY(-.2rem);
    & .__img-comodidade {
      width: 1.8rem;
      height: auto;
      margin: .7rem .8rem 0 .8rem;
    }
  }
  
  & .comods-details {
  position: fixed;
  z-index: 9999;
  width:  100%;
  height: 100%;
  top: 0;
  background: white;
  overflow-y: auto;
  transition: var(--main-transition);
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.07rem;
        height: auto;
        filter: invert(75%);
      }
    }
  }
  & .comods-body {
    padding: 0 7% 3rem 7%;
    & .__title {
      margin: 5rem 0 2rem 0;
      font-size: 27px;
      font-weight: 700;
    }
    & .comods-item { 
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1.1rem 0;
      border-bottom: 1px solid rgb(222,222,222);
      & .__img {
        margin-right: 1rem;
        width: 1.8rem;
        height: auto;
      }
    }
  }
}/* ####### COMODIDADES ####### */





  /* ####### DISPONIBILIDADE ####### */




  /* ####### LOCAL ####### */
  & .local-box {
    & .__adress {
      padding: 0 7% .6rem 7%;
    }
    & .vue-map-container {
      width: 100%; 
      height: 250px;
    }
  }/* ####### LOCAL ####### */





  /* ####### AVALIAÇÕES ####### */
  & .avaliacoes-box {
    padding: 0 7%;
  }/* ####### AVALIAÇÕES ####### */


  /* ####### RESERVA ####### */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 3.8rem;
    width:  100%;
    background: white;
    padding: 0 7%;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    user-select: none;
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-valor {
        font-size: 17px;
        font-weight: 500;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 700;
        background: var(--colorAcomod);
        line-height: 2.6rem;
        color: white;
        height: 2.7rem;
        width:  50%;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */
}


/* TRANSITIONS */

.comods-animation-enter {
  transform: translateY(100%);
}
.comods-animation-leave-active {
  transform: translateY(100%);
}

@media (max-width: 1023px) {
  .reserva-desktop {
    display: none;
  }
}

@media (min-width: 1024px) {
  .acomods-id {
    margin-top: 4rem;

    /* ####### IMAGE BOX ####### */
    & .image-box {
      cursor: grab;
      overflow: hidden;
      & .swiper-container {
        position: relative;
        & .swiper-wrapper {
          display: inline-flex;
          overflow: hidden;
          & .slide {
            & .__img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
    & .image-box:active {
      cursor: grabbing;
    }/* ####### IMAGE BOX ####### */
    & .desktop-view {
      display: flex;
      margin: 1.7rem 8% 0 8%;
      & .reserva-desktop {
        flex-basis: 31%;
        border: 1px solid rgb(222,222,222);
        align-self: flex-start;
        & .reserva-desktop-form {
          padding: 1rem 1.4rem;
          & .valor-box {
            display: flex;
            align-items: flex-end;
            padding-bottom: 1.2rem;
            & .__valor {
              font-size: 34px;
              font-weight: 400;
              & .__valor-dia {
                font-size: 16px;
                font-weight: 400;
              }
            }
          }
          & .item-form {
            display: flex;
            flex-flow: column;
            margin-top: 1.2rem;
            & input {
              cursor: pointer;
              width: 100%;
              font-size: 16px;
              font-weight: 400;
              padding: .6rem;
              color: #8B8B8C;
              border: 1px solid rgb(222,222,222);
              outline: none;
              background: white;
            }
            & select {
              cursor: pointer;
              width: 100%;
              font-size: 16px;
              font-weight: 400;
              padding: 0 .6rem;
              height: 2.7rem;
              color: #8D8D8D;
              border: 1px solid rgb(222,222,222);
              outline: none;
              background: white;
              & option {
                background: white;
                color: #8D8D8D;
              }
            }
            & .reserva-input-date {
              height: 2.7rem;
              padding-left: .9rem;
              color: #8D8D8D;
              font-size: 16px;
              font-weight: 400;
            }
            & .reserva-close-date {
              width: .65rem;
              height: auto;
              position: absolute;
              right: 3%;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
          & .reserva-info {
            margin-top: .9rem;
            & .reserva-info_item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & h3 {
                font-size: 15px;
              }
            }
            & .reserva-info_item-total {
              display: flex;
              justify-content: space-between;
              border-top: 1px solid rgb(222,222,222);
              & h3 {
                font-size: 17px;
                font-weight: 500;
              }
            }
          }
          & .__reserva-desktop-btn {
            margin-top: 1.3rem;
            font-size: 18px;
            font-weight: 600;
            line-height: 3rem;
            background: var(--colorAcomod);
            color: white;
            height: 3.1rem;
            width: 100%;
            border-radius: 5px;
          }
          & .__reserva-desktop-btn-ask {
            font-size: 17px;
            font-weight: 600;
            background: transparent;
            color: #00D8C7;
            height: 2rem;
            width: 100%;
          }
          & .__info {
            margin: .6rem 0;
            text-align: center;
            font-size: 13px;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
      & .desktop-view-info {
        margin-right: 5%;
        flex-basis: 69%;
        /* ####### ANUNCIANTE BOX ####### */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
            color: #00BAAC;
            user-select: none;
          }
        }/* ####### ANUNCIANTE BOX ####### */


        /* ####### SOBRE BOX ####### */
        & .sobre-box {
          padding: 0;
        }/* ####### SOBRE BOX ####### */


        /* ####### CARACTERÍSTICAS BOX ####### */
        & .caracteristicas-box {
          padding: 0; 
          display: flex;
          justify-content: space-between;
          & .__item-caracteristica {
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-top: .8rem;
            & .__img-caracteristica {
              width: 2.2rem;
              height: auto;
              margin-bottom: .7rem;
            }
          }
        }/* ####### CARACTERÍSTICAS BOX ####### */


        /* ####### CAPACIDADE BOX ####### */
        & .capacidade-box {
          padding: 0;
        }/* ####### CAPACIDADE BOX ####### */


        /* ####### COMODIDADES ####### */
        & .comodidades-box {
          padding: 0;
          display: flex;
          height: 4rem;
          justify-content: space-between;
          & .__img-comodidade {
            width: 2.2rem;
            height: auto;
            margin: 0;
          }
        }
        & .comods-details {
          position: fixed;
          z-index: 9999;
          width:  100%;
          height: 100%;
          top: 0;
          background: white;
          overflow-y: auto;
          transition: var(--main-transition);
          & .back-bar {
            position: fixed;
            top: 0;
            left: 0;
            width:  100%;
            height: 3rem;
            background: white;
            & .back-box {
              display: inline-flex;
              align-items: center;
              height: 100%;
              padding: 0 7%;
              & .__back-btn {
                cursor: pointer;
                width: 1.07rem;
                height: auto;
                filter: invert(75%);
              }
            }
          }
          & .comods-body {
            padding: 0 7% 3rem 7%;
            & .__title {
              margin: 5rem 0 2rem 0;
              font-size: 27px;
              font-weight: 700;
            }
            & .comods-item { 
              display: flex;
              flex-flow: row;
              align-items: center;
              padding: 1.1rem 0;
              border-bottom: 1px solid rgb(222,222,222);
              & .__img {
                margin-right: 1rem;
                width: 1.8rem;
                height: auto;
              }
            }
          }
        }/* ####### COMODIDADES ####### */


        /* ####### LOCAL ####### */
        & .local-box {
          & .__adress {
            padding: 0 0 .6rem 0;
          }
          & .vue-map-container {
            height: 400px;
          }
        }/* ####### LOCAL ####### */


        /* ####### AVALIAÇÕES ####### */
        & .avaliacoes-box {
          padding: 0;
        }/* ####### AVALIAÇÕES ####### */
      }
    }
    
  

    /* ####### RESERVA ####### */
    & .reserva {
      display: none;
    }/* ####### RESERVA ####### */
  }
}

</style>
