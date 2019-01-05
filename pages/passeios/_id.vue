<template>
  <div class="passeios-id">
    

    <host/>






    <!-- ______________________________ TOPBAR ______________________________ -->
    <div class="topbar" v-scroll="scrollTopbarBg">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back-w.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar" >
        </div>

      </div>
    </div><!-- ______________________________ TOPBAR ______________________________ -->






    <!-- ______________________________ IMAGE ______________________________ -->
    <div class="image-box" ref="imageBox">
      <no-ssr>
        <swiper :options="swiperOptions">
          
          <swiper-slide class="slide" v-for="image in passeio.images" :key="image.id">
            <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
          </swiper-slide>

        </swiper>
      </no-ssr>
    </div><!-- ______________________________ IMAGE ______________________________ -->
    






    <div class="desktop-view"><!-- Desktop View -->


    

      <div class="desktop-view-info"><!-- Desktop View Info -->





        <!-- ______________________________ RATING ______________________________ -->
        <div class="rating-box">

          <h3 class="__tipo" style="color: #198CFE">{{ passeio.tipoPasseio }}</h3>

          <star-rating
            v-if="passeio.avaliacoes.length > 0"
            class="rating"
            :rating="passeio.averageRating"
            :increment="0.5"
            :read-only="true"
            :show-rating="false"
            active-color="#161616"
            inactive-color="#dedede"
            :star-size="13"
            :padding="4">
          </star-rating>

          <div class="new" v-else><p>NOVO</p></div>

        </div><!-- ______________________________ RATING ______________________________ -->





        <h1 class="id-title">{{ passeio.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box">
          <img class="__anunciante-img" :src="userPhoto" @click="$store.commit('m_showHost', true), hashHost()">
          <div class="box-flex-column">
            <h3 style="user-select:none">Guiado por</h3>
            <p class="__anunciante-name" @click="$store.commit('m_showHost', true), hashHost()">{{ host.fullName }}</p>
          </div>
        </div><!-- ______________________________ ANUNCIANTE ______________________________ -->








        <!-- ______________________________ SOBRE ______________________________ -->
        <h1 class="item-title">Sobre o Passeio</h1>

        <div class="sobre-box">
          <h3>{{ passeio.subtitle }}</h3>
        </div><!-- ______________________________ SOBRE ______________________________ -->







        <!-- ______________________________ ROTAS ______________________________ -->
        <div class="rotas-box">
          <no-ssr>
            <div class="rota" v-for="(rota, index) in passeio.rotas" :key="index + 1">

              <h1 class="__title">Rota {{ passeio.rotas.length > 1 ? index + 1 : '' }}</h1>

              <h3 style="padding: .3rem 0">Valor por pessoa: <span style="font-weight: 500">R${{ rota.valor }}</span></h3>

              <h3 style="padding: .3rem 0">Horário de partida: <span style="font-weight: 500">{{ rota.horarioPartida }}</span></h3>

              <h3 style="padding: .3rem 0">Duração: <span style="font-weight: 500">{{ rota.duracao }} {{ rota.duracao === 1 ? 'hora' : 'horas' }}</span></h3>

              <div class="pontos-visitados">

                <div class="ponto" v-for="(ponto, index) in rota.pontosVisitados">
                  <progressive-background class="__img" :src="pontoImgSrc(ponto)" :aspect-ratio="2/3"/>
                  <p class="__number">{{ index + 1 }}</p>
                  <h2 class="__name">{{ ponto }}</h2>
                </div>

              </div>
              
            </div>
          </no-ssr>
        </div><!-- ______________________________ ROTAS ______________________________ -->






        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->
        <h1 class="item-title">Disponibilidade</h1>

        <div class="disponibilidade-box">
          <no-ssr>

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
                :mode="'single'"
                :showShortcutsMenuTrigger="false"
                :showActionButtons="false"
                :min-date="minDate"
                :date-one="$store.state.reservaPasseio.date"
                @date-one-selected="val => { $store.state.reservaPasseio.date = val }"
              />
            </div>
            
          </no-ssr>
        </div>
        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->






        <!-- ______________________________ LOCAL ______________________________ -->
        <h1 class="item-title">Local de partida</h1>

        <div class="local-box">

          <h3 class="__adress">{{ passeio.address }}</h3>

          <gmap-map
            :center="{ lat: passeio.positionLAT, lng: passeio.positionLNG }"
            :zoom="15"
            :options="{ styles: styles, draggable: $store.state.isMobile ? false : true, fullscreenControl: $store.state.isMobile ? false : true, zoomControl: $store.state.isMobile ? false : true, mapTypeControl: false, streetViewControl: false }"
            @click="fullscreenMobile">
              <Gmap-Marker
                :position="{ lat: passeio.positionLAT, lng: passeio.positionLNG }"
                :icon="{ url: $store.state.markerUrl, scaledSize: $store.state.markerSize }">
              </Gmap-Marker>
          </gmap-map>

        </div><!-- ______________________________ LOCAL ______________________________ -->






        <!-- ______________________________ PAGAMENTO ______________________________ -->
        <!-- <h1 class="item-title">Formas de pagamento aceitas</h1>

        <div class="pagamento-box">
          <h3>Formas de pagamento...</h3>
        </div> --><!-- ______________________________ PAGAMENTO ______________________________ -->





      
        <!-- ______________________________ AVALIAÇÕES ______________________________ -->
        <div class="avaliacoes-title">

          <h1 class="__title">
            {{ passeio.avaliacoes.length > 0 ? passeio.avaliacoes.length : '' }} {{ passeio.avaliacoes.length === 0 ? 'Seja o primeiro a avaliar!' : passeio.avaliacoes.length === 1 ? 'Avaliação': 'Avaliações' }}
          </h1>

          <star-rating
            v-if="passeio.avaliacoes.length > 0"
            class="rating"
            :rating="passeio.averageRating"
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

          <no-ssr>

            <div class="avaliacoes-by-categories" v-if="passeio.avaliacoes.length > 0">
              <div class="category">
                <p class="__name">Habilidade do Guia</p>
                <star-rating class="__rating" :rating="passeio.averageRating_habilidade" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
              </div>
              <div class="category">
                <p class="__name">Segurança</p>
                <star-rating class="__rating" :rating="passeio.averageRating_seguranca" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
              </div>
              <div class="category">
                <p class="__name">Precisão do anúncio</p>
                <star-rating class="__rating" :rating="passeio.averageRating_precisao" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
              </div>
              <div class="category">
                <p class="__name">Valor</p>
                <star-rating class="__rating" :rating="passeio.averageRating_valor" :increment="0.5" :read-only="true" :show-rating="false" active-color="#161616" inactive-color="#dedede" :star-size="15" :padding="4"></star-rating>
              </div>
            </div>


            <div class="avaliacao" v-for="(avaliacao, index) in passeio.avaliacoes" :v-key="index">
              <h2 class="__guest-name">{{ avaliacao.fullName }}</h2>
              <p class="__date">{{ formatAvaliacaoDate(avaliacao) }}</p>
              <h3 class="__message">{{ avaliacao.comment }}</h3>
            </div>


            <button class="add-avaliacao-btn" type="button" @click="$modal.show('add-avaliacao-desktop')">Deixar uma avaliação</button>

            <add-avaliacao-desktop></add-avaliacao-desktop>

          </no-ssr>

        </div><!-- ______________________________ AVALIAÇÕES ______________________________ -->




      </div><!-- Desktop View Info -->




      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">


          <h1 class="__valor">R${{ passeio.rotas[reservaPasseio.rota - 1].valor.toLocaleString() }}<span class="__valor-pessoa"> por pessoa</span></h1>


          <div class="item-form" v-if="passeio.rotas.length > 1">
            <select v-model="$store.state.reservaPasseio.rota">
              <option :value="n" v-for="n in passeio.rotas.length">Rota {{ n }}</option>
            </select>
          </div>


          <div class="item-form">
            <select v-model="$store.state.reservaPasseio.totalPessoas">
              <option :value="n" v-for="n in capacidadeArray">{{ n }} {{ n === 1 ? 'pessoa' : 'pessoas' }}</option>
            </select>
          </div>


          <div class="item-form">

            <div class="datepicker-trigger">
              <button
                type="button"
                id="datepicker-trigger">
                {{ formatDate() }}
              </button>

              <AirbnbStyleDatepicker
                :trigger="showDatepicker"
                :trigger-element-id="'datepicker-trigger'"
                :showShortcutsMenuTrigger="false"
                :monthsToShow="1"
                :mode="'single'"
                :offsetX="102"
                :offsetY="52"
                :min-date="minDate"
                :date-one="$store.state.reservaPasseio.date"
                @date-one-selected="val => { $store.state.reservaPasseio.date = val }"
              />
            </div>

          </div>


          <button class="__reserva-desktop-btn" type="button" @click="reservarDesktop">Reservar</button>

          <h4 class="__info">A reserva é gratuita!</h4>


          <button class="__reserva-desktop-ask-btn" type="button">Falar com {{ host.firstName }}</button>


          <div class="highlight" v-if="$store.state.visitsLastMonth >= 0">
            <h3 class="__text">Este passeio recebeu {{ $store.state.visitsLastMonth }} visualizações no último mês.</h3>
            <img class="__img" src="../../assets/img/visits-passeio.svg">
          </div>

        </form>
      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->




    </div><!-- Desktop View -->




    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva-mobile">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.rotas[reservaPasseio.rota - 1].valor.toLocaleString() }}<span class="__reserva-valor-pessoa"> por pessoa</span></h3>
        <button class="__reserva-btn" @click="$store.commit('m_showHost', true), hashHost()">Reservar</button>
      </div>
    </div>
    <!-- ______________________________ RESERVA MOBILE ______________________________ -->
    
    
    
  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import Host from '../../components/Host'
import AddAvaliacaoDesktop from '@/components/AddAvaliacaoDesktop'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import { swiperOptions } from '../../mixins/swiper_id'
import { stylesCalendar } from '@/mixins/stylesCalendar'
import { pontosTuristicos } from '@/mixins/pontosTuristicos'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import pt from 'date-fns/locale/pt'

export default {
  components: { Host, AddAvaliacaoDesktop },
  mixins: [ mapstyle, swiperOptions, stylesCalendar, pontosTuristicos ],
  data () {
    return {
      showDatepicker: false
    }
  },
  head () {
    return {
      title: `${this.$store.state.passeio.title} ‒ Escarpas Trip`,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.passeio.subtitle },
        { property: 'og:url', content: `https://escarpastrip.com/passeios/${this.$route.params.id}` },
        { property: 'og:title', content: this.$store.state.passeio.title },
        { property: 'og:description', content: this.$store.state.passeio.subtitle },
        { property: 'og:image', content: this.$store.state.passeio.images[0].HJ },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  middleware: 'passeioValidate',
  transition: 'id',
  async fetch ({ store, params }) {
    try {
      /* Get passeio */
      let passeio = await firebase.firestore().doc(`passeios/${params.id}`).get()

      /* Get host */
      let host = await firebase.firestore().doc(`users/${passeio.data().hostID}`).get()
      
      store.commit('m_passeio', passeio.data())
      store.commit('m_host', host.data())
      store.commit('m_loader', false)

    } catch (err) {
      store.commit('m_loader', false)
      console.log(err)
    }
  },
  methods: {
    formatDate () {
      const date = this.reservaPasseio.date
      const weekday = format(date, 'dddd', { locale: pt })
      const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)
      const day = format(date, 'D', { locale: pt })
      const month = format(date, 'MMMM', { locale: pt })
      return date === '' ? 'Selecionar data' : `${weekdayCapitalized}, ${day} de ${month}`
    },
    timeToSec (time) {
      const parts = time.split(':')
      return (parts[0] * 3600) + (parts[1] * 60)
    },
    pad (num) {
      return num < 10 ? '0' + num : '' + num
    },
    formatTime (secs) {
      return [ this.pad(Math.floor(secs/3600)%60), this.pad(Math.floor(secs/60)%60) ].join(':')
    },
    reservarDesktop () {
      firebase.firestore().doc(`passeios/${this.$route.params.id}/visits/${this.$store.state.visitID}`).update({ 
        clickedReservaBtn: true
      })
      if (this.reservaPasseio.date === '') {
        this.showDatepicker = true
      } else {
        this.$store.commit('m_isReservar', true)
        this.$router.push('/passeios/reservar')
        this.$store.commit('m_showNavbar', false)
      }
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
    backBtn () {
      history.length <= 2 ? this.$router.push('/') : window.history.back(1)
    },
    hashHost () {
       window.location.hash = "contato"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
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
    },
    formatAvaliacaoDate (avaliacao) {
      const formattedDate = format(avaliacao.createdAt, 'MMMM [de] YYYY', { locale: pt })
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
  },
  updated () {
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    passeio () { return this.$store.state.passeio },
    host () { return this.$store.state.host },
    reservaPasseio () { return this.$store.state.reservaPasseio },
    showShare () { return this.$store.state.showShare },
    userPhoto () {
      if (this.host.photoURL !== '') {
        return this.host.photoURL
      } else {
        return require('@/assets/img/user.svg')
      }
    },
    minDate() {
      return subDays(Date(), 1)
    },
    capacidadeArray () {
      return Array.from({length: this.passeio.capacidade}, (v, k) => k+1)
    },
    formattedHorarios () {
      let formattedHorarios = []
      for (const horario of this.passeio.horarios) {
        const sum = this.formatTime(this.timeToSec(horario.horario) + this.timeToSec(this.passeio.rotas[this.reservaPasseio.rota-1].duracao))
        formattedHorarios.push(`${horario.horario} − ${sum}`)
      }
      this.reservaPasseio.horario = formattedHorarios[0]
      return formattedHorarios
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

.passeios-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.5rem;
  transition: all .35s cubic-bezier(.15,.97,.43,.93);
  


  /* __________ IMAGE BOX __________ */
  & .image-box {
    min-height: 40vh;
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
      font-size: 16px;
      font-weight: 600;
    }
    & .rating {
      padding-left: 3px;
    }
    & .new {
      display: inline-flex;
      border: 1px solid #dedede;
      border-radius: 50px;
      & p {
        padding: 4px 8px;
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
      color: var(--colorPasseio);
      font-weight: 500;
      user-select: none;
    }
  }/* __________ ANUNCIANTE BOX __________ */







  /* __________ SOBRE BOX __________ */
  & .sobre-box {
    padding: 0 7%;
  }/* __________ SOBRE BOX __________ */






  /* __________ ROTAS BOX __________ */
  & .rotas-box {
    padding: 0 7%;
    display: flex;
    flex-flow: column;
    & .rota {
      border-radius: 6px;
      width: 100%;
      margin-bottom: 1.5rem;
        & .__title {
          font-weight: 600;
          font-size: 16px;
          padding: 3rem 0 .5rem 0;
          user-select: none;
        }
        & .pontos-visitados {
          margin-top: 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 8px;
          & .ponto {
            position: relative;
            border-radius: 10px;
            border: 1px solid #dedede;
            & .__img {
              width: 100%;
              height: auto;
              border-radius: 10px 10px 0 0;
            }
            & .__number {
              position: absolute;
              left: 0;
              top: 0;
              padding: 5px 7px;
              border-radius: 10px 0 10px 0;
              z-index: 99;
              font-size: 15px;
              font-weight: 600;
              background: rgba(0,0,0,.3);
              color: white;
            }
            & .__name {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 2.5rem;
              padding: 0 .7rem;
              font-size: 13px;
              font-weight: 500;
              width: 100%;
              text-align: center;
              user-select: none;
            }
          }
        }
    }
  }/* __________ ROTAS BOX __________ */





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




  /* __________ PAGAMENTO BOX __________ */
  & .pagamento-box {
    padding: 0 7%;
  }/* __________ PAGAMENTO BOX __________ */





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
      color: var(--colorPasseio);
      font-size: 17px;
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
        font-size: 19px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
        font-weight: 400;
      }
      & .__reserva-btn {
        width: 50%;
        max-width: 12rem;
        height: 3.25rem;
        background:var(--colorPasseio);
        border-radius: 200px;
        font-size: 17px;
        font-weight: 700;
        color: white;
        transition: var(--main-transition);
      }
    }
  }/* __________ RESERVA __________ */

}


/* TRANSITIONS */

@media (max-width: 1023px) {
  .reserva-desktop {
    display: none;
  }
}

@media (min-width: 1024px) {
  .passeios-id {
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
            }
          }
        }
      }
    }
    & .image-box:active {
      cursor: grabbing;
    }/* __________ IMAGE BOX __________ */


    & .desktop-view {
      display: grid;
      grid-template-columns: 70% 30%;
      margin: 1.7rem 8% 0;
      & .reserva-desktop {
        align-self: start;
        border: 1px solid #dedede;
        border-radius: 12px;
        & .reserva-desktop-form {
          display: flex;
          flex-flow: column;
          padding: 1.4rem;
          & .__valor {
            font-size: 34px;
            font-weight: 400;
            padding-bottom: 1.2rem;
            & .__valor-pessoa {
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
          & .__reserva-desktop-btn {
            margin-top: 1.3rem;
            font-size: 17px;
            font-weight: 700;
            background: var(--colorPasseio);
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
            color: var(--colorPasseio);
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
        padding-right: 6%;



        /* __________ RATING BOX __________ */
        & .rating-box {
          padding: 0;
          margin-top: 0;
          & .__tipo {
            padding-right: 1rem;
          }
          & .rating {
          }
          & .new {
            & p {
              font-size: 12px;
            }
          }
        }/* __________ RATING BOX __________ */




        /* __________ ANUNCIANTE BOX __________ */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
          }
          & .__anunciante-name:hover {
            text-decoration: underline;
          }
        }/* __________ ANUNCIANTE BOX __________ */





        /* __________ SOBRE BOX __________ */
        & .sobre-box {
          padding: 0;
        }/* __________ SOBRE BOX __________ */





        /* __________ ROTAS BOX __________ */
        & .rotas-box {
          padding: 0;  
          & .rota {
              & .__title {
                font-size: 18px;
                font-weight: 600;
                padding: 4.5rem 0 1rem 0;
              }
              & .pontos-visitados {
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 16px;
                & .ponto {
                  /* box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.12); */
                  & .__img {
                  }
                  & .__number {
                  }
                  & .__name {
                    min-height: 2.3rem;
                    font-size: 13px;
                    font-weight: 500;
                  }
                }
              }
          }
        }/* __________ ROTAS BOX __________ */





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




        /* __________ PAGAMENTO BOX __________ */
        & .pagamento-box {
          padding: 0;
        }/* __________ PAGAMENTO BOX __________ */




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

</style>
