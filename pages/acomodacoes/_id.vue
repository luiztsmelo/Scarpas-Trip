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
      <swiper :options="swiperOptions">
        
        <swiper-slide class="slide" v-for="image in acomod.images" :key="image.id">
          <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
        </swiper-slide>

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
        <h1 class="item-title">Sobre {{ tipoAcomodA }}</h1>

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
              {{ acomod.totalGaragem }} {{ acomod.totalGaragem == '1' ? 'vaga' : 'vagas' }} garagem
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
          :min-date="minDate"
          mode="single"
          :theme-styles="calendarDesktopStyle"
          :attributes="attributesCalendar">
        </v-calendar>
        <!-- ####### DISPONIBILIDADE ####### -->



        <!-- ####### LOCALIZAÇÃO ####### -->
        <h1 class="item-title">Local</h1>

        <div class="local-box">

          <h3 class="__adress">{{ acomod.address }}</h3>

          <gmap-map
          :center="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
          :zoom="15"
          :options="{styles: styles, draggable: $store.state.isMobile ? false : true, fullscreenControl: $store.state.isMobile ? false : true, zoomControl: $store.state.isMobile ? false : true, mapTypeControl:false, streetViewControl:false}"
          @click="fullscreenMobile">
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
            <h1 class="__valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__valor-noite"> por noite</span></h1>
          </div>

          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
            </select>
          </div>

          <div class="item-form">
            <v-date-picker
              ref="datePicker"
              mode="range"
              v-model="$store.state.reservaAcomod.periodoReserva"
              :pane-width="290"
              :min-date="minDate"
              :disabled-dates="$store.state.disabledDatesAcomod"
              :drag-attribute="attribute"
              :select-attribute="attribute"
              :disabled-attribute="disabledAttribute"
              :theme-styles="datePickerDesktopStyle"
              tint-color="#FFA04F"
              show-caps
              popover-visibility="focus">
              <div
                slot-scope="{ updateValue }">
                <div>
                  <input
                    type="text"
                    placeholder="Chegada  →  Partida"
                    :value="outputDatePicker"
                    @change="updateValue($event.target.value)"
                    class="reserva-input-date"
                  />
                  <img
                    src="../../assets/img/exit.svg"
                    v-if="$store.state.reservaAcomod.periodoReserva !== null"
                    class="reserva-close-date"
                    @click.stop="$store.state.reservaAcomod.periodoReserva = null"
                  >
                </div>
              </div>
            </v-date-picker>
          </div>

          <div class="reserva-info" v-if="$store.state.reservaAcomod.periodoReserva !== null">
            
            <div class="reserva-info_item" style="padding-bottom: .2rem">
              <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ $store.state.reservaAcomod.daySpan }} {{ $store.state.reservaAcomod.daySpan == 1 ? 'noite' : 'noites'}}</h3>
              <h3 id="valor">R$ {{ $store.state.reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item" style="padding-bottom: .2rem" v-if="acomod.limpezaFee !== 0">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de limpeza</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
              </div>
              <h3>R${{ acomod.limpezaFee.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item" style="padding-bottom: .4rem">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de serviço</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
              </div>
              <h3>R${{ $store.state.reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item-total" style="padding-top: .3rem">
              <h3>Total</h3>
              <h3>R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

          </div>

          <button class="__reserva-desktop-btn" type="button" @click="reservarDesktop">Reservar</button>

          <h4 class="__info">Você ainda não será cobrado.</h4>

          <button class="__reserva-desktop-btn-ask" type="button" @click="$store.state.user.email === null ? $modal.show('sign-in-modal') : $modal.show('ask-acomod-modal'), $store.state.clickedAskAcomod = true, $store.state.isSignIn = false">Falar com Anunciante</button>

        </form>
      </div>


    </div><!-- Desktop View -->


    <!-- ####### RESERVA MOBILE ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__reserva-valor-pessoa"> por noite</span></h3>
        <button class="__reserva-btn" @click="reservarMobile">Reservar</button>
      </div>
    </div>
    <reserva-mobile/><!-- ####### RESERVA MOBILE ####### -->

    
  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import ReservaMobile from '~/components/reserva-acomod/ReservaMobile'
import Proprietario from '~/components/Proprietario'
import supportsWebP from 'supports-webp'
import { mapstyle } from '@/mixins/mapstyle'
import { swiperOptions } from '@/mixins/swiper_id'
import { stylesCalendar } from '@/mixins/stylesCalendar'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { ReservaMobile, Proprietario },
  mixins: [ mapstyle, swiperOptions, stylesCalendar, tipoAcomod ],
  data () {
    return {
      showComods: false,
      attribute: {
        popover: {
          hideIndicator: true,
          visibility: 'none'
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
        { property: 'og:image', content: this.$store.state.acomod.images[0].HJ },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  middleware: 'acomodValidate',
  transition: 'id',
  async fetch ({ store, params }) {
    try {
      /* Pegar dados da acomod atual na Firestore */
      const acomod = await firebase.firestore().collection('acomods').doc(params.id).get()
      
      /* Pegar as reservas dessa acomod na Firestore para desabilitar as datas ocupadas no date picker */
      const reservas = await firebase.firestore().collection('reservasAcomods').where('acomodID', '==', params.id).where('isRunning', '==', true).get()

      store.commit('m_loader', false)

      store.commit('m_disabledDatesAcomod', reservas.docs.map(acomod => acomod.data().periodoReserva))
      
      return store.commit('m_acomod', acomod.data())

    } catch (err) {
      store.commit('m_loader', false)
      console.log(err)
    }
  },
  methods: {
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    },
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
    fullscreenMobile () {
      if (this.$store.state.isMobile === true) {
        this.$store.commit('m_acomodMap', this.acomod)
        /* Enter fullscreen */
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {
             document.documentElement.requestFullScreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        }
      }
    },
    reservarDesktop () {
      firebase.firestore().collection('acomods').doc(this.$route.params.id).collection('visits').doc(this.$store.state.visitID).update({ 
        clickedReservaBtn: true
      })

      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        this.$nextTick(() => this.$refs.datePicker.$el.focus())
      } else {
        if (this.$store.state.user.email === null) {
          this.$store.state.isSignIn = false
          this.$store.state.clickedReservaAcomod = true
          this.$modal.show('sign-in-modal')
        } else {
          this.$store.state.creditCard.cardHolderName = this.$store.state.user.fullName
          this.$store.state.reservaAcomod.guestName = this.$store.state.user.fullName
          this.$store.commit('m_isReservar', true)
          this.$router.push('/acomodacoes/reservar')
          this.$store.commit('m_showNavbar', false)
        }
      }
    },
    reservarMobile () {
      this.$store.dispatch('a_generateRandomHashs')
      this.$store.commit('m_showReservaAcomod', true)
      window.location.hash = this.$store.state.randomHashs[1]
    },
    limpezaFeeDialog () {
      this.$store.commit('show_alert', {
        type: 'info',
        title: 'Taxa de Limpeza',
        message: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodD}.`,
        persist: true
      })
    },
    serviceFeeDialog () {
      this.$store.commit('show_alert', {
        type: 'info',
        title: 'Taxa de Serviço',
        message: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        persist: true
      })
    },
    backBtn () {
      window.history.back(1)
    },
    closeComods () {
      this.showComods = false
      window.history.back(1)
    },
    hashProprietario () {
      window.location.hash = "contato"
    },
    hashComods () {
      window.location.hash = "comodidades"
    },
    hashShare () {
      window.location.hash = "compartilhar"
    }
  },
  async mounted () {
    loaded.then(() =>  this.$store.state.googleMapsInitialized = true )
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    periodoReserva () {return this.$store.state.reservaAcomod.periodoReserva },
    attributesCalendar () {
      return [
        {
          key: 'minDate',
          contentStyle: {
            opacity: 0.2,
            textDecoration: 'line-through'
          },
          dates: {
            start: null,
            end: dayjs(new Date()).add(1, 'day')
          }
        },
        {
          key: 'disabledDatesAcomod',
          contentStyle: {
            opacity: 0.2,
            textDecoration: 'line-through'
          },
          dates: this.$store.state.disabledDatesAcomod
        }
      ]
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    outputDatePicker () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        const start = new Date(this.$store.state.reservaAcomod.periodoReserva.start)
        const end = this.$store.state.reservaAcomod.periodoReserva.end
        return dayjs(start).format('ddd, DD MMM') + '  →  ' + dayjs(end).format('ddd, DD MMM')
      }
    },
    minDate () {
      return dayjs(new Date()).add(2, 'day').toDate()
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(42, 42)
    },
    acomod () {
      return this.$store.state.acomod
    },
    showShare () {
      return this.$store.state.showShare
    },
    hash () {
      return this.$route.hash
    }
  },
  watch: {
    periodoReserva (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== null) {
        const checkIn = dayjs(new Date(this.$store.state.reservaAcomod.periodoReserva.start))
        const checkOut = dayjs(new Date(this.$store.state.reservaAcomod.periodoReserva.end))

        const daySpan = checkOut.diff(checkIn, 'day')
        this.$store.state.reservaAcomod.noites = daySpan

        const valorNoitesTotal = Math.round(this.acomod.valorNoite * daySpan)
        this.$store.commit('m_valorNoitesTotal', valorNoitesTotal)

        const serviceFeeTotal = Math.round(valorNoitesTotal * this.$store.state.serviceFeeAcomod)
        this.$store.commit('m_serviceFeeTotal', serviceFeeTotal)

        const valorReservaTotal = valorNoitesTotal + this.acomod.limpezaFee + serviceFeeTotal
        this.$store.commit('m_valorReservaTotal', valorReservaTotal)
      }
    },
    hash (value) {
      value === '' ? this.showComods = false : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''

      if (vm.$store.state.isMobile) {
        vm.$store.commit('m_showNavbar', false)
        vm.$store.commit('m_showFoobar', false)
      } else {
        vm.$store.commit('m_showNavbar', true)
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
      color: var(--colorAcomod);/* #00BAAC */
      font-weight: 500;
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
    height: 4.6rem;
    width: 100%;
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
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .__reserva-valor-pessoa {
        font-size: 14px;
        font-weight: 400;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 700;
        background: var(--colorAcomod);
        color: white;
        height: 3.1rem;
        width: 10rem;
        border-radius: 5px;
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
    margin-top: var(--navbarHeightDesktop);

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
              & .__valor-noite {
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
              padding: .75rem .6rem;
              border: 1px solid rgb(222,222,222);
              outline: none;
              background: white;
              transition: .15s border ease;
            }
            & input:hover {
              border: 1px solid rgb(72,72,72) !important;
            }
            & select {
              cursor: pointer;
              width: 100%;
              padding: .75rem .6rem;
              border: 1px solid rgb(222,222,222);
              outline: none;
              background: white;
              transition: .15s border ease;
              & option {
                background: white;
              }
            }
            & select:hover {
              border: 1px solid rgb(72,72,72) !important;
            }
            & .reserva-input-date {
              padding-left: .9rem;
            }
            & .reserva-close-date {
              width: .7rem;
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
            font-size: 17px;
            font-weight: 700;
            background: var(--colorAcomod);
            color: white;
            height: 3.1rem;
            width: 100%;
            border-radius: 5px;
          }
          & .__reserva-desktop-btn-ask {
            font-size: 16px;
            font-weight: 600;
            background: transparent;
            color: var(--colorAcomod);
            height: 2.1rem;
            width: 100%;
          }
          & .__info {
            margin: .5rem 0 .8rem;
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
