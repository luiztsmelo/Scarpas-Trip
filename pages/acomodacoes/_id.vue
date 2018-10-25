<template>
  <div class="acomods-id">


    <v-dialog style="z-index:10000"/>


    <host/>



    <!-- ______________________________ TOPBAR ______________________________ -->
    <div class="topbar" v-scroll="scrollTopbarBg">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back-w.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar">
        </div>
        
      </div>
    </div><!-- ______________________________ TOPBAR ______________________________ -->
    



    
    <!-- ______________________________ IMAGE ______________________________ -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOptions">
        
        <swiper-slide class="slide" v-for="image in acomod.images" :key="image.id">
          <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
        </swiper-slide>

      </swiper>
    </div> 
    <!-- ______________________________ IMAGE ______________________________ -->





    <div class="desktop-view"><!-- Desktop View -->



      

      <div class="desktop-view-info"><!-- Desktop View Info -->




        <!-- ______________________________ RATING ______________________________ -->
        <div class="rating-box">

          <h3 class="__tipo" style="color: #FFA04F">{{ acomod.tipoAcomod }}</h3>

          <div class="rating">
            <star-rating
              :rating="4.7"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="12"
              :padding="3">
            </star-rating>
            <p class="rating-number">4,7</p>
          </div>

        </div><!-- ______________________________ RATING ______________________________ -->
        




        <h1 class="id-title">{{ acomod.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box">
          <img class="__anunciante-img" :src="host.photoURL" @click="$store.commit('m_showHost', true), hashHost()">
          <div class="box-flex-column">
            <h3 style="user-select:none">Hospedado por</h3>
            <p class="__anunciante-name" @click="$store.commit('m_showHost', true), hashHost()">{{ host.fullName }}</p>
          </div>
        </div><!-- ______________________________ ANUNCIANTE ______________________________ -->


        



        <!-- ______________________________ INFO ______________________________ -->
        <div class="info-box">
          
          <div class="item">
            <img class="__img" src="../../assets/img/guests.svg">
            <h3>{{ acomod.totalHospedes }} {{ acomod.totalHospedes == '1' ? 'hóspede' : 'hóspedes' }}</h3>
          </div>

          <div class="item">
            <img class="__img" src="../../assets/img/quarto.svg">
            <h3>{{ acomod.totalQuartos }} {{ acomod.totalQuartos == '1' ? 'quarto' : 'quartos' }} ({{ acomod.totalSuites }} {{ acomod.totalSuites == '1' ? 'suíte' : 'suítes' }})</h3>
          </div>

          <div class="item">
            <img class="__img" src="../../assets/img/banheiro.svg" style="transform: scale(1.06)">
            <h3>{{ acomod.totalBanheiros }} {{ acomod.totalBanheiros == '1' ? 'banheiro' : 'banheiros' }}</h3>
          </div>

          <div class="item">
            <img class="__img" src="../../assets/img/garagem.svg" style="transform: scale(1.01)">
            <h3>{{ acomod.totalGaragem }} {{ acomod.totalGaragem == '1' ? 'vaga' : 'vagas' }} garagem</h3>
          </div>

        </div><!-- ______________________________ INFO ______________________________ -->






        <!-- ______________________________ SOBRE ______________________________ -->
        <h1 class="item-title">Sobre {{ tipoAcomodA }}</h1>

        <div class="sobre-box">
          <h3>{{ acomod.subtitle }}</h3>
        </div><!-- ______________________________ SOBRE ______________________________ -->






        <!-- ______________________________ COMODIDADES ______________________________ -->
        <h1 class="item-title">Comodidades</h1>


        <div class="comodidades-box-mobile" @click="showComods = true, hashComods()">
          <img class="__img" v-if="acomod.hasRoupasCama" src="../../assets/img/hasRoupasCama.svg" style="transform: scale(1.01)">
          <img class="__img" v-if="acomod.hasPiscina" src="../../assets/img/hasPiscina.svg">
          <img class="__img" v-if="acomod.hasChurrasqueira" src="../../assets/img/hasChurrasqueira.svg">
          <img class="__img" v-if="acomod.hasCozinha" src="../../assets/img/hasCozinha.svg" style="transform: scale(1.07)">
          <img class="__img" v-if="acomod.hasWifi" src="../../assets/img/hasWifi.svg" style="transform: scale(.98)">
          <img class="__img" v-if="acomod.hasArCond" src="../../assets/img/hasArCond.svg">
          <img class="__img" v-if="acomod.hasCaixaSom" src="../../assets/img/hasCaixaSom.svg" style="transform: scale(.92)">
          <img class="__img" v-if="acomod.hasBarracas" src="../../assets/img/hasBarracas.svg" style="transform: scale(1.1)">
          <img class="__img" v-if="acomod.hasPier" src="../../assets/img/hasPier.svg">
        </div>


        <div class="comodidades-box-desktop">
          <div class="item" v-if="acomod.hasRoupasCama">
            <img class="__img" src="../../assets/img/hasRoupasCama.svg" style="transform: scale(1.01)">
            <h3>Roupas de Cama</h3>
          </div>
          <div class="item" v-if="acomod.hasPiscina">
            <img class="__img" src="../../assets/img/hasPiscina.svg">
            <h3>Piscina</h3>
          </div>
          <div class="item" v-if="acomod.hasChurrasqueira">
            <img class="__img" src="../../assets/img/hasChurrasqueira.svg">
            <h3>Churrasqueira</h3>
          </div>
          <div class="item" v-if="acomod.hasCozinha">
            <img class="__img" src="../../assets/img/hasCozinha.svg" style="transform: scale(1.07)">
            <h3>Cozinha preparada</h3>
          </div>
          <div class="item" v-if="acomod.hasWifi">
            <img class="__img" src="../../assets/img/hasWifi.svg" style="transform: scale(.98)">
            <h3>Wi-Fi</h3>
          </div>
          <div class="item" v-if="acomod.hasArCond">
            <img class="__img" src="../../assets/img/hasArCond.svg">
            <h3>Ar condicionado</h3>
          </div>
          <div class="item" v-if="acomod.hasCaixaSom">
            <img class="__img" src="../../assets/img/hasCaixaSom.svg" style="transform: scale(.92)">
            <h3>Caixa de Som</h3>
          </div>
          <div class="item" v-if="acomod.hasBarracas">
            <img class="__img" src="../../assets/img/hasBarracas.svg" style="transform: scale(1.1)">
            <h3>Barracas</h3>
          </div>
          <div class="item" v-if="acomod.hasPier">
            <img class="__img" src="../../assets/img/hasPier.svg">
            <h3>Pier</h3>
          </div>
        </div>


        <transition name="comods-animation">
          <div class="comods-details" v-if="showComods">

            <div class="back-bar">
              <div class="back-box" @click="backBtn">
                <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
              </div>
            </div>

            <div class="comods-body">
      
              <h1 class="__title">Comodidades</h1>

              <div class="comods-item" v-if="acomod.hasRoupasCama">
                <img src="../../assets/img/hasRoupasCama.svg" class="__img" style="transform: scale(1.01)">
                <h3>Roupas de Cama</h3>
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
        </transition><!-- ______________________________ COMODIDADES ______________________________ -->






        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->
        <h1 class="item-title">Disponibilidade</h1>

        <div class="disponibilidade-box">

          <div class="datepicker-trigger">
            <button
              type="button"
              id="datepicker-trigger"
              style="display: none">
            </button>

            <AirbnbStyleDatepicker
              style="border:none"
              :trigger-element-id="'datepicker-trigger'"
              :inline="true"
              :showShortcutsMenuTrigger="false"
              :showActionButtons="false"
              :disabledDates="disabledDates"
              :min-date="minDate"
              :date-one="$store.state.reservaAcomod.startDate"
              :date-two="$store.state.reservaAcomod.endDate"
              @date-one-selected="val => { $store.state.reservaAcomod.startDate = val }"
              @date-two-selected="val => { $store.state.reservaAcomod.endDate = val, calcValoresReserva() }"
              @closed="closedDatepicker"
            />
          </div>

        </div>
        
        
        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->






        <!-- ______________________________ LOCAL ______________________________ -->
        <h1 class="item-title">Local</h1>

        <div class="local-box">

          <h3 class="__adress">{{ acomod.address }}</h3>

          <gmap-map
            :center="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
            :zoom="14"
            :options="{ styles: styles, draggable: $store.state.isMobile ? false : true, fullscreenControl: $store.state.isMobile ? false : true, zoomControl: $store.state.isMobile ? false : true, mapTypeControl: false, streetViewControl: false }"
            @click="fullscreenMobile">
              <Gmap-Marker
                :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
                :icon="{url: $store.state.markerUrl, scaledSize: $store.state.markerSize}">
              </Gmap-Marker>
          </gmap-map>

        </div><!-- ______________________________ LOCAL ______________________________ -->





      
        <!-- ______________________________ AVALIAÇÕES ______________________________ -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ______________________________ AVALIAÇÕES ______________________________ -->






      </div><!-- Desktop View Info -->





      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">


          <h1 class="__valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__valor-noite"> por noite</span></h1>


          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
            </select>
          </div>


          <div class="item-form">

            <div class="datepicker-trigger">
              <button
                type="button"
                id="datepicker-trigger">
                {{ formattedDates() }}
              </button>

              <AirbnbStyleDatepicker
                :trigger="showDatepicker"
                :trigger-element-id="'datepicker-trigger'"
                :fullscreen-mobile="true"
                :showShortcutsMenuTrigger="false"
                :monthsToShow="1"
                :disabledDates="disabledDates"
                :offsetX="102"
                :offsetY="52"
                :min-date="minDate"
                :date-one="$store.state.reservaAcomod.startDate"
                :date-two="$store.state.reservaAcomod.endDate"
                @date-one-selected="val => { $store.state.reservaAcomod.startDate = val }"
                @date-two-selected="val => { $store.state.reservaAcomod.endDate = val, calcValoresReserva() }"
                @closed="closedDatepicker"
              />
            </div>

          </div>


          <div class="reserva-info" v-if="reservaAcomod.startDate !== '' && reservaAcomod.endDate !== ''">
            
            <div class="reserva-info_item" style="padding-bottom: .2rem">
              <h3>{{ `R$${acomod.valorNoite.toLocaleString()} x ${$store.state.reservaAcomod.noites} ${$store.state.reservaAcomod.noites == 1 ? 'noite' : 'noites'}` }}</h3>
              <h3 id="valor">R${{ $store.state.reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item" style="padding-bottom: .2rem" v-if="acomod.limpezaFee !== 0">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de limpeza</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
              </div>
              <h3>R${{ acomod.limpezaFee.toLocaleString() }}</h3>
            </div>

            <div class="reserva-info_item-total" style="padding-top: .4rem; margin-top: .4rem">
              <h3>Total</h3>
              <h3>R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

          </div>



          <button class="__reserva-desktop-btn" type="button" @click="reservarDesktop">Reservar</button>

          <h4 class="__info">A reserva é gratuita!</h4>


          <button class="__reserva-desktop-ask-btn" type="button">Falar com {{ host.firstName }}</button>


          <div class="highlight" v-if="$store.state.visitsLastMonth >= 0">
            <h3 class="__text">{{ tipoAcomodE }} recebeu {{ $store.state.visitsLastMonth }} visualizações no último mês.</h3>
            <img class="__img" src="../../assets/img/visits-acomod.svg">
          </div>


        </form>

      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->





    </div><!-- Desktop View -->






    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva-mobile">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__reserva-valor-pessoa"> por noite</span></h3>
        <button class="__reserva-btn" @click="reservarMobile">Reservar</button>
      </div>
    </div>

    <reserva-mobile/>
    <!-- ______________________________ RESERVA MOBILE ______________________________ -->

    



  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import MiniLoader from '@/components/MiniLoader.vue'
import ReservaMobile from '@/components/reserva-acomod/ReservaMobile'
import Host from '@/components/Host'
import supportsWebP from 'supports-webp'
import { mapstyle } from '@/mixins/mapstyle'
import { swiperOptions } from '@/mixins/swiper_id'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import subDays from 'date-fns/sub_days'
import differenceInDays from 'date-fns/difference_in_days'

export default {
  components: { MiniLoader, ReservaMobile, Host },
  mixins: [ mapstyle, swiperOptions, tipoAcomod ],
  data () {
    return {
      showComods: false,
      showDatepicker: false
    }
  },
  head () {
    return {
      title: `${this.$store.state.acomod.title} ‒ Escarpas Trip`,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.acomod.subtitle },
        { property: 'og:url', content: `https://escarpastrip.com/acomods/${this.$route.params.id}` },
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
      /* Get acomod */
      const acomod = await firebase.firestore().doc(`acomods/${params.id}`).get()

      /* Get host */
      const host = await firebase.firestore().doc(`users/${acomod.data().hostID}`).get()
      
      store.commit('m_acomod', acomod.data())
      store.commit('m_host', host.data())
      store.commit('m_loader', false)

    } catch (err) {
      store.commit('m_loader', false)
      console.log(err)
    }
  },
  methods: {
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    },
    formattedDates () {
      const startDate = this.reservaAcomod.startDate
      const endDate = this.reservaAcomod.endDate
      let formattedDates = ''
      if (this.reservaAcomod.startDate === '') {
        return 'Chegada / Partida'
      } else {
        const startDay = format(startDate, 'D', { locale: pt })
        const startMonth = format(startDate, 'MMM', { locale: pt })
        const startMonthCapitalized = startMonth.charAt(0).toUpperCase() + startMonth.slice(1)
        const endDay = format(endDate, 'D', { locale: pt })
        const endMonth = format(endDate, 'MMM', { locale: pt })
        const endMonthCapitalized = endMonth.charAt(0).toUpperCase() + endMonth.slice(1)
        startDate ? formattedDates = `${startDay} de ${startMonthCapitalized}` : ''
        endDate ? formattedDates += ' - ' + `${endDay} de ${endMonthCapitalized}` : ''
        return formattedDates
      }
    },
    calcValoresReserva () { /* Em caso de alterações, lembrar também de alterar DatePicker.vue */
      const startDate = this.reservaAcomod.startDate
      const endDate = this.reservaAcomod.endDate

      const noites = differenceInDays(endDate, startDate)
      this.$store.commit('m_noites', noites)

      const valorNoitesTotal = Math.round(this.acomod.valorNoite * noites)
      this.$store.commit('m_valorNoitesTotal', valorNoitesTotal)

      const valorReservaTotal = valorNoitesTotal + this.acomod.limpezaFee
      this.$store.commit('m_valorReservaTotal', valorReservaTotal)

      this.$store.state.reservaAcomod.limpezaFee = this.acomod.limpezaFee
    },
    closedDatepicker () {
      this.showDatepicker = false
      this.reservaAcomod.endDate === '' ? this.reservaAcomod.startDate = '' : ''
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
      firebase.firestore().doc(`acomods/${this.$route.params.id}/visits/${this.$store.state.visitID}`).update({ 
        clickedReservaBtn: true
      })
      if (this.reservaAcomod.startDate === '' && this.reservaAcomod.endDate === '') {
        this.showDatepicker = true
      } else {
        this.$store.commit('m_isReservar', true)
        this.$router.push('/acomodacoes/reservar')
        this.$store.commit('m_showNavbar', false)
      }
    },
    reservarMobile () {
      firebase.firestore().doc(`acomods/${this.$route.params.id}/visits/${this.$store.state.visitID}`).update({ 
        clickedReservaBtn: true
      })
      document.body.setAttribute('style', 'overflow: hidden')
      this.$store.dispatch('a_generateRandomHashs')
      this.$store.commit('m_showReservaAcomod', true)
      window.location.hash = this.$store.state.randomHashs[1]
    },
    limpezaFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Limpeza',
        text: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodD}.`,
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
    hashHost () {
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
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    showShare () { return this.$store.state.showShare },
    hash () { return this.$route.hash },
    host () { return this.$store.state.host },
    reservaAcomod () { return this.$store.state.reservaAcomod },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    minDate () {
      return subDays(Date(), 1)
    },
    disabledDates () {
      const mergedDisabledDates = [...new Set([
        ...this.acomod.disabledDates.airbnb,
        ...this.acomod.disabledDates.booking,
        ...this.acomod.disabledDates.escarpasTrip
      ])]
      return mergedDisabledDates
    }
  },
  watch: {
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
@import url('~/assets/css/_id.css');

.acomods-id {
  background-color: white;
  margin-bottom: 5.3rem;
  transition: all .35s cubic-bezier(.15,.97,.43,.93);
  


  /* __________ IMAGE BOX __________ */
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
  }/* __________ IMAGE BOX __________ */



  /* __________ RATING BOX __________ */
  & .rating-box {
    padding: 0 7%;
    margin-top: .5rem;
    display: flex;
    align-items: center;
    & .__tipo {
      padding-right: 1rem;
      font-size: 15px;
      font-weight: 600;
    }
    & .rating {
      display: flex;
      align-items: center;
      & .rating-number {
        font-size: 14px;
        font-weight: 600;
        padding-left: 3px;
      }
    }
  }/* __________ RATING BOX __________ */
  


  /* __________ ANUNCIANTE BOX __________ */
  & .anunciante-box {
    display: flex;
    padding: 2rem 7%;
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
      color: var(--colorAcomod);
      font-weight: 500;
      user-select: none;
    }
    & .__anunciante-name:hover {
      text-decoration: underline;
    }
  }/* __________ ANUNCIANTE BOX __________ */




  /* __________ INFO BOX __________ */
  & .info-box {
    padding: 0 7%;
    & .item {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-top: 1.2rem;
      & .__img {
        width: 1.6rem;
        height: auto;
        margin: 0 .7rem 0 0;
      }
    }
  }/* __________ INFO BOX __________ */




  /* __________ SOBRE BOX __________ */
  & .sobre-box {
    padding: 0 7%;
  }/* __________ SOBRE BOX __________ */






  /* __________ COMODIDADES __________ */
  & .comodidades-box-desktop {
    display: none;
  }
  & .comodidades-box-mobile {
    padding: 0 4.5%;
    transform: translateY(-.2rem);
    & .__img {
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
        width: 1.27rem;
        height: auto;
      }
    }
  }
  & .comods-body {
    padding: 0 7% 3rem 7%;
    & .__title {
      margin: 5rem 0 1.5rem 0;
      font-size: 29px;
      font-weight: 700;
    }
    & .comods-item { 
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1.6rem 0;
      border-bottom: 1px solid #dedede;
      & .__img {
        margin-right: 1rem;
        width: 1.9rem;
        height: auto;
      }
    }
  }
}/* __________ COMODIDADES __________ */





  /* __________ DISPONIBILIDADE __________ */
  & .disponibilidade-box {
    padding: 0 3.5%;
  }  /* __________ DISPONIBILIDADE __________ */





  /* __________ LOCAL __________ */
  & .local-box {
    & .__adress {
      padding: 0 7% .6rem 7%;
    }
    & .vue-map-container {
      width: 100%; 
      height: 250px;
    }
  }/* __________ LOCAL __________ */





  /* __________ AVALIAÇÕES __________ */
  & .avaliacoes-box {
    padding: 0 7%;
  }/* __________ AVALIAÇÕES __________ */




  /* __________ RESERVA __________ */
  & .reserva-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 4.7rem;
    width: 100%;
    background: white;
    overflow: hidden;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    user-select: none;
    & .reserva-body {
      padding: 0 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      & .__reserva-valor {
        padding-right: 15px;
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
        width: 10rem;
        height: 3.2rem;
        background:var(--colorAcomod);
        border-radius: 200px;
        font-size: 16px;
        font-weight: 700;
        color: white;
        transition: var(--main-transition);
      }
    }
  }/* __________ RESERVA __________ */
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

    /* __________ IMAGE BOX __________ */
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
              border-radius: 6px;
            }
          }
        }
      }
    }
    & .image-box:active {
      cursor: grabbing;
    }/* __________ IMAGE BOX __________ */


    & .desktop-view {
      display: flex;
      margin: 1.7rem 8% 0;
      & .reserva-desktop {
        flex-basis: 31%;
        border: 1px solid #dedede;
        border-radius: 6px;
        align-self: flex-start;
        & .reserva-desktop-form {
          display: flex;
          flex-flow: column;
          padding: 1.4rem;
          & .__valor {
            font-size: 34px;
            font-weight: 400;
            padding-bottom: 1.2rem;
            & .__valor-noite {
              font-size: 16px;
              font-weight: 400;
            }
          }
          & .item-form {
            display: flex;
            flex-flow: column;
            margin-top: 1.2rem;
            & select {
              cursor: pointer;
              width: 100%;
              padding: .8rem .65rem;
              border: 1px solid #dedede;
              outline: none;
              background: white;
              border-radius: 5px;
              transition: .15s border ease;
              & option {
                background: white;
              }
            }
            & select:hover {
              border: 1px solid var(--color01) !important;
            }
            & .datepicker-trigger {
              height: 100%;
              background: white;
              & #datepicker-trigger {
                padding: .8rem;
                height: 100%;
                width: 100%;
                background: white;
                border: 1px solid #dedede;
                outline: none;
                text-align: left;
                border-radius: 5px;
              }
              & #datepicker-trigger:hover {
                border: 1px solid var(--color01);
              }
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
              border-top: 1px solid #dedede;
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
            height: 3.2rem;
            border-radius: 200px;
          }
          & .__info {
            margin: .5rem 0 .8rem;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
          }
          & .__reserva-desktop-ask-btn {
            font-size: 16px;
            font-weight: 600;
            background: white;
            color: var(--colorAcomod);
            height: 2rem;
          }
          & .__reserva-desktop-ask-btn:hover {
            text-decoration: underline;
          }
          & .highlight {
            display: flex;
            align-items: center;
            border-top: 1px solid #dedede;
            padding-top: 1rem;
            margin-top: 1rem;
            & .__text {
              font-size: 13px;
              font-weight: 500;
              line-height: 1.35;
            }
            & .__img {
              margin-left: .6rem;
              width: 2.4rem;
              height: auto;
            }
          }
        }
      }


      & .desktop-view-info {
        margin-right: 5%;
        flex-basis: 69%;




        /* __________ RATING __________ */
        & .rating-box {
          padding: 0;
          margin-top: 0;
          & .__tipo {
            padding-right: 1rem;
            font-size: 16px;
            font-weight: 600;
          }
          & .rating {
            display: flex;
            align-items: center;
            & .rating-number {
              font-size: 16px;
              font-weight: 600;
              padding-left: 3px;
            }
          }
        }/* __________ RATING __________ */




        /* __________ ANUNCIANTE __________ */
        & .anunciante-box {
          padding: 1.5rem 0 2.5rem;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
          }
        }/* __________ ANUNCIANTE __________ */




        /* __________ INFO __________ */
        & .info-box {
          padding: 0; 
          display: flex;
          justify-content: space-between;
          & .item {
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-top: .8rem;
            & .__img {
              width: 2.1rem;
              height: auto;
              margin: 0 0 .7rem 0;
            }
          }
        }/* __________ INFO __________ */




        /* __________ SOBRE __________ */
        & .sobre-box {
          padding: 0;
        }/* __________ SOBRE __________ */


      


        /* __________ COMODIDADES __________ */
        & .comodidades-box-mobile {
          display: none;
        }
        & .comodidades-box-desktop {
          display: flex;
          flex-flow: row wrap;
          & .item {
            display: flex;
            align-items: center;
            width: calc(100%/3);
            margin-bottom: 1.4rem;
            & .__img {
              width: 1.6rem;
              height: auto;
              margin-right: .8rem;
            }
          }
        }/* __________ COMODIDADES __________ */




        /* __________ DISPONIBILIDADE __________ */
        & .disponibilidade-box {
          padding: 0;
        }  /* __________ DISPONIBILIDADE __________ */




        /* __________ LOCAL __________ */
        & .local-box {
          & .__adress {
            padding: 0 0 1rem 0;
          }
          & .vue-map-container {
            height: 400px;
          }
        }/* __________ LOCAL __________ */




        /* __________ AVALIAÇÕES __________ */
        & .avaliacoes-box {
          padding: 0;
        }/* __________ AVALIAÇÕES __________ */


      }
    }
    
  

    /* __________ RESERVA __________ */
    & .reserva-mobile {
      display: none;
    }/* __________ RESERVA __________ */
  }
}

</style>
