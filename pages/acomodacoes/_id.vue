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

          <star-rating
            v-if="acomod.avaliacoes.length > 0"
            class="rating"
            :rating="acomod.averageRating"
            :increment="0.5"
            :read-only="true"
            :show-rating="false"
            active-color="#161616"
            inactive-color="#dedede"
            :star-size="13"
            :padding="4">
          </star-rating>

          <div class="new" v-else><p>NOVA</p></div>

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







        <!-- ______________________________ SOBRE ______________________________ -->
        <h1 class="item-title">Sobre {{ tipoAcomodA }}</h1>

        <div class="sobre-box">
          <h3>{{ acomod.subtitle }}</h3>
        </div><!-- ______________________________ SOBRE ______________________________ -->






        <!-- ______________________________ QUARTOS ______________________________ -->
        <div class="quartos-box">

          <div class="quarto" v-for="(quarto, index) in acomod.quartos" :key="index">

              <h1 class="__name">{{ quarto.name }}</h1>


              <p class="info">Acomoda até: <span style="font-weight: 500">{{ quarto.acomoda }} {{ quarto.acomoda > 1 ? 'hóspedes' : 'hóspede' }}</span></p>

              <p class="info" v-if="acomod.tipoAcomod !== 'Casa'">Valor da diária: <span style="font-weight: 500">R$ {{ quarto.valor }}</span></p>
    
              
              <div class="mobilias">
                <div class="mobilia" v-for="(mobilia, index) in quarto.mobilias" :key="index">
                  <img :src="mobiliaImage(mobilia)" style="width: 1.6rem; height: auto">
                  <p style="user-select: none">{{ mobiliaText(mobilia) }}</p>
                </div>
              </div>
              
          </div>

        </div><!-- ______________________________ QUARTOS ______________________________ -->







        <!-- ______________________________ COMODIDADES ______________________________ -->
        <h1 class="item-title">Comodidades</h1>


        <div class="comodidades-box-mobile" @click="showComods = true, hashComods()">
          <img class="__img" v-for="(comodidade, index) in acomod.comodidades" :key="comodidade.name" :src="comodidadeImgSrc(comodidade)">
        </div>


        <div class="comodidades-box-desktop">
          <div class="item" v-for="(comodidade, index) in acomod.comodidades" :key="comodidade.name">
            <img class="__img" :class="[ comodidade.condition === false ? 'comodidade-img-disabled' : '' ]" :src="comodidadeImgSrc(comodidade)">
            <h3 :class="[ comodidade.condition === false ? 'comodidade-text-disabled' : '' ]">{{ comodidade.name }}</h3>
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

              <div class="comods-item" v-for="(comodidade, index) in acomod.comodidades" :key="comodidade.name">
                <img class="__img" :class="[ comodidade.condition === false ? 'comodidade-img-disabled' : '' ]" :src="comodidadeImgSrc(comodidade)">
                <h3 :class="[ comodidade.condition === false ? 'comodidade-text-disabled' : '' ]">{{ comodidade.name }}</h3>
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
            :zoom="15"
            :options="{ styles: styles, draggable: $store.state.isMobile ? false : true, fullscreenControl: $store.state.isMobile ? false : true, zoomControl: $store.state.isMobile ? false : true, mapTypeControl: false, streetViewControl: false }"
            @click="fullscreenMobile">
              <Gmap-Marker
                :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
                :icon="{url: $store.state.markerUrl, scaledSize: $store.state.markerSize}">
              </Gmap-Marker>
          </gmap-map>

        </div><!-- ______________________________ LOCAL ______________________________ -->





      
        <!-- ______________________________ AVALIAÇÕES ______________________________ -->
        <div class="avaliacoes-title">

          <h1 class="__title">
            {{ acomod.avaliacoes.length > 0 ? acomod.avaliacoes.length : '' }} {{ acomod.avaliacoes.length === 0 ? 'Seja o primeiro a avaliar!' : acomod.avaliacoes.length === 1 ? 'Avaliação': 'Avaliações' }}
          </h1>

          <star-rating
            v-if="acomod.avaliacoes.length > 0"
            class="rating"
            :rating="acomod.averageRating"
            :increment="0.5"
            :read-only="true"
            :show-rating="false"
            active-color="#161616"
            inactive-color="#dedede"
            :star-size="$store.state.isMobile ? 16 : 19"
            :padding="$store.state.isMobile ? 4 : 5">
          </star-rating>

        </div>
        

        <div class="avaliacoes-box">


          <div class="avaliacoes-by-categories" v-if="acomod.avaliacoes.length > 0">
            <div class="category">
              <p class="__name">Recepção</p>
              <star-rating class="__rating" :rating="acomod.averageRating_recepcao" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
            </div>
            <div class="category">
              <p class="__name">Limpeza</p>
              <star-rating class="__rating" :rating="acomod.averageRating_limpeza" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
            </div>
            <div class="category">
              <p class="__name">Precisão do anúncio</p>
              <star-rating class="__rating" :rating="acomod.averageRating_precisao" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
            </div>
            <div class="category">
              <p class="__name">Valor</p>
              <star-rating class="__rating" :rating="acomod.averageRating_valor" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
            </div>
          </div>


          <div class="avaliacao" v-for="(avaliacao, index) in acomod.avaliacoes" :v-key="index">
            <h2 class="__guest-name">{{ avaliacao.fullName }}</h2>
            <p class="__date">{{ formatAvaliacaoDate(avaliacao) }}</p>
            <h3 class="__message">{{ avaliacao.comment }}</h3>
          </div>


          <button class="add-avaliacao-btn" type="button" @click="$modal.show('add-avaliacao-desktop')">Deixar uma avaliação</button>

          <add-avaliacao-desktop></add-avaliacao-desktop>

        </div><!-- ______________________________ AVALIAÇÕES ______________________________ -->






      </div><!-- Desktop View Info -->





      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">


          <h1 class="__valor">R${{ acomod.valorNoite.toLocaleString() }}<span class="__valor-noite"> por noite</span></h1>


          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.quarto">
              <option :value="quarto" v-for="quarto in quartosOptions">{{ quarto }}</option>
            </select>
          </div>


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


          <div class="valor-reserva-total" v-if="reservaAcomod.startDate !== '' && reservaAcomod.endDate !== ''">
            <h3>{{ `R$${acomod.valorNoite.toLocaleString()} x ${$store.state.reservaAcomod.noites} ${$store.state.reservaAcomod.noites == 1 ? 'noite' : 'noites'}` }}</h3>
            <h3 id="valor">R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
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
import AddAvaliacaoDesktop from '@/components/AddAvaliacaoDesktop'
import supportsWebP from 'supports-webp'
import { mapstyle } from '@/mixins/mapstyle'
import { swiperOptions } from '@/mixins/swiper_id'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import subDays from 'date-fns/sub_days'
import differenceInDays from 'date-fns/difference_in_days'

export default {
  components: { MiniLoader, ReservaMobile, Host, AddAvaliacaoDesktop },
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
    /* ******************** QUARTOS ******************** */
    mobiliaImage (mobilia) {
      return mobilia === 'cama_solteiro' ? require('@/assets/img/cama_solteiro.svg')
           : mobilia === 'cama_casal' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'cama_queen' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'cama_king' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'sofa' ? require('@/assets/img/sofa.svg')
           : ''
    },
    mobiliaText (mobilia) {
      return mobilia === 'cama_solteiro' ? 'Cama solteiro'
           : mobilia === 'cama_casal' ? 'Cama casal'
           : mobilia === 'cama_queen' ? 'Cama queen'
           : mobilia === 'cama_king' ? 'Cama king'
           : mobilia === 'sofa' ? 'Sofá'
           : ''
    },
    /* ******************** COMODIDADES ******************** */
    comodidadeImgSrc (comodidade) {
      return comodidade.name === 'Roupas de cama' ? require('@/assets/img/hasRoupasCama.svg')
           : comodidade.name === 'Piscina' ? require('@/assets/img/hasPiscina.svg')
           : comodidade.name === 'Churrasqueira' ? require('@/assets/img/hasChurrasqueira.svg')
           : comodidade.name === 'Wi-Fi gratuito' ? require('@/assets/img/hasWifi.svg')
           : comodidade.name === 'Ar condicionado' ? require('@/assets/img/hasArCond.svg')
           : comodidade.name === 'Barracas' ? require('@/assets/img/hasBarracas.svg')
           : comodidade.name === 'Pier' ? require('@/assets/img/hasPier.svg')
           : ''
      '../../assets/img/hasRoupasCama.svg'
    },
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
        startDate ? formattedDates = format(startDate, 'D [de] MMM', { locale: pt }) : ''
        endDate ? formattedDates += ' - ' + format(endDate, 'D [de] MMM', { locale: pt }) : ''
        return formattedDates
      }
    },
    calcValoresReserva () { /* Em caso de alterações, lembrar também de alterar DatePicker.vue */
      const startDate = this.reservaAcomod.startDate
      const endDate = this.reservaAcomod.endDate

      const noites = differenceInDays(endDate, startDate)
      this.$store.commit('m_noites', noites)

      const valorReservaTotal = Math.round(this.acomod.valorNoite * noites)
      this.$store.commit('m_valorReservaTotal', valorReservaTotal)
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
    },
    formatAvaliacaoDate (avaliacao) {
      const formattedDate = format(avaliacao.createdAt, 'MMMM [de] YYYY', { locale: pt })
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
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
    quartosOptions () {
      let quartos = []
      this.acomod.quartos.forEach(quarto => {
        quartos.push(quarto.name)
      })
      return quartos
    },
    totalHospedesArray () {
      let hospedesArray = []
      this.acomod.quartos.forEach(quarto => {
        hospedesArray.push(quarto.acomoda)
      })
      const totalHospedes = hospedesArray.reduce((x, y) => x + y, 0)
      return Array.from({ length: totalHospedes }, (v, k) => k + 1)
    },
    minDate () {
      return subDays(Date(), 1)
    },
    disabledDates () {
      const mergedDisabledDates = [...new Set([
        ...this.acomod.disabledDates_airbnb,
        ...this.acomod.disabledDates_booking,
        ...this.acomod.disabledDates_escarpasTrip
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
      vm.$store.state.reservaAcomod.quarto = vm.acomod.quartos[0].name

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
      margin-left: 3px;
    }
    & .new {
      display: inline-flex;
      border: 1px solid #dedede;
      border-radius: 50px;
      & p {
        padding: 3px 8px;
        font-size: 11px;
        font-weight: 600;
      }
    }
  }/* __________ RATING BOX __________ */
  


  /* __________ ANUNCIANTE BOX __________ */
  & .anunciante-box {
    display: flex;
    padding: 2rem 7% .5rem;
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






  /* __________ SOBRE BOX __________ */
  & .sobre-box {
    padding: 0 7%;
  }/* __________ SOBRE BOX __________ */






  /* __________ QUARTOS __________ */
  & .quartos-box {
    padding: 0 7%;
    display: flex;
    flex-flow: column;
    & .quarto {
      width: 100%;
      & .__name {
        padding: 4.5rem 0 1rem 0;
        font-size: 16px;
        font-weight: 600;
      }
      & .info {
        padding: .3rem 0;
      }
      & .mobilias {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 12px;
        margin-top: 1rem;
        & .mobilia {
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #dedede;
          border-radius: 10px;
          padding: .8rem;
          & p {
            padding-top: 10px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.1;
          }
        }
      }
      & .mobilias::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
      & .mobilias > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
    }
  }/* __________ QUARTOS __________ */






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
      padding: 1.7rem 0;
      border-bottom: 1px solid #dedede;
      & .__img {
        margin-right: 1rem;
        width: 1.8rem;
        height: auto;
      }
    }
    & .comods-item:last-child {
      border-bottom: none
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
    padding: 0 7% 2rem;
    & .avaliacoes-by-categories {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1.4rem;
      margin-bottom: 2.5rem;
      & .category {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    & .avaliacao {
      padding-bottom: 2.1rem;
      & .__guest-name {
        font-size: 16px;
        font-weight: 600;
      }
      & .__date {
        padding: .3rem 0 .6rem;
        font-size: 14px;
      }
      & .__message {
      }
    }
    & .add-avaliacao-btn {
      padding: 0;
      background: white;
      color: var(--colorAcomod);
      font-size: 16px;
      font-weight: 600;
    }
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
        width: 50%;
        max-width: 12rem;
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
      & .swiper-container {
        & .swiper-wrapper {
          & .slide {
            & .__img {
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
        border-radius: 12px;
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
              border-radius: 6px;
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
                border-radius: 6px;
              }
              & #datepicker-trigger:hover {
                border: 1px solid var(--color01);
              }
            }
          }
          & .valor-reserva-total {
            margin-top: 1.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & #valor {
              font-weight: 600;
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
          }
          & .new {
            & p {
              font-size: 12px;
            }
          }
        }/* __________ RATING __________ */




        /* __________ ANUNCIANTE __________ */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
          }
        }/* __________ ANUNCIANTE __________ */






        /* __________ SOBRE __________ */
        & .sobre-box {
          padding: 0;
        }/* __________ SOBRE __________ */





        /* __________ QUARTOS __________ */
        & .quartos-box {
          padding: 0;
          & .quarto {
            & .__name {
              font-size: 18px;
            }
            & .info {
            }
            & .mobilias {
              & .mobilia {
                & p {
                }
              }
            }
          }
        }/* __________ QUARTOS __________ */


      


        /* __________ COMODIDADES __________ */
        & .comodidades-box-mobile {
          display: none;
        }
        & .comodidades-box-desktop {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 1rem;
          grid-row-gap: 1.5rem;
          & .item {
            display: flex;
            align-items: center;
            & .__img {
              width: 1.6rem;
              height: auto;
              margin-right: 1rem;
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
            height: 430px;
          }
        }/* __________ LOCAL __________ */




        /* __________ AVALIAÇÕES __________ */
        & .avaliacoes-box {
          padding: 0;
          & .avaliacoes-by-categories {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10%;
            grid-row-gap: 1rem;
            margin-bottom: 2.5rem;
            & .category {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
          & .avaliacao {
            & .__guest-name {
              font-size: 18px;
            }
            & .__date {
            }
            & .__message {
            }
          }
          & .add-avaliacao-btn {
            font-size: 17px;
          }
          & .add-avaliacao-btn:hover {
            text-decoration: underline;
          }
        }/* __________ AVALIAÇÕES __________ */


      }
    }
    
  

    /* __________ RESERVA __________ */
    & .reserva-mobile {
      display: none;
    }/* __________ RESERVA __________ */
  }
}

.comodidade-img-disabled {
  filter: invert(80%);
}
.comodidade-text-disabled {
  color: #DFDFDF;
  text-decoration: line-through;
}

</style>
